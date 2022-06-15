import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'

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

// const Market = ({navigation}) => {
const Market = ({navigation}) => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    //데이터 연동시 제거부분
    '1': { id: '1', type: '0', title: '영어팩', content: '영어팩내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
    '2': { id: '2', type: '0', title: '미니냉장고', content: '미니냉장고 내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
    '3': { id: '3', type: '1', title: '주변 한식당 맛집 추천해주세요~', content: '주변 한식당 맛집내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
    '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', content: 'abc University내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
    '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', content: '유니버셜 스튜디오 꿀팁 내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
    '6': { id: '6', type: '1', title: '~~~~~~~~~~', content: '~~~~~~~~~~내용', price: '$15', writer: '관리자', image: 'https://picsum.photos/id/237/200/300' },
  });

  const _loadData = async () => {
    // const data = await AsyncStorage.getItem('data');
    // setContents(JSON.parse(data || '{}'));
  };

  return isReady ? (
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
          {Object.values(contents)
            .map(item => (
              <View style={styles.content} key={item.id}>
                <TouchableOpacity onPress={() => navigation.navigate('벼룩시장 글 페이지', {content: item})}>
                {/* <TouchableOpacity> */}
                  <View style={styles.contentHeader}>
                    <View style={styles.titlePart}>
                      <Text style={{...styles.type, color : item.type == '0' ? 'red' : 'royalblue'}}>{item.type == '0' ? '(삽니다) ' : '(팝니다) '}</Text>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.pricePart}>
                      <Text style={styles.price}>{item.price}</Text>
                    </View>
                  </View>
                  {item.image == '' ? 
                  <View style={styles.imagePart}/>
                  : 
                  <View style={styles.imagePart}>
                    {/* <Image source={require('../../assets/favicon.png')}/> */}
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
  ) : (
    <AppLoading
      startAsync={_loadData}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
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
