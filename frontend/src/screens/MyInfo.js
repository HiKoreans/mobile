import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text, Alert, Button, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import korea from '../images/southkorea.png';
import germany from '../images/germany.png';
const { width : SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;
const MyInfo = () => {
  const [user, setUser] = useState({});


  const fetchUser = async () => {
    const temp = await AsyncStorage.getItem('accesstoken');
    const temp2 =  JSON.parse(temp);
    temp2.created =await temp2.created.substr(0, 10);
    setUser(temp2);
  }
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <Container>
      <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>내정보</Text>
          <View style={styles.imageArea}>
              <Image source={korea} style={styles.image}/>
              <Image source={germany} style={styles.image}/>
          </View>
        </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>아이디</Text>
                    <Text style={styles.content}>{user.id}</Text>
                    <View style={styles.contourLine}/>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>이메일</Text>
                    <Text style={styles.content}>{user.email}</Text>
                    <View style={styles.contourLine}/>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>이름(별명)</Text>
                    <Text style={styles.content}>{user.nickName}</Text>
                    <View style={styles.contourLine}/>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>가입날짜</Text>
                    <Text style={styles.content}>{user.created}</Text>
                    <View style={styles.contourLine}/>
                </View>
      </View>
      </ScrollView>
      </Container>
  );
};

const styles = StyleSheet.create({
  scroll:{
    backgroundColor: '#E7EBF4',
  },
  imageArea:{
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    paddingTop: 40,
    width: SCREEN_WIDTH*0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000', 
    borderBottomWidth: 3, 
  },
  headerText: {
    fontSize: 30,
    fontWeight: '900',
  },
  container: {
        backgroundColor: '#E7EBF4',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
  },
  titleArea: {
      width: '100%',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 30,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 10,
  },
  title: {
    width: '100%',
    fontSize : 23,
    paddingBottom: 10,
  },
  content: {
      width: '100%',
      fontSize : 18,
  },
  contourLine: {
    borderBottomColor: '#9EAFD2', 
    borderBottomWidth: 2, 
    width: '100%',
  },
})

export default MyInfo;
