import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
import { useIsFocused } from '@react-navigation/native';
import secondhandService from '../service/secondhand';

const { width : SCREEN_WIDTH } = Dimensions.get("window");

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

const Market = ({navigation}) => {
  const isFocused = useIsFocused();

  const [secondhand, setSeconhand] = useState([]);

  const getSecondHandList = async ()=> {
    try{
      const result = await secondhandService.getSecondhandList();
      setSeconhand(result.data);
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(() => {
    getSecondHandList();
  },[isFocused]);

  return  (
    <Container>
      <View style={styles.header}>
        <Text style={styles.headerText}>벼룩시장</Text>
        <TouchableOpacity onPress={() => navigation.navigate('벼룩시장 작성 페이지')}>
          <Image 
            style={styles.writeImage}
            source={writeIcon}
            resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      <List>
        <View style={styles.outer}>
          {Object.values(secondhand)
            .map((item, index) => (
              <View style={styles.content} key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('벼룩시장 글 페이지', {item})}>
                  <View style={styles.contentHeader}>
                    <View style={styles.titlePart}>
                      <Text style={{...styles.type, color : item.type == '0' ? 'red' : 'royalblue'}}>{item.type == '0' ? '(삽니다) ' : '(팝니다) '}</Text>
                      <Text style={styles.title}>{item.subject}</Text>
                    </View>
                    <View style={styles.pricePart}>
                      <Text style={styles.price}>${item.price}</Text>
                    </View>
                  </View>
                  {item.image == '' ? 
                  <View style={styles.imagePart}/>
                  : 
                  <View style={styles.imagePart}>
                    <Image 
                      style={styles.image}
                      source={{uri: item.image}}
                      resizeMode='contain'/>
                  </View>
                  }
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
    backgroundColor: 'white',
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'skyblue',
    padding: 10,
    width: SCREEN_WIDTH/10*9,
    marginTop: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  titlePart: {
    flexDirection: 'row',
  },
  type: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  pricePart: {
    flexDirection: 'row',
  },
  price : {
    textAlign: 'right',
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    // maxWidth: 100,
    // maxHeight: 100,
    width: 150,
    height: 150, 
    // overflow: 'hidden',
  },
});

export default Market;
