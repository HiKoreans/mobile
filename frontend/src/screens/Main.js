import React, {useEffect, useState} from 'react';
import boardService from '../service/board';
import styled from 'styled-components/native';
import korea from '../images/southkorea.png';
import germany from '../images/germany.png';
import secondhandService from '../service/secondhand';
import recruitmentService from '../service/recruitment';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const Main = ({navigation}) => {
  const [board, setBoard]= useState([]);
  const [seconhand, setSeconhand]= useState([]);
  const [recruitment, setRecruitment]= useState([]);

  const getBoardList = async()=> {
    try{
      const result = await boardService.getBoardList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
        temp[i].no = i+1;
      }
      setBoard(temp);
    }catch(err){
      console.log(err);
    }
  }
  const getSecondhandList = async()=> {
    try{
      const result = await secondhandService.getSecondhandList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
        temp[i].no = i+1;
      }
      setSeconhand(temp);
    }catch(err){
      console.log(err);
    }
  }
  const getRecruitmentList = async()=> {
    try{
      const result = await recruitmentService.getRecruitmentList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
        temp[i].no = i+1;
      }
      setRecruitment(temp);
    }catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
    getBoardList();
    getSecondhandList();
    getRecruitmentList();
  },[]);
  return (
    <Container>
    <ScrollView style={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HiKoreans</Text>
        <View style={styles.imageArea}>
                    <Image source={korea} style={styles.image}/>
                    <Image source={germany} style={styles.image}/>
        </View>
      </View>
    <View style={styles.container}>
        <View style={styles.board}>
        <Text style={styles.title}>구인광고</Text>
        {recruitment.map((item, index) => (
          <View style={styles.contentArea}>
          <Text style={styles.content} key={index} onPress={() => navigation.navigate('구인광고 글 페이지', { item })}>
            {item.no}. {item.subject}
          </Text>
          </View>
        ))}
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>동네생활</Text>
        {board.map((item, index) => (
          <View style={styles.contentArea}>
          <Text style={styles.content} key={index} onPress={() => navigation.navigate('동네생활 글 페이지', { item })}>
          {item.no}. {item.subject}
          </Text>
          <Text style={styles.contentWriter} onPress={() => navigation.navigate('동네생활 글 페이지', { item })}>
            {item.user.nickName}
          </Text>
          </View>
        ))}
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>벼룩시장</Text>
        {/* <Text style={styles.contentArea}> */}
        {seconhand.map((item, index) => (
          <View style={styles.contentArea}>
          <Text style={styles.content} key={index} onPress={() => navigation.navigate('벼룩시장 글 페이지', { item })}>
          {item.no}. {item.subject}
          </Text>
          <Text style={styles.contentWriter} onPress={() => navigation.navigate('벼룩시장 글 페이지', { item })}>
            {item.user.nickName}
          </Text>
          </View>
        ))}
        {/* </Text> */}
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
  board:{
    width: '100%',
  },
  title:{
    fontSize: 22,
    paddingBottom: 20,
    paddingLeft: 5,
  },
  contourLine: {
    borderBottomColor: '#9EAFD2', 
    borderBottomWidth: 5, 
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  contentArea: {
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    fontSize: 17,
  },
  contentWriter: {
    fontSize: 15,
    textAlign: 'right',
  }
})

export default Main;
