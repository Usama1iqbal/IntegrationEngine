// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   getAllServers,
//   getServerEndpoints,
//   getFieldsByEndpoint,
//   addRoute,
//   rule_validation,
// } from '../API/Home';

// import ScrollViewContainer from './components/ScrollViewContainer';
// import Header from './components/Header';
// import TextInputField from './components/TextInputField';
// import Dropdown from './components/Dropdown';
// import Button from './components/Button';
// import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';

// const AddRouteDetail = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [channelName, setChannelName] = useState('');

//   const [allServers, setAllServers] = useState([]);
//   const [srcEndpoints, setSrcEndpoints] = useState([]);
//   const [destEndpoints, setDestEndpoints] = useState([]);
//   const [srcFields, setSrcFields] = useState([]);
//   const [destFields, setDestFields] = useState([]);

//   const [selectedSrcServer, setSelectedSrcServer] = useState(null);
//   const [selectedDesServer, setSelectedDesServer] = useState(null);
//   const [selectedSrcEndpoint, setSelectedSrcEndpoint] = useState(null);
//   const [selectedDesEndpoint, setSelectedDesEndpoint] = useState(null);
//   const [selectedMsgType, setSelectedMsgType] = useState('ADT');

//   const [tempSrcIds, setTempSrcIds] = useState([]);
//   const [tempDestIds, setTempDestIds] = useState([]);
//   const [finalMappings, setFinalMappings] = useState([]);

//   useEffect(() => {
//     getAllServers()
//       .then(data => setAllServers(data || []))
//       .catch(() => Alert.alert('Error', 'Failed to load servers'));
//   }, []);

//   useEffect(() => {
//     if (selectedSrcServer) {
//       setSrcEndpoints([]);
//       setSrcFields([]);
//       setSelectedSrcEndpoint(null);
//       getServerEndpoints(selectedSrcServer)
//         .then(data => setSrcEndpoints(data || []))
//         .catch(() => Alert.alert('Error', 'Failed to load source endpoints'));
//     }
//   }, [selectedSrcServer]);

//   useEffect(() => {
//     if (selectedDesServer) {
//       setDestEndpoints([]);
//       setDestFields([]);
//       setSelectedDesEndpoint(null);
//       getServerEndpoints(selectedDesServer)
//         .then(data => setDestEndpoints(data || []))
//         .catch(() =>
//           Alert.alert('Error', 'Failed to load destination endpoints'),
//         );
//     }
//   }, [selectedDesServer]);

//   useEffect(() => {
//     if (selectedSrcEndpoint) {
//       setSrcFields([]);
//       getFieldsByEndpoint(selectedSrcEndpoint)
//         .then(data => setSrcFields(data || []))
//         .catch(() => Alert.alert('Error', 'Failed to load source fields'));
//     }
//   }, [selectedSrcEndpoint]);

//   useEffect(() => {
//     if (selectedDesEndpoint) {
//       setDestFields([]);
//       getFieldsByEndpoint(selectedDesEndpoint)
//         .then(data => setDestFields(data || []))
//         .catch(() => Alert.alert('Error', 'Failed to load destination fields'));
//     }
//   }, [selectedDesEndpoint]);

//   const addMappingToTable = () => {
//     if (tempSrcIds.length === 0 || tempDestIds.length === 0) {
//       Alert.alert(
//         'Error',
//         'Please select source and destination fields first!',
//       );
//       return;
//     }

//     if (tempSrcIds.length > 1 && tempDestIds.length > 1) {
//       Alert.alert(
//         'Invalid Selection',
//         'Please select only one source or one destination field to create mapping.',
//       );
//       return;
//     }

//     let is_valid_mapping = true;
//     let errorMsg = '';

//     outer: for (const src_element of tempSrcIds) {
//       if (rule_validation[src_element.name]) {
//         const dest_value = rule_validation[src_element.name];
//         for (const dest_element of tempDestIds) {
//           if (!dest_value.dest.includes(dest_element.name)) {
//             errorMsg = `You cannot map "${src_element.name}" to "${dest_element.name}"`;
//             is_valid_mapping = false;
//             break outer;
//           }
//         }
//       } else {
//         errorMsg = `"${src_element.name}" is not present in the validation list.`;
//         is_valid_mapping = false;
//         break;
//       }
//     }

