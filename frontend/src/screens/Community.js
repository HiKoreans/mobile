import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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

const Community = () => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    //데이터 연동시 제거부분
    '1': { id: '1', type: '0', title: '한국 거리두기 조정안 안내', writer: '관리자' },
    '2': { id: '2', type: '0', title: '미국 코로나19 백신접종 안내', writer: '관리자' },
    '3': { id: '3', type: '1', title: '주변 한식당 맛집 추천해주세요~', writer: '햄버거질려' },
    '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', writer: 'abcdef' },
    '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', writer: '도날드덕' },
    '6': { id: '6', type: '1', title: '~~~~~~~~~~', writer: '동네생활' },
  });

  const _loadData = async () => {
    // const data = await AsyncStorage.getItem('data');
    setContents(JSON.parse(data || '{}'));
  };

  return isReady ? (
    <List>
      <Container>
        {Object.values(contents)
          .map(item => (
            <View style={styles.content} key={item.id}>
              <TouchableOpacity>
                <View style={styles.titlePart}>
                  <Text style={styles.type}>{item.type == '0' ? '(공지) ' : ''}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.writer}>{item.writer}</Text>
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
