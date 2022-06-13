import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-web';

function LoginScreen({navigation}) {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loginPress = () => {
    if(!id) {
      alert('아이디를 입력하세요');
      return;
    }else if(!password) {
      alert('비밀번호를 입력하세요');
      return;
    }else {
      navigation.navigate('HiKoreans')
    }
  }

  return (
    <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>HiKoreans</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        value={id}
                        autoCapitalize="none"
                        onChangeText={(id) => setId(id)}
                        style={styles.textForm} 
                        placeholder={"아이디"}/>
                    <TextInput 
                        value={password}
                        autoCapitalize="none"
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textForm} 
                        placeholder={"비밀번호"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.signupButton}
                        onPress={() => navigation.navigate('회원가입')} 
                        >
                        <Text style={styles.signupbuttonTitle}>회원가입하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={loginPress}
                        >
                        <Text style={styles.buttonTitle}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
  );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#E7EBF4',
        paddingLeft: '10%',
        paddingRight: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
  },
  titleArea: {
      width: '100%',
      alignItems: 'center',
      padding: 80,
  },
  title: {
    fontSize: 40,
  },
  formArea: {
      width: '100%',
      alignItems: 'center',
      padding: 30,
  },
  textForm: {
      backgroundColor: '#9EAFD2',
      borderRadius: 10,
      width: '60%',
      height: 30,
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 15,
  },
  buttonArea: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  signupButton: {
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 10,
  },
  signupbuttonTitle: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "#9EAFD2",
    borderRadius: 10,
    width: "10%",
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
},
buttonTitle: {
    color: 'black',
    fontSize: 20,
},
})

export default LoginScreen;  