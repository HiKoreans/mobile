import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppLoading from 'expo-app-loading';

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

const Market = () => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    //데이터 연동시 제거부분
    '1': { id: '1', type: '0', title: '영어팩', price: '$15', image: 'https://picsum.photos/id/237/200/300' },
    '2': { id: '2', type: '0', title: '미니냉장고', price: '$15', image: 'https://picsum.photos/id/237/200/300' },
    '3': { id: '3', type: '1', title: '주변 한식당 맛집 추천해주세요~', price: '$15', image: 'https://picsum.photos/id/237/200/300' },
    '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', price: '$15', image: '' },
    '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', price: '$15', image: '' },
    '6': { id: '6', type: '1', title: '~~~~~~~~~~', price: '$15', image: '' },
  });

  const _loadData = async () => {
    // const data = await AsyncStorage.getItem('data');
    // setContents(JSON.parse(data || '{}'));
  };

  return isReady ? (
    <List>
      <Container>
        {Object.values(contents)
          .map(item => (
            <View style={styles.content} key={item.id}>
              <TouchableOpacity>
                <View style={styles.contentHeader}>
                  <View style={styles.titlePart}>
                    <Text style={styles.type}>{item.type == '0' ? '(삽니다) ' : '(팝니다) '}</Text>
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
      </Container>
    </List>
  ) : (
    <AppLoading
      startAsync={_loadData}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

const styles = StyleSheet.create({
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
    color: 'red',
  },
  title: {

  },
  pricePart: {
    flexDirection: 'row',
  },
  price : {
    textAlign: 'right',
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
