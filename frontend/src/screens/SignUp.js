import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
// import axios from 'axios';

// function postUser() {
//     const result = await axios.post('URL',{
//       	//데이터 
//         userid: id,
//         userpassword: password,
//         useremail: email,
//         username: nickName,
//         userregion: region
//     });
// }



const SignUp = () => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setnickName] = useState('');
  const [region, setRegion] = useState('');

  const joinPress = () => {
    if(!id) {
      alert('아이디를 입력하세요');
      return;
    }
    else if(!password) {
      alert('비밀번호를 입력하세요');
      return;
    }
    else if(!email) {
      alert('이메일을 입력하세요');
      return;
    }
    else if(!nickName) {
      alert('이름(별명)을 입력하세요');
      return;
    }
    else if(!region) {
      alert('지역을 입력하세요');
      return;
    }
    else {
      // postUser();
      alert('회원가입 성공!');
      navigation.navigate('login')
    }
  }

  return (
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
  );
};

const styles = StyleSheet.create({
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
      marginBottom: 15,
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

export default SignUp;
