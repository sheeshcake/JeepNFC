import React from 'react';
import {Login, JeepHome, Account, LoadingPage, LoadCard, MarshallHome, BusDetails, Pay} from './pages';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Login'}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="JeepHome"
          component={JeepHome}
        />
        <Stack.Screen
          name="LoadingPage"
          component={LoadingPage}
        />
        <Stack.Screen
          name="LoadCard"
          component={LoadCard}
        />
        <Stack.Screen
          name="Account"
          component={Account}
        />
        <Stack.Screen
          name="Pay"
          component={Pay}
        />
        <Stack.Screen
          name="MarshallHome"
          component={MarshallHome}
        />
        <Stack.Screen
          name="BusDetails"
          component={BusDetails}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;