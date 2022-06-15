import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
import boardService from '../service/board';
import { useIsFocused } from '@react-navigation/native';
const { width : SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const List = styled.ScrollView`
  flex: 1;
`;

const Community = ({navigation}) => {
  const [board, setBoard] = useState([]);
  const [notice, setNotice] = useState([]);

  const isFocused = useIsFocused();

  const getBoardList = async()=> {
    try{
      const result = await boardService.getBoardList();
      let boardTemp = [];
      let noticeTemp = [];
      for(let i = 0; i < result.data.length; i++){
        if(result.data[i].type == 0){
          boardTemp.push(result.data[i]);
        }else {
          noticeTemp.push(result.data[i]);
        }
      }
      setNotice(noticeTemp);
      setBoard(boardTemp);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getBoardList();
  },[isFocused]);
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>동네생활</Text>
        <TouchableOpacity onPress={() => navigation.navigate('동네생활 작성 페이지')}>
          <Image 
            style={styles.writeImage}
            source={writeIcon}
            resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      <List>
      
      <View style={styles.outer}>
          {Object.values(notice)
            .map((item, index) => (
              <View style={styles.content} key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('동네생활 글 페이지', { item })}>
                  <View style={styles.titlePart}>
                    <Text style={styles.type}>(공지) </Text>
                    <Text style={styles.title}>{item.subject}</Text>
                  </View>
                  <Text style={styles.writer}>{item.conten}</Text>
                </TouchableOpacity>
              </View>
          ))}
        </View>
        <View style={styles.outer}>
          {Object.values(board)
            .map((item, index) => (
              <View style={styles.content} key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('동네생활 글 페이지', { item })}>
                  <View style={styles.titlePart}>
                    <Text style={styles.title}>{item.subject}</Text>
                  </View>
                  <Text style={styles.writer}>{item.content}</Text>
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
    alignItems:'center',
    backgroundColor: '#E7EBF4',
  },
  header: {
    paddingTop: 40,
    width: 'SCREEN_WIDTH*0.9',
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
    backgroundColor: 'white',
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'skyblue',
    padding: 10,
    width: SCREEN_WIDTH*0.9,
    marginTop: 10,
  },
  titlePart: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  type: {
    color: 'red',
  },
  title: {

  },
  writer: {
    textAlign: 'right',
  },
});

export default Community;
