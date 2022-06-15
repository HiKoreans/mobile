import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import anonymous from '../service/anonymous'
const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setnickName] = useState('');
  const [region, setRegion] = useState('');

  const joinPress = async() => {
    if(!id) {
      alert('아이디를 입력하세요'); return;
    }
    else if(!password) {
      alert('비밀번호를 입력하세요'); return;
    }
    else if(!email) {
      alert('이메일을 입력하세요'); return;
    }
    else if(!nickName) {
      alert('이름(별명)을 입력하세요'); return;
    }
    else if(!region) {
      alert('지역을 입력하세요'); return;
    }
    else {
      try{
        const result = anonymous.signup(id, password, email, nickName, region);
        if(result){
          alert('회원가입 성공!');
          navigation.navigate('login');
        }else{
          alert('회원가입에 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
                <View style={styles.formArea}>
                  <Text style={styles.formName}>아이디</Text>
                    <TextInput 
                        label={id}
                        autoCapitalize="none"
                        onChangeText={(id) => setId(id)}
                        style={styles.textForm}
                     />

                    <Text style={styles.formName}>비밀번호</Text>
                    <TextInput 
                        label={password}
                        autoCapitalize="none"
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textForm} 
                        />

                    <Text style={styles.formName}>이메일</Text>
                    <TextInput 
                        label={email}
                        autoCapitalize="none"
                        onChangeText={(email) => setEmail(email)}
                        style={styles.textForm} 
                        />

                    <Text style={styles.formName}>이름(별명)</Text>
                    <TextInput 
                        label={nickName}
                        autoCapitalize="none"
                        onChangeText={(nickName) => setnickName(nickName)}
                        style={styles.textForm} 
                        />

                    <Text style={styles.formName}>지역</Text>
                    <TextInput 
                        label={region}
                        autoCapitalize="none"
                        onChangeText={(region) => setRegion(region)}
                        style={styles.textForm} 
                        />

                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={joinPress}
                        >
                        <Text style={styles.buttonTitle}>JOIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll:{
    backgroundColor: '#E7EBF4',
  },
  container: {
        backgroundColor: '#E7EBF4',
        paddingLeft: '10%',
        paddingRight: '10%',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
  },
  formArea: {
      width: '100%',
      paddingTop: 20,
  },
  formName: {
    fontSize: 20,
    marginBottom: 15,
  },
  textForm: {
      width: '100%',
      height: 30,
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 40,
      borderBottomColor: "#9EAFD2",
      borderBottomWidth: 4,
  },
  buttonArea: {
      width: '100%',
      height: '8%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
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

export default SignUp;
