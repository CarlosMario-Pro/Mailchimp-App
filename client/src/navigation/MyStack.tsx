import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ContactCreate from '../screens/ContactCreate/ContactCreateScreen';
import DetailScreen from '../screens/Detail/DetailScreen';
import ContactUpdateScreen from '../screens/ContactUpdate/ContactUpdateScreen';
import MultiContactCreate from '../screens/MultiContactCreate/MultiContactCreateScreen';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="Mailchimp App" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="ContactCreateScreen" component={ContactCreate} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="ContactUpdateScreen" component={ContactUpdateScreen} />
        <Stack.Screen name="MultiContactCreateScreen" component={MultiContactCreate} />
    </Stack.Navigator>
  );
};