//     if (!is_valid_mapping) {
//       Alert.alert('Invalid Mapping', errorMsg);
//       return;
//     }

//     let transform = rule_validation[tempSrcIds[0].name]?.type || 'copy';
//     if (tempSrcIds.length > 1) transform = 'concat';
//     else if (tempDestIds.length > 1) transform = 'split';

//     const config = rule_validation[tempSrcIds[0].name]?.config || {};

//     const newRule = {
//       src_paths: tempSrcIds.map(f => f.endpoint_filed_id),
//       dest_paths: tempDestIds.map(f => f.endpoint_filed_id),
//       transform: transform,
//       config: config,
//       displayText: `${tempSrcIds.map(f => f.name).join(' + ')} → ${tempDestIds
//         .map(f => f.name)
//         .join(' + ')}`,
//     };

//     setFinalMappings(prev => [...prev, newRule]);
//     setTempSrcIds([]);
//     setTempDestIds([]);
//   };

//   const removeMappingFromTable = index => {
//     setFinalMappings(prev => prev.filter((_, idx) => idx !== index));
//   };

//   const handleSaveChannel = async () => {
//     if (!channelName.trim()) {
//       return Alert.alert('Error', 'Please enter a channel name');
//     }
//     if (!selectedSrcServer || !selectedDesServer) {
//       return Alert.alert(
//         'Error',
//         'Please select source and destination servers',
//       );
//     }
//     if (!selectedSrcEndpoint || !selectedDesEndpoint) {
//       return Alert.alert(
//         'Error',
//         'Please select source and destination endpoints',
//       );
//     }
//     if (finalMappings.length === 0) {
//       return Alert.alert('Error', 'Please add at least one field mapping');
//     }

//     setLoading(true);

//     const payload = {
//       name: channelName.trim(),
//       src_server_id: selectedSrcServer,
//       src_endpoint_id: selectedSrcEndpoint,
//       dest_server_id: selectedDesServer,
//       dest_endpoint_id: selectedDesEndpoint,
//       msg_type: selectedMsgType,
//       rules: {
//         mappings: finalMappings.map(({ displayText, ...rule }) => rule),
//       },
//     };

//     try {
//       await addRoute(payload);
//       Alert.alert('Success', 'Channel and Mappings Saved!');
//       navigation.navigate('DashBoard');
//     } catch (error) {
//       const detail = error.response?.data?.detail;
//       const message =
//         typeof detail === 'string'
//           ? detail
//           : Array.isArray(detail)
//           ? detail.map(d => d.msg).join(', ')
//           : 'Something went wrong. Check your input.';
//       Alert.alert('Error', message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSelection = (field, list, setList) => {
//     const exists = list.find(
//       f => f.endpoint_filed_id === field.endpoint_filed_id,
//     );
//     if (exists) {
//       setList(
//         list.filter(f => f.endpoint_filed_id !== field.endpoint_filed_id),
//       );
//     } else {
//       setList([...list, field]);
//     }
//   };

//   const CheckboxRow = ({ field, index, selectedList, onToggle }) => {
//     const isSelected = selectedList.find(
//       x => x.endpoint_filed_id === field.endpoint_filed_id,
//     );
//     return (
//       <TouchableOpacity
//         style={styles.checkRow}
//         onPress={() => onToggle(field)}
//         activeOpacity={0.6}
//       >
//         <Text style={styles.rowNumber}>{index + 1}</Text>
//         <View style={[styles.box, isSelected && styles.selected]}>
//           {isSelected && <Text style={styles.checkMark}>✓</Text>}
//         </View>
//         <Text style={styles.label}>{field.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollViewContainer>
//         <Header title="Add Channels" fontSize={25} />

//         <TextInputField
//           title="Channel Name"
//           value={channelName}
//           onChangeText={setChannelName}
//           placeholder="Enter Channel Name"
//         />

