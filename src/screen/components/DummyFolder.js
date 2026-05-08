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

//         <View style={[styles.serverHeaderRow, styles.headerBorder]}>
//           <Text style={styles.middleTitle}>Server Name</Text>
//           <Text style={styles.middleTitle}>Protocol</Text>
//           <Text style={styles.middleTitle}>Status</Text>
//           <Text style={styles.middleTitle}>Detail</Text>
//         </View>

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

//       <NavigationHomeEndPointRoutesLogs activeTab="Home" />
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
