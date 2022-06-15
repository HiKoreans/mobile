import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import writeIcon from '../images/write.png'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import recruitmentService from '../service/recruitment';
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const JobAdd = ({navigation}) => {

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [user, setUser] = useState({});
    
    const getUser = async () => {
        const temp = await AsyncStorage.getItem('accesstoken');
        const temp2 =  JSON.parse(temp);
        temp2.created =await temp2.created.substr(0, 10);
        setUser(temp2);
    };

    const _addContents = async (navigation) => {
        if(!subject || !content){
            alert('제목이나 내용이 입력되지 않았습니다. 다시 입력해주세요.'); return;
        }
        try{
            await recruitmentService.postRecruitment(user.userIdx, subject, content);
            alert('성공적으로 작성되었습니다.');
            navigation.goBack(null);
        }catch(err){
            console.log(err);
        }
    };

    const _handleTitleTextChange = text => {
        setSubject(text);
    };
    const _handleContentTextChange = text => {
        setContent(text);
    };

    useEffect(() => {
        getUser();
    },[]);

    return (
        <Container>
            <View style={styles.header}>
                <Text style={styles.headerText}>구인광고</Text>
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
                        <View style={styles.title}>
                            <TextInput 
                                style={styles.titleText} 
                                placeholder='제목 작성'
                                onChangeText={_handleTitleTextChange}
                                value={subject}/>
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