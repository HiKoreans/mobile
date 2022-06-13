import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen'
import HiKoreans from './screens/HomeScreen'
import SignUp from './screens/SignUp'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="로그인">
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignUp} />
        <Stack.Screen name="HiKoreans" component={HiKoreans}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
