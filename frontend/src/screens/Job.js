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

const Job = ({navigation}) => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    '1': { id: '1', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
    '2': { id: '2', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
    '3': { id: '3', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
    '4': { id: '4', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
    '5': { id: '5', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
    '6': { id: '6', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
  });

  const _loadData = async () => {
    // const data = await AsyncStorage.getItem('data');
    // setContents(JSON.parse(data || '{}'));
  };

  return isReady ? (
    <Container>
      <View style={styles.header}>
                <Text style={styles.headerText}>구인광고</Text>
                <TouchableOpacity onPress={() => navigation.navigate('구인광고 작성 페이지')}>
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
                <TouchableOpacity onPress={() => navigation.navigate('구인광고 글 페이지', {item})}>
                  <View style={styles.titlePart}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.writer}>{item.writer}</Text>
                  </View>
                  <Image 
                      style={styles.image}
                      source={{uri: item.image}}
                      resizeMode='contain'/>
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
    alignItems: 'center',
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
    // flex: 1,
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
    justifyContent: 'space-between',
  },
  type: {
    color: 'red',
  },
  title: {

  },
  writer: {
    textAlign: 'right',
  },
  image: {
    // maxWidth: 100,
    // maxHeight: 100,
    width: '100%',
    height: 150, 
    // overflow: 'hidden',
  },
});

export default Job;