//         <Dropdown
//           title="Source Server"
//           options={allServers.map(s => s.name)}
//           onSelect={v => {
//             const found = allServers.find(s => s.name === v);
//             setSelectedSrcServer(found?.server_id);
//           }}
//           placeholder="Select Source server"
//         />
//         <Dropdown
//           title="Source endpoint"
//           options={srcEndpoints.map(e => e.url)}
//           onSelect={v => {
//             const found = srcEndpoints.find(e => e.url === v);
//             setSelectedSrcEndpoint(found?.endpoint_id);
//           }}
//           placeholder="Select Source endpoint"
//         />

//         <Dropdown
//           title="Destination Server"
//           options={allServers.map(s => s.name)}
//           onSelect={v => {
//             const found = allServers.find(s => s.name === v);
//             setSelectedDesServer(found?.server_id);
//           }}
//           placeholder="Select Destination server"
//         />
//         <Dropdown
//           title="Destination endpoint"
//           options={destEndpoints.map(e => e.url)}
//           onSelect={v => {
//             const found = destEndpoints.find(e => e.url === v);
//             setSelectedDesEndpoint(found?.endpoint_id);
//           }}
//           placeholder="Select Destination endpoint"
//         />

//         {/* Mapping Table */}
//         <View style={styles.mappingBox}>
//           <Text style={styles.mappingHeader}>Mapping</Text>

//           <View style={styles.columnHeaderRow}>
//             <View style={styles.columnHeaderLeft}>
//               <Text style={styles.columnHeaderLabel}>Source</Text>
//               <Text style={styles.columnSubLabel}>No</Text>
//             </View>
//             <View style={styles.columnHeaderRight}>
//               <Text style={styles.columnHeaderLabel}>Destination</Text>
//               <Text style={styles.columnSubLabel}>No</Text>
//             </View>
//           </View>

//           <View style={styles.mappingRow}>
//             <View style={styles.column}>
//               {srcFields.length === 0 ? (
//                 <Text style={styles.emptyText}>Select source endpoint</Text>
//               ) : (
//                 srcFields.map((f, i) => (
//                   <CheckboxRow
//                     key={f.endpoint_filed_id || i}
//                     field={f}
//                     index={i}
//                     selectedList={tempSrcIds}
//                     onToggle={field =>
//                       toggleSelection(field, tempSrcIds, setTempSrcIds)
//                     }
//                   />
//                 ))
//               )}
//             </View>

//             <View style={styles.verticalDivider} />

//             <View style={styles.column}>
//               {destFields.length === 0 ? (
//                 <Text style={styles.emptyText}>Select dest endpoint</Text>
//               ) : (
//                 destFields.map((f, i) => (
                  
//                   <CheckboxRow
//                     key={f.endpoint_filed_id || i}
//                     field={f}
//                     index={i}
//                     selectedList={tempDestIds}
//                     onToggle={field =>
//                       toggleSelection(field, tempDestIds, setTempDestIds)
//                     }
//                   />
//                 ))
//               )}
//             </View>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.addBtn}
//           onPress={addMappingToTable}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.addBtnText}>Add Mapping</Text>
//         </TouchableOpacity>

//         {finalMappings.map((m, i) => (
//           <View key={i} style={styles.mapItem}>
//             <Text style={styles.mapText} numberOfLines={2}>
//               {m.displayText} ({m.transform})
//             </Text>
//             <TouchableOpacity
//               onPress={() => removeMappingFromTable(i)}
//               activeOpacity={0.7}
//               style={styles.removeBtn}
//             >
//               <Text style={styles.removeText}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         ))}

//         {/* Message Type Chips */}
//         <View style={styles.msgTypeContainer}>
//           <Text style={styles.msgTypeTitle}>Message Type</Text>
//           <View style={styles.msgTypeRow}>
//             {['ADT', 'ORM', 'ORU', 'DFT'].map(type => {
//               const isActive = selectedMsgType === type;
//               return (
//                 <TouchableOpacity
//                   key={type}
//                   onPress={() => setSelectedMsgType(type)}
//                   activeOpacity={0.7}
//                   style={[
//                     styles.msgTypeChip,
//                     isActive && styles.msgTypeChipActive,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.msgTypeChipText,
//                       isActive && styles.msgTypeChipTextActive,
//                     ]}
//                   >
//                     {type}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>

