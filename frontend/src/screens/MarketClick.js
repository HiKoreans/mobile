import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import secondhandService from '../service/secondhand';
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const List = styled.ScrollView`
    width: 100%;
`;

const MarketClick = ({route, navigation}) => {
    const secondhandItem = route.params;
    
    const [secondhand, setSecondhand] = useState({});
    const [secondhandUser, setSecondhandUser] = useState({});

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState({});

    const getUser = async () => {
        const temp = await AsyncStorage.getItem('accesstoken');
        const temp2 =  JSON.parse(temp);
        temp2.created =await temp2.created.substr(0, 10);
        setUser(temp2);
    };
    const getSecondhand =  () => {
        secondhandItem.item.created= secondhandItem.item.created.substr(0, 10);
        setSecondhand(secondhandItem.item);
        setSecondhandUser(secondhandItem.item.user);
    }; 
    const getComment =async ()=> {
        try {
            const result = await secondhandService.getComment(secondhandItem.item.secondhandIdx);
            console.log(result.data)
            setComments(result.data)
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        getUser();
        getSecondhand();
        getComment();
    },[]);

    const _addComment = async() => {
        try{
            await secondhandService.postSecondhandComment(user.userIdx, secondhand.secondhandIdx, newComment);
            setNewComment('');
            await getComment();
        }catch(err){
            console.log(err);
        }
    };
    const _handleTextChange = text => {
        setNewComment(text);
    };
    return (
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
            <KeyboardAwareScrollView>
                <View style={styles.outer}>
                    <View style={styles.contents}>
                        {/* <View style={styles.profile}> */}
                            {/* <Image 
                                style={styles.image}
                                // source={{uri: contents.image}}
                                resizeMode='contain'/> */}
                            {/* <Text style={styles.contentWriterText}>글쓴이 : {secondhandUser.nickName}</Text>
                        </View> */}
                        <View style={styles.titlePart}>
                            <View style={styles.title}>
                                <Text style={{...styles.type, color: secondhand.type == '0' ? 'blue' : 'red'}}>{secondhand.type == '0' ? '(팝니다)': '(삽니다)'}</Text>
                                <Text style={styles.titleText}>{secondhand.subject}</Text> 
                            </View>
                            <Text style={styles.priceText}>${secondhand.price}</Text>
                        </View>
                        <Text style={styles.contentWriterText}>글쓴이 : {secondhandUser.nickName}</Text>
                        <Text style={styles.contentText}>{secondhand.content}</Text>
                    </View>
                    <View style={styles.contourLine}/>
                    <List>
                        {Object.values(comments)
                        .map((item, index) => (
                            index == "0" ?
                            <View style={styles.comment} key={index}>
                                <View style={styles.writer}>
                                    <Text style={styles.name}>이름 : </Text>
                                    <Text style={styles.writerText}>{item.user.nickName}</Text>
                                </View>
                                <Text style={styles.commentText}>내용 :  {item.comment}</Text>
                            </View>
                            :
                            <View style={styles.comment} key={index}>
                                <View style={styles.contourLine}/>
                                <View style={styles.writer}>
                                    <Text style={styles.name}>이름 : </Text>
                                    <Text style={styles.writerText}>{item.user.nickName}</Text>
                                </View>
                                <Text style={styles.commentText}>내용 :  {item.comment}</Text>
                            </View>
                        ))}
                    </List>
                    <View style={styles.input}>
                        <TextInput style={styles.textInput} placeholder='댓글 입력' onChangeText={_handleTextChange} value={newComment} ></TextInput>
                        <TouchableOpacity onPress={_addComment}>
                            <Image 
                                style={styles.writeImage}
                                source={writeIcon}
                                resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    outer: {
        marginTop: 10,
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
    contents: {
        width: '100%',
    },
    profile: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    image: {
        // maxWidth: 100,
        // maxHeight: 100,
        width: 60,
        height: 60, 
        marginRight: 10,
        
        // overflow: 'hidden',
    },
    contentWriterText: {
        textAlign: 'right',
        // marginTop: 15,
        height: 40,
        fontSize: 18,
        fontWeight: '500',
    },
    titlePart: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    title: {
        flexDirection: 'row',
    },
    type: {
        fontSize: 20,
    },
    titleText: {
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 10,
    },
    priceText : {
        fontSize: 20,
    },
    contentText: {
        fontSize: 17,
    },
    contourLine: {
        borderBottomColor: '#9EAFD2', 
        borderBottomWidth: 1, 
        width: '100%',
        padding: 10,
        marginBottom: 15,
    },
    comments: {
        width: '100%',
    },
    comment: {
        width: '100%',
    },
    writer: {
        flexDirection:'row',
    },
    name: {
        fontSize: 17,
    },
    writerText: {
        fontSize: 20,
        fontWeight:'500',
    },
    commentText: {
        fontSize: 17,
    },
    input: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius : 5,
        backgroundColor : 'skyblue',
    },
    textInput: {
        width: SCREEN_WIDTH*0.9-20-20-40-10,
        height: 40,
        marginRight: 10,
        fontSize: 17,
    },
    writeImage: {
        marginVertical: 5,
        width: 30,
        height: 30,
    },
});

export default MarketClick;