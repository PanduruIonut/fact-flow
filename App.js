import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomTabNavigator />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
