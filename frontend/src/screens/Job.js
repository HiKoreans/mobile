import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
import recruitmentService from '../service/recruitment';
const { width : SCREEN_WIDTH } = Dimensions.get("window");
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const List = styled.ScrollView`
  flex: 1;
`;

const Job = ({navigation}) => {
  const isFocused = useIsFocused();
  const [recruitment, setRecruitment] = useState([]);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const temp = await AsyncStorage.getItem('accesstoken');
    const temp2 =  JSON.parse(temp);
    temp2.created =await temp2.created.substr(0, 10);
    setUser(temp2);
  };
  const getRecruitmentList = async ()=> {
    try{
      const result = await recruitmentService.getRecruitmentList();
      for(let i = 0; i < result.data.length; i++){
        result.data[i].tempIdx = i+1;
        result.data[i].created = await result.data[i].created.substr(0,10);
      }
      setRecruitment(result.data);
    }catch(err){
      console.log(err);
    }
  }
  const moveToAdd = (navigation)=> {
    if(user.role ==='admin'){
      navigation.navigate('구인광고 작성 페이지')
    }else {
      alert('관리자만 작성이 가능합니다.');
    }
  }

  useEffect(() => {
    getUser();
    getRecruitmentList();
  },[isFocused]);

  return  (
    <Container>
      <View style={styles.header}>
                <Text style={styles.headerText}>구인광고</Text>
                <TouchableOpacity onPress={() => moveToAdd(navigation)}>
                <Image 
                    style={styles.writeImage}
                    source={writeIcon}
                    resizeMode='contain'/>
                </TouchableOpacity>
            </View>
      <List>
        <View style={styles.outer}>
          {Object.values(recruitment)
            .map((item, index) => (
              <View style={styles.content} key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('구인광고 글 페이지', {item})}>
                  <View style={styles.titlePart}>
                    <Text style={styles.title}>{item.tempIdx}. {item.subject}</Text>
                    <Text style={styles.writer}>{item.user.nickName}</Text>
                  </View>
                </TouchableOpacity>
              </View>
          ))}
        </View>
      </List>
      <StatusBar style="auto" />
    </Container>
  )
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EBF4',
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
  writeImage: {
    marginVertical: 5,
    width: 30,
    height: 30,
  },
  content: {
    // flex: 1,
    backgroundColor: 'white',
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'skyblue',
    padding: 10,
    width: SCREEN_WIDTH/10*9,
    marginTop: 10,
  },
  titlePart: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  type: {
    color: 'red',
  },
  title: {
    fontSize : 15
  },
  writer: {
    textAlign: 'right', fontSize : 20
  },
  image: {
    // maxWidth: 100,
    // maxHeight: 100,
    width: '100%',
    height: 150, 
    // overflow: 'hidden',
  },
});

export default Job;
