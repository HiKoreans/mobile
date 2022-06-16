import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import anonymousService from '../service/anonymous'
import AsyncStorage from '@react-native-async-storage/async-storage';
import korea from '../images/southkorea.png';
import germany from '../images/germany.png';

function LoginScreen({navigation}) {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  const loginPress = async () => {
    if(!id) {
      alert('아이디를 입력하세요');
      return;
    }else if(!password) {
      alert('비밀번호를 입력하세요');
      return;
    }else {
      try{
        const result = await anonymousService.signin(id, password);
        if(result.data.data){
          const temp = JSON.stringify(result.data.data)
          await AsyncStorage.setItem('accesstoken', temp);
          navigation.navigate('HiKoreans')
        }else {
          alert('존재하는 회원 정보가 없습니다. 다시 입력해주세요.')
        }
      }catch(err){
        // alert(err);
      }
    }
  }

  return (
    <View style={styles.container}>
                <View style={styles.titleArea}>
                  <View style={styles.imageArea}>
                    <Image source={korea} style={styles.image}/>
                    <Image source={germany} style={styles.image}/>
                    </View>
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
        paddingBottom: '10%',
  },
  titleArea: {
      width: '100%',
      alignItems: 'center',
  },
  title: {
    fontSize: 50,
  },
  imageArea:{
    flexDirection: 'row',
    paddingBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  formArea: {
      width: '100%',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
      marginTop: 15,
  },
  textForm: {
      backgroundColor: '#9EAFD2',
      borderRadius: 10,
      width: '80%',
      height: 40,
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 15,
  },
  buttonArea: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  signupbuttonTitle: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "#9EAFD2",
    borderRadius: 10,
    width: "35%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
buttonTitle: {
    color: 'black',
    fontSize: 20,
},
})

export default LoginScreen;  