//         {/* Save Button */}
//         <View style={styles.saveContainer}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#0D253C" />
//           ) : (
//             <Button title="Add Channels" onPress={handleSaveChannel} />
//           )}
//         </View>
//       </ScrollViewContainer>

//       <NavigationHomeEndPointRoutesLogs />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   mappingBox: {
//     borderWidth: 1,
//     borderColor: '#0D253C',
//     borderRadius: 8,
//     marginTop: 20,
//     marginHorizontal: 2,
//     overflow: 'hidden',
//   },
//   mappingHeader: {
//     textAlign: 'center',
//     paddingVertical: 10,
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#0D253C',
//     borderBottomWidth: 1,
//     borderBottomColor: '#0D253C',
//     backgroundColor: '#f8f9fb',
//   },
//   columnHeaderRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//     backgroundColor: '#f4f7f9',
//   },
//   columnHeaderLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   columnHeaderRight: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderLeftWidth: 1,
//     borderLeftColor: '#ccc',
//   },
//   columnHeaderLabel: { fontWeight: 'bold', fontSize: 13, color: '#0D253C' },
//   columnSubLabel: { fontSize: 11, color: '#888', fontWeight: '600' },
//   mappingRow: { flexDirection: 'row' },
//   column: { flex: 1, padding: 10 },
//   verticalDivider: { width: 1, backgroundColor: '#ccc' },
//   checkRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     paddingHorizontal: 2,
//   },
//   rowNumber: {
//     fontSize: 11,
//     color: '#999',
//     marginRight: 8,
//     width: 16,
//     textAlign: 'center',
//   },
//   box: {
//     width: 18,
//     height: 18,
//     borderWidth: 1.5,
//     borderColor: '#555',
//     marginRight: 10,
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selected: { backgroundColor: '#0D253C', borderColor: '#0D253C' },
//   checkMark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
//   label: { fontSize: 12, color: '#333', flex: 1 },
//   emptyText: {
//     fontSize: 11,
//     color: '#aaa',
//     textAlign: 'center',
//     paddingVertical: 10,
//     fontStyle: 'italic',
//   },
//   addBtn: {
//     backgroundColor: '#0D253C',
//     alignSelf: 'center',
//     paddingHorizontal: 30,
//     paddingVertical: 12,
//     borderRadius: 6,
//     marginVertical: 20,
//   },
//   addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
//   mapItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 14,
//     backgroundColor: '#f4f7f9',
//     marginVertical: 5,
//     borderRadius: 25,
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   mapText: { fontSize: 11, color: '#0D253C', fontWeight: '600', flex: 0.75 },
//   removeBtn: {
//     backgroundColor: '#0D253C',
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   removeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
//   msgTypeContainer: { marginTop: 20, marginHorizontal: 4 },
//   msgTypeTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#0D253C',
//     marginBottom: 10,
//     marginLeft: 4,
//   },
//   msgTypeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
//   msgTypeChip: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 6,
//     borderWidth: 1.5,
//     borderColor: '#0D253C',
//     backgroundColor: '#fff',
//   },
//   msgTypeChipActive: { backgroundColor: '#0D253C' },
//   msgTypeChipText: { color: '#0D253C', fontWeight: '600', fontSize: 13 },
//   msgTypeChipTextActive: { color: '#fff' },
//   saveContainer: { alignItems: 'center', marginTop: 30, marginBottom: 120 },
// });

// export default AddRouteDetail;


















// import React, { useState, useEffect } from 'react';
// import { View, Alert, ActivityIndicator } from 'react-native';
// import ScrollViewContainer from './components/ScrollViewContainer';
// import Header from './components/Header';
// import TextInputField from './components/TextInputField';
// import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
// import Button from './components/Button';
// import Dropdown from './components/Dropdown';
// import { getAllServers, addEndpoint } from '../API/Home';

