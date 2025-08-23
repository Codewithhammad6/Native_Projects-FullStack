import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ModalPortal } from "react-native-modals";
import Login from './screens/Login.tsx';
import Register from './screens/Register.tsx';
import Home from './screens/Home.tsx';
import Profile from './screens/Profile.tsx';
import Ionicons from "react-native-vector-icons/Ionicons";

import userStore from './store/userStore.ts';
import Cart from './screens/Cart.tsx';
import Toast from 'react-native-toast-message';
import { StatusBar, View } from 'react-native';
import ProductInfoScreen from './screens/ProductInfoScreen.tsx';
import AddAddressScreen from './screens/AddAddressScreen.tsx';
import AddressScreen from './screens/AddressScreen.tsx';
import ConfirmationScreen from './screens/ConfirmationScreen.tsx';
import OrderScreen from './screens/OrderScreen.tsx';
import ShowOrderScreen from './screens/ShowOrderScreen.tsx';
import { Text } from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#008E97',marginTop:5 },

          tabBarIcon: ({ focused }) =>
  <Ionicons
    name={focused ? "home" : "home-outline"} 
    size={26} 
    color={focused ? "#008E97" : "gray"} 
  />
          
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { color: '#008E97',marginTop:5 },
          tabBarIcon: ({ focused }) =>
  <Ionicons
    name={focused ? "person" : "person-outline"} 
    size={26} 
    color={focused ? "#008E97" : "gray"} 
  />
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { color: '#008E97',marginTop:5 },
                 tabBarIcon: ({ focused }) =>
  <Ionicons
    name={focused ? "cart" : "cart-outline"} 
    size={26} 
    color={focused ? "#008E97" : "gray"} 
  />
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const { isAuth, getUser } = userStore();

  useEffect(() => {
    getUser();
  }, []);


  return (
    <NavigationContainer>
      <StatusBar
      barStyle="dark-content"
      />
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <>
            <Stack.Screen name="Main" component={MyTabs} />
            <Stack.Screen name="Info" component={ProductInfoScreen} />
            <Stack.Screen name="Address" component={AddAddressScreen} />
            <Stack.Screen name="Add" component={AddressScreen} />
            <Stack.Screen name="Confirm" component={ConfirmationScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="ShowOrder" component={ShowOrderScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    <ModalPortal />
      <Toast />
    </NavigationContainer>
  );
};


export default App;
