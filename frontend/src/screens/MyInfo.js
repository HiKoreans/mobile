import React from 'react';
import styled from 'styled-components/native';
import { Text, Alert, Button, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';


// const [user, setUser] = useState('');

// const fetchUser = async () => {
//   const result = await axios.get('URL',{
//         //data
//       });
//   setUser(/* 데이터 */);
// }

// useEffect(() => {
//   fetchUser();
// },[]);

const MyInfo = () => {
  
  return (
    <ScrollView>
      <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>아이디</Text>
                    <Text style={styles.content}>{/*데이터*/}</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>비밀번호</Text>
                    <Text style={styles.content}>{/*데이터*/}</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>이메일</Text>
                    <Text style={styles.content}>{/*데이터*/}</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>이름(별명)</Text>
                    <Text style={styles.content}>{/*데이터*/}</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>거주지역</Text>
                    <Text style={styles.content}>{/*데이터*/}</Text>
                </View>
      </View>
    </ScrollView>
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
      paddingLeft: 20,
      paddingTop: 30,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 10,
  },
  title: {
    width: '100%',
    fontSize : 23,
    marginBottom: 15,
  },
  content: {
      width: '100%',
      textDecorationLine: 'underline',
      fontSize : 18,
  },
})

export default MyInfo;
