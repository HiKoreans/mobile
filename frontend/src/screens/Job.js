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

// const Job = ({navigation}) => {
const Job = () => {

  const [isReady, setIsReady] = useState(false);
  const [contents, setContents] = useState({
    '1': { id: '1', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '2': { id: '2', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '3': { id: '3', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '4': { id: '4', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '5': { id: '5', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '6': { id: '6', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
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
              {/* <TouchableOpacity onPress={() => navigation.navigate('구인공고 글 페이지')}> */}
              <TouchableOpacity>
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
