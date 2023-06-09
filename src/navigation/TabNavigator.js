import React from 'react';

import ProductScreen from '../screens/dashboard/product/ProductScreen';
import HomeScreen from '../screens/dashboard/home/HomeScreen';
import {HOME, PRODUCTS} from './NavigationNames';
import {Theme} from '../utils';
import HomeIcon from '../assets/images/home.svg';
import ProductIcon from '../assets/images/product.svg';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CustomTabButton from '../components/CustomTabButton';

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      activeColor={Theme.colors.primary}
      barStyle={{
        backgroundColor: Theme.colors.white,
        borderBottomColor: Theme.colors.accent,
      }}>
      <Tab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => {
            return (
              <CustomTabButton
                color={color}
                focused={focused}
                icon={<HomeIcon style={{color: color}} />}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={PRODUCTS}
        component={ProductScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => {
            return (
              <CustomTabButton
                color={color}
                focused={focused}
                icon={<ProductIcon style={{color: color}} />}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
