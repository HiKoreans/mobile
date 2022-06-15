import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import writeIcon from '../images/write.png'
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const JobAdd = ({navigation}) => {

    const [corporation, setCorporation] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contents, setContents] = useState({
        //데이터 연동시 제거부분
        '1': { id: '1', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
        '2': { id: '2', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
        '3': { id: '3', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
        '4': { id: '4', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
        '5': { id: '5', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
        '6': { id: '6', title: 'Project Manager', content: 'Netmarble US에서 Project Manager를 모집합니다.', writer: 'Netmarble US', profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
      });
    

    const _addContents = (navigation) => {
        var lastID = '0';
        Object.values(contents).map(item => {
            lastID = item.id;
        })
        const newID = String(parseInt(lastID)+1);
        //관리자 식별 필요
        const newContentObject = {
            [newID] : { id: newID, title: title, content: content, writer: corporation, profile: 'https://picsum.photos/id/237/200/300', image: 'https://picsum.photos/id/237/200/300' },
            // [newID] : { id: newID, type: '0', title: title, content: content, writer: 'user.nickname' },
        };
        _saveContents({...contents, ...newContentObject});
        navigation.goBack(null);
    };

    const _saveContents = async contents => {
        // 서버에 저장
        // try {
        //     await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        //     setTasks(tasks);
        //   } catch (e) {
        //     console.error(e);
        //   }
    };

    const _corporationTextChange = text => {
        setCorporation(text);
    };
    const _handleTitleTextChange = text => {
        setTitle(text);
    };
    const _handleContentTextChange = text => {
        setContent(text);
    };

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.headerText}>벼룩시장</Text>
                <TouchableOpacity>
                <Image 
                    style={styles.writeImage}
                    source={writeIcon}
                    resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.outer}>
                    <View style={styles.form}>
                        <View style={styles.corporation}>
                            <Text style={styles.corporationText}>기업명 : </Text>
                            <TextInput 
                                style={styles.corporationInput}
                                onChangeText={_corporationTextChange}/>
                        </View>
                        <View style={styles.title}>
                            <TextInput 
                                style={styles.titleText} 
                                placeholder='제목 작성'
                                onChangeText={_handleTitleTextChange}
                                value={title}/>
                        </View>
                        <View style={styles.content}>
                            <ScrollView style={styles.contentScroll}>
                                <TextInput 
                                    multiline
                                    style={styles.contentText} 
                                    placeholder='내용 작성'
                                    onChangeText={_handleContentTextChange}
                                    value={content}/>
                            </ScrollView>
                        </View>  
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => _addContents(navigation)}>
                        <Text style={styles.text}>업로드</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <StatusBar style="auto" />
        </Container>
    );
};
const styles = StyleSheet.create({
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
    outer: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E7EBF4',
        height: SCREEN_HEIGHT*0.85,
        width: SCREEN_WIDTH*0.9,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'skyblue',
        padding: 10,
    },
    form: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    corporation: {
        width: "100%",
        flexDirection: 'row',
    },
    corporationText: {
        fontSize: 20,
    },
    corporationInput: {
        width: "75%",
        borderBottomColor: 'skyblue',
        borderBottomWidth: 3,
    },
    title: {
        marginTop: 10,
        width: SCREEN_WIDTH*0.9-20-20,
        borderBottomColor: 'skyblue', 
        borderBottomWidth: 3, 
    },
    titleText: {
        width: SCREEN_WIDTH*0.9-20-20,
        height: 40,
        fontSize: 20,
    },
    contentScroll: { 

    },
    content: {
        height: SCREEN_HEIGHT*0.85-40-40-20-20-60,
        marginVertical: 10,
    },
    contentText: {
        width: SCREEN_WIDTH*0.9-20-20,
        fontSize: 20,
    },
    btn: {
        backgroundColor: 'skyblue',
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'skyblue',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    buyBtn: {
        // backgroundColor: 'skyblue',
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'skyblue',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    sellBtn: {
        marginRight: 10,
        // backgroundColor: 'skyblue',
        borderRadius : 10,
        borderWidth : 1,
        // borderColor : 'skyblue',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 20,
    },
});

export default JobAdd;