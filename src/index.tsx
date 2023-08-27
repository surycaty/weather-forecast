import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/home';
import SearchCityScreen from './components/search-city';
import WeatherScreen from './components/weather';

const Stack = createNativeStackNavigator();

function Routes() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Search" component={SearchCityScreen} options={{headerShown:false}} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