// const AddEndpoints = ({ navigation }) => {
//   const [servers, setServers] = useState([]);
//   const [selectedServerId, setSelectedServerId] = useState(null);
//   const [selectedProtocol, setSelectedProtocol] = useState(null);
//   const [url, setUrl] = useState('');
//   const [sampleMsg, setSampleMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getAllServers()
//       .then(data => setServers(data || []))
//       .catch(() => Alert.alert('Error', 'Failed to load servers'));
//   }, []);

//   const handleAddEndpoint = async () => {
    
//     if (!selectedServerId)
//       return Alert.alert('Error', 'Please select a source server');
//     if (!url.trim()) return Alert.alert('Error', 'Please enter URL');
//     if (!selectedProtocol)
//       return Alert.alert('Error', 'Please select protocol (FHIR or HL7)');
//     if (!sampleMsg.trim())
//       return Alert.alert('Error', 'Please enter sample message');

//     // sample_msg: FHIR = JSON object, HL7 = raw string
//     let parsedSampleMsg;
//     if (selectedProtocol === 'FHIR') {
//       try {
//         parsedSampleMsg = JSON.parse(sampleMsg);
//       } catch {
//         return Alert.alert('Error', 'FHIR sample message must be valid JSON');
//       }
//     } else {
//       parsedSampleMsg = sampleMsg.trim();
//     }

//     setLoading(true);
//     try {
//       await addEndpoint({
//         server_id: selectedServerId,
//         url: url.trim(),
//         server_protocol: selectedProtocol,
//         sample_msg: parsedSampleMsg,
//       });
//       Alert.alert('Success ', 'Endpoint added successfully!');
//       navigation.goBack();
//     } catch (error) {
//       const detail = error.response?.data?.detail;
//       const message =
//         typeof detail === 'string'
//           ? detail
//           : Array.isArray(detail)
//           ? detail.map(d => d.msg).join(', ')
//           : 'Something went wrong!';
//       Alert.alert('Error', message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollViewContainer>
//         <Header title="Add Endpoints" fontSize={25} />

//         <Dropdown
//           title="Source Server"
//           placeholder="Select Source Server"
//           options={servers.map(s => s.name)}
//           onSelect={v =>
//             setSelectedServerId(servers.find(s => s.name === v)?.server_id)
//           }
//         />

//         <TextInputField
//           title="URL"
//           placeholder="Enter URL"
//           value={url}
//           onChangeText={setUrl}
//         />

//         <Dropdown
//           title="Protocol"
//           placeholder="Select Protocol"
//           options={['FHIR', 'HL7']}
//           onSelect={v => setSelectedProtocol(v)}
//         />

//         <TextInputField
//           title="Sample Message"
//           placeholder={
//             selectedProtocol === 'FHIR'
//               ? '{"resourceType": "Patient", ...}'
//               : 'MSH|^~\\&|...'
//           }
//           value={sampleMsg}
//           onChangeText={setSampleMsg}
//           multiline={true}
//           numberOfLines={6}
//           inputStyle={{ height: 200 }}
//         />

//         <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 40 }}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#0D253C" />
//           ) : (
//             <Button title="Add Endpoint" onPress={handleAddEndpoint} />
//           )}
//         </View>
//       </ScrollViewContainer>
//       <NavigationHomeEndPointRoutesLogs activeTab="Endpoints" />
//     </View>
//   );
// };

// export default AddEndpoints;



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
// import { getAllServers } from '../API/Home2';

// import ScrollViewContainer from './components/ScrollViewContainer';
// import Header from './components/Header';
// import Box from './components/Box';
// import Button from './components/Button';
// import DashBoardData from './components/DashboardData';
// import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';

// const DashBoard = ({ navigation }) => {
//   const [servers, setServers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchServers();
//   }, []);

//   const fetchServers = async () => {
//     try {
//       const data = await getAllServers();
//       setServers(data);
//     } catch (error) {
//       console.log('Fetch fail: ', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const total_servers_conected = servers?.length;

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollViewContainer>
//         <Header title="Dashboard" fontSize={24} />
//         <Box total_servers_connected={total_servers_conected} />

//         <View style={styles.serverHeaderRow}>
//           <Header title="Server" fontSize={20} />
//           <Button
//             title="Add Server"
//             onPress={() => navigation.navigate('AddServer')}
//           />
//         </View>

