import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-web';

function LoginScreen({navigation}) {
  return (
    <View>
      <Button 
        title="로그인하기" 
        onPress={() => navigation.navigate('home')} 
      />
    </View>
  );
}

export default LoginScreen;  