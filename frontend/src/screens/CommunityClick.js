import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'
import boardService from '../service/board';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
  /* padding-top: 50; */
  
  /* behavior: "padding"; */
  /* border-radius: 10;
  border-width: 1;
  border-color: skyblue; */
`;
const List = styled.ScrollView`
    /* width: '100%', */
`;


const CommunityClick = ({route, navigation}) => {
    const {item} = route.params;
    
    const [newComment, setNewComment] = useState('');
    const [board, setBoard] = useState({});
    const [boardUser, setboardUser] = useState({});
    const [comment, setComment] = useState([]);
    const [user, setUser] = useState({});

    const getBoard =  () => {
        item.created= item.created.substr(0, 10);
        setBoard(item);
        setboardUser(item.user);
    };
    const getComment = async () => {
        try {
            const result = await boardService.getComment(item.boardIdx);
            setComment(result.data)
        }catch(err){
            console.log(err);
        }
    };
    const getUser = async () => {
        try{
            const temp = await AsyncStorage.getItem('accesstoken');
            const temp2 =  JSON.parse(temp);
            temp2.created =await temp2.created.substr(0, 10);
            setUser(temp2);
        }catch(err){
            console.log(err);
        }
    };
    
    useEffect(() => {
        getBoard();
        getComment();
        getUser();
    },[]);

    const addComment = async  () => {
        try{
            const userIdx = user.userIdx;
            const boardIdx = board.boardIdx;
            const comment = newComment;
            await boardService.postBoardComment(userIdx, boardIdx, comment);
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
                <Text style={styles.headerText}>????????????</Text>
                <TouchableOpacity onPress={() => navigation.navigate('???????????? ?????? ?????????')}>
                <Image 
                    style={styles.writeImage}
                    source={writeIcon}
                    resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.outer}>
                    <View style={styles.contents}>
                        {/* <View style={styles.profile}>
                            <Text style={styles.contentWriterText}>{board.writer}</Text>
                        </View> */}
                        <Text style={styles.titleText}>{board.subject}</Text>
                        <Text style={styles.nicknameText}>????????? : {boardUser.nickName}</Text>
                        <Text style={styles.dateText}>???????????? : {board.created}</Text>
                        <Text style={styles.contentText}>{board.content}</Text>

                    </View>
                    <View style={styles.contourLine}/>
                    <List>
                        {Object.values(comment)
                        .map((item, index) => (
                            index == '0' ? 
                            <View style={styles.comment} key={index}>
                                <View style={styles.writer}>
                                    <Text style={styles.writerText}>{item.user.nickName}</Text>
                                </View>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                            :
                            <View style={styles.comment} key={index}>
                                <View style={styles.contourLine}/>
                                <View style={styles.writer}>
                                    <Text style={styles.writerText}>{item.user.nickName}</Text>
                                </View>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        ))}
                    </List>
                    <View style={styles.input}>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder='?????? ??????' 
                            onChangeText={_handleTextChange} 
                            value={newComment} >
                        </TextInput>
                        <TouchableOpacity onPress={addComment}>
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
    )
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
        // paddingBottom: 10,
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
        marginTop: 15,
        height: 40,
        fontSize: 18,
        fontWeight: '500',
    },
    titleText: {
        fontWeight: '900',
        fontSize: 23,
        marginBottom: 10,
    },
    nicknameText: {
        marginTop : 20
    },
    dateText : {
        marginBottom : 40
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

    },
    comment: {
        width: SCREEN_WIDTH*0.9,
    },
    writer: {
        flexDirection:'row',
    },
    name: {
        fontSize: 17,
    },
    writerText: {
        fontSize: 20,
        marginBottom : 10,
        fontWeight:'500',
    },
    commentText: {
        fontSize: 15,
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

export default CommunityClick;