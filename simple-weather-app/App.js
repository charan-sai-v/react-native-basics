


import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignUp'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='SignUp' children={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}