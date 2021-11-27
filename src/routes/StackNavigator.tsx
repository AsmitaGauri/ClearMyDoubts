import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../screens/Register';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AskQuestion from '../screens/AskQuestion';
import PostDetails from '../screens/PostDetails';

const Stack = createStackNavigator();
const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AskQuestion" component={AskQuestion} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
