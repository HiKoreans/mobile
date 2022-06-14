import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';
import writeIcon from '../images/write.png'

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

`;

const CommunityClick = ({navigation}) => {

    const [isReady, setIsReady] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [content, setContent] = useState({
      //데이터 연동시 제거부분
      image: 'https://picsum.photos/id/237/200/300', writer: '햄버거질려', title: '주변 한식당 맛집 추천해주세요~', content: '요즘 햄버거를 너무 많이 먹었더니 질리네요..\n동네 주변 한식당 맛집 아시는 분 추천 부탁드려요!'
    });
    const [comments, setComments] = useState({
        //데이터 연동시 제거부분
        '1': { id: '1', writer: 'cba', comment: 'abc University 건너편 "맛있다" 추천드려요~ 한국 사장님이 운영하시는 데 진짜 맛있습니다~' },
        '2': { id: '2', writer: '도날드덕', comment: 'abc University 건너편 "맛있다" 맛있어요!!' },
        // '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', writer: 'abcdef' },
        // '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', writer: '도날드덕' },
        // '6': { id: '6', type: '1', title: '~~~~~~~~~~', writer: '동네생활' },
    });
  
    const _loadData = async () => {
      // const data = await AsyncStorage.getItem('data');
      // setContents(JSON.parse(data || '{}'));
    //   setComments();
    };

    const _addComment = () => {
        var lastID = '0';
        Object.values(comments).map(item => {
            lastID = item.id;
        })
        const newID = String(parseInt(lastID)+1);
        const newCommentObject = {
            [newID] : { id: newID, writer: '사용자', comment: newComment },
        };
        setNewComment('');
        setComments({ ...comments, ...newCommentObject });
        _saveComments({ ...comments, ...newCommentObject });
        // const lastID
        // const ID = 
        
    };

    const _saveComments = async comments => {
        // 서버에 저장
        // try {
        //     await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        //     setTasks(tasks);
        //   } catch (e) {
        //     console.error(e);
        //   }
    };

    const _handleTextChange = text => {
        setNewComment(text);
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
            <KeyboardAwareScrollView>
                <View style={styles.outer}>
                    <View style={styles.contents}>
                        <View style={styles.profile}>
                            <Image 
                                style={styles.image}
                                source={{uri: content.image}}
                                resizeMode='contain'/>
                            <Text style={styles.contentWriterText}>{content.writer}</Text>
                        </View>
                        <Text style={styles.titleText}>{content.title}</Text>
                        <Text style={styles.contentText}>{content.content}</Text>
                    </View>
                    <View style={styles.contourLine}/>
                    <List>
                    {/* <View style={styles.comments}> */}
                        {Object.values(comments)
                        .map(item => (
                            item.id == "1" ? 
                                <View style={styles.comment} key={item.id}>
                                    <Text style={styles.writerText}>{item.writer}</Text>
                                    <Text style={styles.commentText}>{item.comment}</Text>
                                </View>
                            :
                                <View style={styles.comment} key={item.id}>
                                    <View style={styles.contourLine}/>
                                    <Text style={styles.writerText}>{item.writer}</Text>
                                    <Text style={styles.commentText}>{item.comment}</Text>
                                </View>
                        ))}
                    {/* </View> */}
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

    },
    writerText: {
        fontSize: 17,
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

export default CommunityClick;