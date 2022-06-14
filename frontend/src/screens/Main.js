import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Promotion from '../images/PM.jpg';
import boardService from '../service/board';

// const [community, setCommunity] = useState('');
// const [board, setBoard] = useState('');

// const fetchCommunity = async () => {
//   const result = await axios.get('URL',{
//         //data
//       });
//   setCommunity(/* 데이터 */);
// }

// const fetchBoard = async () => {
//   const result = await axios.get('URL',{
//         //data
//       });
//       setBoard(/* 데이터 */);
// }

// useEffect(() => {
//   fetchCommunity();
//   fetchBoard();
// },[]);


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
    <ScrollView>
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
  board:{
    width: '100%',
  },
  title:{
    fontSize: 30,
    paddingBottom: 20,
    paddingTop: 20,
  },
  contourLine: {
    borderBottomColor: '#9EAFD2', 
    borderBottomWidth: 5, 
    width: '100%',
    padding: 10,
  },
  content: {
    fontSize: 20,
    padding: 10,
  },
})

export default Main;
