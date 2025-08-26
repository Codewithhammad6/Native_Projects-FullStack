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
import AdminScreen from './adminScreens/AdminScreen.tsx';
import UsersScreen from './adminScreens/UsersScreen.tsx';
import UserOrderScreen from './adminScreens/UserOrderScreen.tsx';
import { ADMIN } from '@env';
import ManageOrderScreen from './adminScreens/ManageOrderScreen.tsx';
import PendingOrdersScreen from './adminScreens/PendingOrdersScreen.tsx';
import ShippedOrdersScreen from './adminScreens/ShippedOrdersScreen.tsx';
import DeliveredOrdersScreen from './adminScreens/DeliveredOrdersScreen.tsx';
import ManageProducts from './adminScreens/productScreens/ManageProducts.tsx';
import AllProducts from './adminScreens/productScreens/AllProducts.tsx';
import AddProduct from './adminScreens/productScreens/AddProduct.tsx';
import EditProduct from './adminScreens/productScreens/EditProduct.tsx';
import SearchBaseProduct from './adminScreens/productScreens/SearchBaseProduct.tsx';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen.tsx';
import ResetKeyScreen from './screens/ResetKeyScreen.tsx';
import NewPasswordScreen from './screens/NewPasswordScreen.tsx';

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
  const { isAuth, getUser,user } = userStore();

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
            {user?.email === ADMIN && (
              <>
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="UserOrders" component={UserOrderScreen} />
            <Stack.Screen name="ManageOrders" component={ManageOrderScreen} />
            <Stack.Screen name="PendingOrders" component={PendingOrdersScreen} />
            <Stack.Screen name="ShippedOrders" component={ShippedOrdersScreen} />
            <Stack.Screen name="DeliveredOrders" component={DeliveredOrdersScreen} />
              </>
            )}
            <Stack.Screen name="ManageProducts" component={ManageProducts} />
            <Stack.Screen name="AllProduct" component={AllProducts} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="SearchProduct" component={SearchBaseProduct} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Forgot" component={ForgetPasswordScreen} />
            <Stack.Screen name="Reset" component={ResetKeyScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    <ModalPortal />
      <Toast />
    </NavigationContainer>
  );
};


export default App;
