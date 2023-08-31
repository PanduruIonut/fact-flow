import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';


const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
