// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import DashBoard from './src/screen/Dashboard';
// import AddServer from './src/screen/AddServer';
// import Routee from './src/screen/Routee';
// import AddRouteDetail from './src/screen/AddRouteDetail';
// import AddEndpoints from './src/screen/AddEndpoints';
// import ServerDetail from './src/screen/ServerDetail';
// import RouteDetail from './src/screen/RouteDetail';
// import EditServer from './src/screen/EditServer';
// import EditRouteDetail from './src/screen/EditRouteDetail';
// import Login from './src/screen/Login';
// import Signup from './src/screen/Signup';
// import MessageLogs from './src/screen/MessageLogs';
// import MessageView from './src/screen/MessageView';

// const Stack = createStackNavigator();
// const queryClient = new QueryClient();

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Signup"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="DashBoard" component={DashBoard} />
//           <Stack.Screen name="Signup" component={Signup} />
//           <Stack.Screen name="AddServer" component={AddServer} />
//           <Stack.Screen name="Routee" component={Routee} />
//           <Stack.Screen name="AddRouteDetail" component={AddRouteDetail} />
//           <Stack.Screen name="AddEndpoints" component={AddEndpoints} />
//           <Stack.Screen name="ServerDetail" component={ServerDetail} />
//           <Stack.Screen name="RouteDetail" component={RouteDetail} />
//           <Stack.Screen name="EditServer" component={EditServer} />
//           <Stack.Screen name="EditRouteDetail" component={EditRouteDetail} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="MessageLogs" component={MessageLogs} />
//           <Stack.Screen name="MessageView" component={MessageView} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </QueryClientProvider>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/screen/components/AppNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
