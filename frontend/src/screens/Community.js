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

const List = styled.ScrollView`
  flex: 1;
`;

const Community = ({navigation}) => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    //데이터 연동시 제거부분
    '1': { id: '1', type: '0', title: '한국 거리두기 조정안 안내', writer: '관리자', content: '한국 거리두기 조정안 안내' },
    '2': { id: '2', type: '0', title: '미국 코로나19 백신접종 안내', writer: '관리자', content: '미국 코로나19 백신접종 안내' },
    '3': { id: '3', type: '1', title: '주변 한식당 맛집 추천해주세요~', writer: '햄버거질려', content: '주변 한식당 맛집 추천해주세요~' },
    '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', writer: 'abcdef', content: 'abc University 재학 중인 분 계산가요?' },
    '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', writer: '도날드덕', content: '유니버셜 스튜디오 꿀팁 공유합니다!' },
    '6': { id: '6', type: '1', title: '~~~~~~~~~~', writer: '동네생활', content: '~~~~~~~~~~' },
  });

  const _loadData = async () => {
    // const data = await AsyncStorage.getItem('data');
    // setContents(JSON.parse(data || '{}'));
  };

  return isReady ? (
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
          {Object.values(contents)
            .map(item => (
              <View style={styles.content} key={item.id}>
                <TouchableOpacity onPress={() => navigation.navigate('동네생활 글 페이지')}>
                {/* <TouchableOpacity> */}
                  <View style={styles.titlePart}>
                    <Text style={styles.type}>{item.type == '0' ? '(공지) ' : ''}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <Text style={styles.writer}>{item.writer}</Text>
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
