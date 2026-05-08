import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getAllServers,
  getServerEndpoints,
  getFieldsByEndpoint,
  addRoute,
  getMappingSuggestion,
} from '../API/Home';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextInputField from './components/TextInputField';
import Dropdown from './components/Dropdown';
import Button from './components/Button';
import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';

const CheckboxRow = ({ field, index, isSelected, onToggle }) => (
  <TouchableOpacity
    style={styles.checkRow}
    onPress={() => onToggle(field)}
    activeOpacity={0.6}
  >
    <Text style={styles.rowNumber}>{index + 1}</Text>
    <View style={[styles.box, isSelected && styles.selected]}>
      {isSelected && <Text style={styles.checkMark}>✓</Text>}
    </View>
    <Text style={styles.label}>{field.name}</Text>
  </TouchableOpacity>
);

const AddRouteDetail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [srcServerId, setSrcServerId] = useState(null);
  const [desServerId, setDesServerId] = useState(null);
  const [srcEndpointId, setSrcEndpointId] = useState(null);
  const [desEndpointId, setDesEndpointId] = useState(null);
  const [msgType, setMsgType] = useState('ADT');
  const [mappings, setMappings] = useState([]);

  const [servers, setServers] = useState([]);
  const [srcEndpoints, setSrcEndpoints] = useState([]);
  const [desEndpoints, setDesEndpoints] = useState([]);
  const [srcFields, setSrcFields] = useState([]);
  const [destFields, setDestFields] = useState([]);

  const [srcSelectedFields, setSrcSelectedFields] = useState([]);
  const [destSelectedFields, setDestSelectedFields] = useState([]);

  useEffect(() => {
    getAllServers().then(d => setServers(d || []));
  }, []);

  useEffect(() => {
    if (!srcServerId) return;
    setSrcEndpointId(null);
    setSrcFields([]);
    setSrcSelectedFields([]);
    getServerEndpoints(srcServerId).then(d => setSrcEndpoints(d || []));
  }, [srcServerId]);

  useEffect(() => {
    if (!desServerId) return;
    setDesEndpointId(null);
    setDestFields([]);
    setDestSelectedFields([]);
    getServerEndpoints(desServerId).then(d => setDesEndpoints(d || []));
  }, [desServerId]);

  useEffect(() => {
    if (!srcEndpointId) return;
    setSrcSelectedFields([]);
    setSrcFields([]);
    getFieldsByEndpoint(srcEndpointId).then(d => setSrcFields(d || []));
  }, [srcEndpointId]);

  useEffect(() => {
    if (!desEndpointId) return;
    setDestSelectedFields([]);
    setDestFields([]);
    getFieldsByEndpoint(desEndpointId).then(d => setDestFields(d || []));
  }, [desEndpointId]);

  const toggleSrc = field => {
    console.log('TOGGLE CALLED, field:', field.name, field.endpoint_field_id);
    setSrcSelectedFields(prev => {
      console.log('PREV:', prev.length, 'fields selected');
      return prev.find(f => f.endpoint_field_id === field.endpoint_field_id)
        ? prev.filter(f => f.endpoint_field_id !== field.endpoint_field_id)
        : [...prev, field];
    });
  };

  const toggleDest = field => {
    setDestSelectedFields(prev =>
      prev.find(f => f.endpoint_field_id === field.endpoint_field_id)
        ? prev.filter(f => f.endpoint_field_id !== field.endpoint_field_id)
        : [...prev, field],
    );
  };

  const addMapping = async () => {
    if (!srcSelectedFields.length || !destSelectedFields.length)
      return Alert.alert('Error', 'Source aur destination fields select karo');
    if (srcSelectedFields.length > 1 && destSelectedFields.length > 1)
      return Alert.alert('Error', 'Ek source ya ek destination select karo');

    try {
      // API call karo suggestion ke liye
      const suggestion = await getMappingSuggestion({
        src_server_id: srcServerId,
        dest_server_id: desServerId,
        src_field_ids: srcSelectedFields.map(f => f.endpoint_field_id),
        dest_field_ids: destSelectedFields.map(f => f.endpoint_field_id),
      });

      let transform = suggestion.transform_type;
      if (srcSelectedFields.length > 1) transform = 'concat';
      else if (destSelectedFields.length > 1) transform = 'split';

      setMappings(prev => [
        ...prev,
        {
          src_paths: srcSelectedFields.map(f => f.endpoint_field_id),
          dest_paths: destSelectedFields.map(f => f.endpoint_field_id),
          transform,
          config: suggestion.config || {},
          displayText: `${srcSelectedFields
            .map(f => f.name)
            .join(' + ')} → ${destSelectedFields.map(f => f.name).join(' + ')}`,
        },
      ]);

      setSrcSelectedFields([]);
      setDestSelectedFields([]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Mapping suggestion nahi mili');
    }
  };

  const saveChannel = async () => {
    if (!channelName.trim()) return Alert.alert('Error', 'Channel name likho');
    if (!srcServerId || !desServerId)
      return Alert.alert('Error', 'Servers select karo');
    if (!srcEndpointId || !desEndpointId)
      return Alert.alert('Error', 'Endpoints select karo');
    if (!mappings.length) return Alert.alert('Error', 'Ek mapping add karo');

    setLoading(true);
    try {
      await addRoute({
        name: channelName.trim(),
        src_server_id: srcServerId,
        src_endpoint_id: srcEndpointId,
        dest_server_id: desServerId,
        dest_endpoint_id: desEndpointId,
        msg_type: msgType,
        rules: { mappings: mappings.map(({ displayText, ...r }) => r) },
      });
      Alert.alert('Success', 'Channel save ho gaya!');
      navigation.navigate('DashBoard');
    } catch (error) {
      const detail = error.response?.data?.detail;
      const msg =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
          ? detail.map(d => d.msg).join(', ')
          : 'Kuch ghalat hua';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollViewContainer>
        <Header title="Add Channels" fontSize={25} />
        <TextInputField
          title="Channel Name"
          value={channelName}
          onChangeText={setChannelName}
          placeholder="Enter Channel Name"
        />
        <Dropdown
          title="Source Server"
          options={servers.map(s => s.name)}
          onSelect={v =>
            setSrcServerId(servers.find(s => s.name === v)?.server_id)
          }
          placeholder="Select Source Server"
        />
        <Dropdown
          title="Source Endpoint"
          options={srcEndpoints.map(e => e.url)}
          onSelect={v =>
            setSrcEndpointId(srcEndpoints.find(e => e.url === v)?.endpoint_id)
          }
          placeholder="Select Source Endpoint"
        />
        <Dropdown
          title="Destination Server"
          options={servers.map(s => s.name)}
          onSelect={v =>
            setDesServerId(servers.find(s => s.name === v)?.server_id)
          }
          placeholder="Select Destination Server"
        />
        <Dropdown
          title="Destination Endpoint"
          options={desEndpoints.map(e => e.url)}
          onSelect={v =>
            setDesEndpointId(desEndpoints.find(e => e.url === v)?.endpoint_id)
          }
          placeholder="Select Destination Endpoint"
        />

        <View style={styles.mappingBox}>
          <Text style={styles.mappingHeader}>Mapping</Text>
          <View style={styles.columnHeaderRow}>
            <View style={styles.columnHeaderLeft}>
              <Text style={styles.columnHeaderLabel}>Source</Text>
            </View>
            <View style={styles.columnHeaderRight}>
              <Text style={styles.columnHeaderLabel}>Destination</Text>
            </View>
          </View>
          <View style={styles.mappingRow}>
            <View style={styles.column}>
              {srcFields.length === 0 ? (
                <Text style={styles.emptyText}>
                  Source endpoint select karo
                </Text>
              ) : (
                srcFields.map((f, i) => (
                  <CheckboxRow
                    key={f.endpoint_field_id}
                    field={f}
                    index={i}
                    isSelected={srcSelectedFields.some(
                      x => x.endpoint_field_id === f.endpoint_field_id,
                    )}
                    onToggle={toggleSrc}
                  />
                ))
              )}
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.column}>
              {destFields.length === 0 ? (
                <Text style={styles.emptyText}>Dest endpoint select karo</Text>
              ) : (
                destFields.map((f, i) => (
                  <CheckboxRow
                    key={f.endpoint_field_id}
                    field={f}
                    index={i}
                    isSelected={destSelectedFields.some(
                      x => x.endpoint_field_id === f.endpoint_field_id,
                    )}
                    onToggle={toggleDest}
                  />
                ))
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={addMapping}>
          <Text style={styles.addBtnText}>Add Mapping</Text>
        </TouchableOpacity>

        {mappings.map((m, i) => (
          <View key={i} style={styles.mapItem}>
            <Text style={styles.mapText} numberOfLines={2}>
              {m.displayText} ({m.transform})
            </Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() =>
                setMappings(prev => prev.filter((_, idx) => idx !== i))
              }
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.msgTypeContainer}>
          <Text style={styles.msgTypeTitle}>Message Type</Text>
          <View style={styles.msgTypeRow}>
            {['ADT', 'ORM', 'ORU', 'DFT'].map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setMsgType(type)}
                style={[
                  styles.msgTypeChip,
                  msgType === type && styles.msgTypeChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.msgTypeChipText,
                    msgType === type && styles.msgTypeChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.saveContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0D253C" />
          ) : (
            <Button title="Add Channels" onPress={saveChannel} />
          )}
        </View>
      </ScrollViewContainer>
      <NavigationHomeEndPointRoutesLogs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mappingBox: {
    borderWidth: 1,
    borderColor: '#0D253C',
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  mappingHeader: {
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0D253C',
    borderBottomWidth: 1,
    borderBottomColor: '#0D253C',
    backgroundColor: '#f8f9fb',
  },
  columnHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f4f7f9',
  },
  columnHeaderLeft: { flex: 1, paddingHorizontal: 12, paddingVertical: 6 },
  columnHeaderRight: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  columnHeaderLabel: { fontWeight: 'bold', fontSize: 13, color: '#0D253C' },
  mappingRow: { flexDirection: 'row' },
  column: { flex: 1, padding: 10 },
  verticalDivider: { width: 1, backgroundColor: '#ccc' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rowNumber: {
    fontSize: 11,
    color: '#999',
    marginRight: 8,
    width: 16,
    textAlign: 'center',
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: '#555',
    marginRight: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: { backgroundColor: '#0D253C', borderColor: '#0D253C' },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  label: { fontSize: 12, color: '#333', flex: 1 },
  emptyText: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
    paddingVertical: 10,
    fontStyle: 'italic',
  },
  addBtn: {
    backgroundColor: '#0D253C',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 6,
    marginVertical: 20,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  mapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f4f7f9',
    marginVertical: 5,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mapText: { fontSize: 11, color: '#0D253C', fontWeight: '600', flex: 0.75 },
  removeBtn: {
    backgroundColor: '#0D253C',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  msgTypeContainer: { marginTop: 20, marginHorizontal: 4 },
  msgTypeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 10,
  },
  msgTypeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  msgTypeChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#0D253C',
    backgroundColor: '#fff',
  },
  msgTypeChipActive: { backgroundColor: '#0D253C' },
  msgTypeChipText: { color: '#0D253C', fontWeight: '600', fontSize: 13 },
  msgTypeChipTextActive: { color: '#fff' },
  saveContainer: { alignItems: 'center', marginTop: 30, marginBottom: 120 },
});

export default AddRouteDetail;
