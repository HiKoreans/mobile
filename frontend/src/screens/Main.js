import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Promotion from '../images/PM.jpg';
import boardService from '../service/board';
const { width : SCREEN_WIDTH } = Dimensions.get("window");
import korea from '../images/southkorea.png';
import germany from '../images/germany.png';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const List = styled.ScrollView`
  flex: 1;
`;

const Main = () => {
  const [board, setBoard]= useState([]);
  const [seconhand, setSeconhand]= useState([]);
  const [recruitment, setRecruitment]= useState([]);

  const getBoardList = async()=> {
    try{
      const result = await boardService.getBoardList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
      }
      setBoard(temp);
    }catch(err){
      console.log(err);
    }
  }
  const getSecondhandList = async()=> {
    try{
      const result = await boardService.getSecondhandList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
      }
      setSeconhand(temp);
    }catch(err){
      console.log(err);
    }
  }
  const getRecruitmentList = async()=> {
    try{
      const result = await boardService.getRecruitmentList();
      let temp = [];
      for(let i = 0; i < 3; i++){
        temp[i] = result.data[i];
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
        <Text style={styles.title}>구인공고</Text>
        
        {recruitment.map((item, index) => (
          <Text style={styles.content} key={index}>
            {item.subject}
          </Text>
        ))}
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>동네생활</Text>
        
        {board.map((item, index) => (
          <Text style={styles.content} key={index}>
            {item.subject}
          </Text>
        ))}
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>벼룩시장</Text>
        {seconhand.map((item, index) => (
          <Text style={styles.content} key={index}>
            {item.subject}
          </Text>
        ))}
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
    fontSize: 30,
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
  content: {
    fontSize: 20,
    padding: 10,
    marginLeft: 15,
  },
})

export default Main;
