import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Promotion from '../images/PM.jpg';



const Main = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.board}>
        <Text style={styles.title}>구인공고</Text>
        <View style = {{justifyContent: 'center', alignItems: 'center',}}>
          <Image style={{height: 200, width: 800,}} source={Promotion}/>
          </View>
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>동네생활</Text>
          <Text style={styles.content}>-내용</Text>
          <Text style={styles.content}>-내용</Text>
          <Text style={styles.content}>-내용</Text>
        <View style={styles.contourLine}/>
      </View>

      <View style={styles.board}>
        <Text style={styles.title}>벼룩시장</Text>
          <Text style={styles.content}>-내용</Text>
          <Text style={styles.content}>-내용</Text>
          <Text style={styles.content}>-내용</Text>
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
