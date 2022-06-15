import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");
import recruitmentService from '../service/recruitment';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const List = styled.ScrollView`
    width: 100%;
`;

const JobClick = ({route, navigation}) => {

  const item = route.params.item;
  const [recruitment, setRecruitment] = useState({});
  const [recruitmentUser, setRecruitmentUser] = useState({});

  const getRecruitment = ()=> {
    setRecruitment(item);
    setRecruitmentUser(item.user);
  }

  useEffect(() => {
    getRecruitment();
},[]);

  return (
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
      <View style={styles.outer}>
        <List>
          <View style={styles.contents}>
            <View style={styles.profile}>
                {/* <Image 
                    style={styles.profileImage}
                    source={{uri: contents.profile}}
                    resizeMode='contain'/> */}
                <Text style={styles.contentWriterText}>작성자 : {recruitmentUser.nickName}</Text>
            </View>
            <Text style={styles.titleText}>제목 : {recruitment.subject}</Text> 
            {/* <Image 
              style={styles.image}
              source={{uri: contents.image}}
              resizeMode='contain'/> */}
              <Text style={styles.contentText}>{recruitment.content}</Text>
        </View>
        </List>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EBF4',
    height: SCREEN_HEIGHT*0.85,
    width: SCREEN_WIDTH*0.9,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'skyblue',
    padding: 10,
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
  contents: {
    width: '100%',
  },
  profile: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  profileImage: {
    // maxWidth: 100,
    // maxHeight: 100,
    width: 60,
    height: 60, 
    marginRight: 10,
    
    // overflow: 'hidden',
  },
  contentWriterText: {
    marginTop: 15,
    height: 40,
    fontSize: 18,
    fontWeight: '500',
  },
  titleText: {
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    marginVertical: 10,
    width: SCREEN_WIDTH*0.9,
    height: 150, 
  },
});

export default JobClick;