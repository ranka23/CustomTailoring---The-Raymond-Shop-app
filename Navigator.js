import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { AntDesign } from "@expo/vector-icons";

import SignInScreen from "./screens/auth/SignInScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";

import LedgerScreen from "./screens/ledger/LedgerScreen";
import CustomerProfileScreen from "./screens/ledger/CustomerProfileScreen";
import CustomerMeasurementScreen from './screens/ledger/CustomerMeasurementScreen'

import CreateScreen from "./screens/create/CreateScreen";
import CreateCustomerStartScreen from "./screens/create/CreateCustomerStartScreen";

import CreateCustomerInputScreen from "./screens/create/CreateCustomerInputScreen";
import CreateCustomerInputSelfieScreen from "./screens/create/CreateCustomerInputSelfieScreen";
import CreateCustomerConfirmScreen from "./screens/create/CreateCustomerConfirmScreen";
import CreateCustomerSuccessScreen from "./screens/create/CreateCustomerSuccessScreen";
import TakeMeasurementScreen from "./screens/create/TakeMeasurementScreen";
import CreateCustomerInvoiceScreen from "./screens/create/CreateCustomerInvoiceScreen";

import ProfileScreen from "./screens/profile/ProfileScreen";

import Test from "./components/Test";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Ledger" component={LedgerScreen} />
      <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} />
      <Stack.Screen
        name="CustomerMeasurement"
        component={CustomerMeasurementScreen}
      />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen
        name="CreateCustomerStart"
        component={CreateCustomerStartScreen}
      />
      <Stack.Screen
        name="CreateCustomerInput"
        component={CreateCustomerInputScreen}
      />
      <Stack.Screen
        name="CreateCustomerInputSelfie"
        component={CreateCustomerInputSelfieScreen}
      />
      <Stack.Screen
        name="CreateCustomerInputConfirm"
        component={CreateCustomerConfirmScreen}
      />
      <Stack.Screen
        name="CreateCustomerSuccess"
        component={CreateCustomerSuccessScreen}
      />
      <Stack.Screen name="TakeMeasurement" component={TakeMeasurementScreen} />
      <Stack.Screen
        name="CreateCustomerInvoice"
        component={CreateCustomerInvoiceScreen}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor={Colors.primary}
      barStyle={{
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Ledger"
        component={LedgerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={LedgerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="barschart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Test}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
