import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import HomeScreen from './app/home/HomeScreen';
import TranscriptorScreen from './app/transcriptor/TranscriptorScreen';
import AvatarScene from './app/AvatarScene/AvatarScene';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Transcriptor" component={TranscriptorScreen} />
        <Stack.Screen name="AvatarScene" component={AvatarScene} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
