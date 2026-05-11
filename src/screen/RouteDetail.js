import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
import { getMappingRules } from '../API/Home';

const RouteDetail = ({ route }) => {
  const channel = route.params?.channel || {};

  const { data: mappings = [] } = useQuery({
    queryKey: ['mappings', channel.route_id],
    queryFn: () => getMappingRules(channel.route_id),
    onError: (err) => Alert.alert('Error:', err.message),
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollViewContainer>
        <Header title="Channels Details" fontSize={25} />

        <TextInputField title="Channel Name" value={channel.channel_name} />
        <TextInputField title="Source Server" value={channel.src_server?.name || 'not given'} />
        <TextInputField title="Source endpoint" value={channel.src_endpoint?.url || 'not given'} />
        <TextInputField title="Destination server" value={channel.dest_server?.name || 'not given'} />
        <TextInputField title="Destination endpoint" value={channel.dest_endpoint?.url || 'not given'} />
        <TextInputField title="Msg Type" value={channel.msg_type} />
        <TextInputField title="Format" value={channel.format || 'FHIR To HL7'} />

        <Text style={styles.mappingTitle}>Mapping</Text>
        <View style={styles.mappingBox}>
          {mappings.length > 0 ? (
            mappings.map((m, i) => {
              const src = Array.isArray(m.src_field)
                ? m.src_field.map(s => s.name).join(' + ')
                : m.src_field?.name;
              const dest = Array.isArray(m.dest_field)
                ? m.dest_field.map(d => d.name).join(' + ')
                : m.dest_field?.name;
              return (
                <Text key={m.mapping_rule_id || i} style={styles.mappingText}>
                  {`${src} → ${dest}`}
                </Text>
              );
            })
          ) : (
            <Text style={styles.noMapping}>No mappings found</Text>
          )}
        </View>
      </ScrollViewContainer>
      <NavigationHomeEndPointRoutesLogs activeTab="Channels" />
    </View>
  );
};

const styles = StyleSheet.create({
  mappingTitle: { fontSize: 18, fontWeight: 'bold', color: '#2F80ED', textAlign: 'center', marginTop: 25, marginBottom: 10 },
  mappingBox: { backgroundColor: '#f4f7f9', borderRadius: 10, padding: 15, marginHorizontal: 5, borderWidth: 1, borderColor: '#e0e0e0' },
  mappingText: { fontSize: 13, color: '#0D253C', marginBottom: 6 },
  noMapping: { fontSize: 12, color: '#999', textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 30, marginBottom: 100 },
});

export default RouteDetail;
