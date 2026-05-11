import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import Button from './components/Button';
import Dropdown from './components/Dropdown';
import { getAllServers, addEndpoint } from '../API/Home';

const AddEndpoints = ({ navigation }) => {
  const [selectedServerId, setSelectedServerId] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [url, setUrl] = useState('');
  const [sampleMsg, setSampleMsg] = useState('');

  const { data: servers = [] } = useQuery({
    queryKey: ['servers'],
    queryFn: getAllServers,
    onError: () => Alert.alert('Error', 'Failed to load servers'),
  });

  const { mutate: addEndpointMutate, isPending } = useMutation({
    mutationFn: addEndpoint,
    onSuccess: () => {
      Alert.alert('Success', 'Endpoint added successfully!');
      navigation.goBack();
    },
    onError: error => {
      const detail = error.response?.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? detail.map(d => d.msg).join(', ')
          : 'Something went wrong!';
      Alert.alert('Error', message);
    },
  });

  const handleAddEndpoint = () => {
    if (!selectedServerId)
      return Alert.alert('Error', 'Please select a source server');
    if (!url.trim()) return Alert.alert('Error', 'Please enter URL');
    if (!sampleMsg.trim())
      return Alert.alert('Error', 'Please enter sample message');

    let parsedSampleMsg;
    if (selectedProtocol === 'FHIR') {
      try {
        parsedSampleMsg = JSON.parse(sampleMsg);
      } catch {
        return Alert.alert('Error', 'FHIR sample message must be valid JSON');
      }
    } else {
      parsedSampleMsg = sampleMsg.trim();
    }

    addEndpointMutate({
      server_id: selectedServerId,
      url: url.trim(),
      server_protocol: selectedProtocol,
      sample_msg: parsedSampleMsg,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Add Endpoints" fontSize={25} />

        <Dropdown
          title="Source Server"
          placeholder="Select Source Server"
          options={servers.map(s => s.name)}
          onSelect={v => {
            const server = servers.find(s => s.name === v);
            setSelectedServerId(server?.server_id);
            setSelectedProtocol(server?.protocol);
          }}
        />

        <TextInputField
          title="URL"
          placeholder="Enter URL"
          value={url}
          onChangeText={setUrl}
        />

        <TextInputField
          title="Sample Message"
          placeholder={
            selectedProtocol === 'FHIR'
              ? '{"resourceType": "Patient", ...}'
              : 'MSH|^~\\&|...'
          }
          value={sampleMsg}
          onChangeText={setSampleMsg}
          multiline={true}
          numberOfLines={6}
          inputStyle={{ height: 200 }}
        />

        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
          {isPending ? (
            <ActivityIndicator size="large" color="#0D253C" />
          ) : (
            <Button title="Add Endpoint" onPress={handleAddEndpoint} />
          )}
        </View>
      </ScrollViewContainer>
      <NavigationHomeEndPointRoutesLogs activeTab="Endpoints" />
    </View>
  );
};

export default AddEndpoints;
