import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Login';
import Signup from '../Signup';
import AddServer from '../AddServer';
import DashBoard from '../Dashboard';
import Routee from '../Routee';
import AddRouteDetail from '../AddRouteDetail';
import AddEndpoints from '../AddEndpoints';
import ServerDetail from '../ServerDetail';
import RouteDetail from '../RouteDetail';
import EditServer from '../EditServer';
import EditRouteDetail from '../EditRouteDetail';
import MessageLogs from '../MessageLogs';
import MessageView from '../MessageView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DashBoard"
        component={DashBoard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddServer"
        component={AddServer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Routee"
        component={Routee}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddRouteDetail"
        component={AddRouteDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddEndpoints"
        component={AddEndpoints}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ServerDetail"
        component={ServerDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditServer"
        component={EditServer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditRouteDetail"
        component={EditRouteDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MessageLogs"
        component={MessageLogs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MessageView"
        component={MessageView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
