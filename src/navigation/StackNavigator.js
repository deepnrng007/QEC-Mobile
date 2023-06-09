import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {
  TAB_STACK,
  REPORTS,
  AUTH,
  ALL_STACK,
  ADD_PRODUCT,
  SELECT_PROJECT,
} from './NavigationNames';
import AddProduct from '../screens/dashboard/product/AddProduct';
import AuthScreen from '../screens/auth/AuthScreen';
import ReportScreen from '../screens/dashboard/product/ReportScreen';
import SelectProject from '../screens/dashboard/product/SelectProject';
import { Theme } from '../utils';

const Stack = createStackNavigator();

const StackNavigator = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Theme.colors.white,
          shadowColor: Theme.colors.white, // iOS
          elevation: 0, // Android
        },
        headerTintColor: Theme.colors.black,
      }}>
      <Stack.Screen name={AUTH} component={AuthScreen} />
      <Stack.Screen name={TAB_STACK} component={TabNavigator} />
      <Stack.Screen name={ALL_STACK} component={AllStack} />
    </Stack.Navigator>
  );
};

const AllStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ADD_PRODUCT}
        component={AddProduct}
        options={{title: ''}}
      />
      <Stack.Screen
        name={SELECT_PROJECT}
        component={SelectProject}
        options={{title: ''}}
      />
      <Stack.Screen
        name={REPORTS}
        component={ReportScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
