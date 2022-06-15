import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen'
import HiKoreans from './screens/HomeScreen'
import SignUp from './screens/SignUp'
import CommunityClick from './screens/CommunityClick';
import MarketClick from './screens/MarketClick';
import JobClick from './screens/JobClick';
import CommunityAdd from './screens/CommunityAdd';
import MarketAdd from './screens/MarketAdd';
import JobAdd from './screens/JobAdd';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="로그인">
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignUp} />
        <Stack.Screen name="HiKoreans" component={HiKoreans} options={{headerShown: false,}}/>
        <Stack.Screen name="동네생활 글 페이지" component={CommunityClick} options={{headerShown: false,}}/>
        <Stack.Screen name="벼룩시장 글 페이지" component={MarketClick} options={{headerShown: false,}}/>
        <Stack.Screen name="구인광고 글 페이지" component={JobClick} options={{headerShown: false,}}/>
        <Stack.Screen name="동네생활 작성 페이지" component={CommunityAdd} options={{headerShown: false,}}/>
        <Stack.Screen name="벼룩시장 작성 페이지" component={MarketAdd} options={{headerShown: false,}}/>
        <Stack.Screen name="구인광고 작성 페이지" component={JobAdd} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