//         {/* <View style={[styles.serverHeaderRow, styles.headerBorder]}>
//           <Text style={styles.middleTitle}>Server Name</Text>
//           <Text style={styles.middleTitle}>Protocol</Text>
//           <Text style={styles.middleTitle}>Status</Text>
//           <Text style={styles.middleTitle}>Detail</Text>
//         </View> */}

//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color="#0D253C"
//             style={{ marginTop: 20 }}
//           />
//         ) : (
//           servers.map((item, index) => (
//             <DashBoardData
//               key={item.server_id || index}
//               name={item.name}
//               protocol={item.protocol}
//               status={item.status}
//               onPress={() =>
//                 navigation.navigate('ServerDetail', { server: item })
//               }
//             />
//           ))
//         )}
//       </ScrollViewContainer>

//       <NavigationHomeEndPointRoutesLogs anavigation={navigation} activeTab="Home" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   serverHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//     marginTop: 10,
//     paddingHorizontal: 10,
//   },
//   headerBorder: {
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     paddingBottom: 5,
//   },
//   middleTitle: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#aaa',
//   },
// });

// export default DashBoard;


// add server
// import React, { useState } from 'react';
// import { StyleSheet, View, Alert } from 'react-native';
// import { addServerToDB } from '../API/Home';

// import TextInputField from './components/TextInputField';
// import Button from './components/Button';
// import NavigationHomeEndPointRoutesLogs from './components/NavigationHomeEndPointRoutesLogs';
// import ScrollViewContainer from './components/ScrollViewContainer';
// import Dropdown from './components/Dropdown';
// import Header from '../screen/components/Header';

// const AddServer = ({ navigation }) => {
//   const [ip, setIp] = useState('');
//   const [port, setPort] = useState('');
//   const [name, setName] = useState('');
//   const [protocol, setProtocol] = useState('FHIR');
//   const [category, setCategory] = useState('EHR');

//   const handleAddServer = async () => {
//     if (!name || !ip || !port) {
//       Alert.alert('Error');
//       return;
//     }

//     const payload = {
//       name: name,
//       ip: ip,
//       port: parseInt(port, 10),
//       protocol: protocol,
//       category: category,
//     };

//     try {
//       console.log('Sending Payload:', JSON.stringify(payload));
//       const response = await addServerToDB(payload);

//       if (response) {
//         Alert.alert('Success ', 'Added!');
//         navigation.navigate('DashBoard');
//       }
//     } catch (error) {
//       const detail = error.response?.data?.detail;

//       const message =
//         typeof detail === 'string'
//           ? detail
//           : Array.isArray(detail)
//           ? detail.map(d => d.msg).join(', ')
//           : error.message || 'Connection fail';

//       Alert.alert('Backend Error', message);
//     }
//   };
//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollViewContainer>
//         <Header title="Add Server" fontSize={25} />

//         <TextInputField
//           title="Server IP"
//           placeholder="e.g. 8.8.8.8"
//           value={ip}
//           onChangeText={setIp}
//         />
//         <TextInputField
//           title="Server Port"
//           placeholder="e.g. 443"
//           value={port}
//           keyboardType="numeric"
//           onChangeText={setPort}
//         />
//         <TextInputField
//           title="Server Name"
//           placeholder="Enter Server Name"
//           value={name}
//           onChangeText={setName}
//         />

//         <View style={{ marginTop: 10 }}>
//           <Dropdown
//             title="Protocol"
//             options={['FHIR', 'HL7']}
//             onSelect={val => setProtocol(val)}
//           />
//         </View>
//         <View style={{ marginTop: 10 }}>
//           <Dropdown
//             title="Category"
//             options={['EHR', 'LIS', 'Payer', 'PHR']}
//             onSelect={val => setCategory(val)}
//           />
//         </View>

//         <View style={{ marginVertical: 50, alignItems: 'center' }}>
//           <Button title="Add Server" onPress={handleAddServer} />
//         </View>
//       </ScrollViewContainer>

//       <NavigationHomeEndPointRoutesLogs />
//     </View>
//   );
// };

// export default AddServer;
