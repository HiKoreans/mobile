import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
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
`;

const List = styled.ScrollView`
    width: 100%;
`;

const MarketClick = ({route, navigation}) => {

    const [newComment, setNewComment] = useState('');

    const item = route.params;
    // console.log(item.id);

    var id = '';
    var type = '';
    var title = '';
    var content = '';
    var price = '';
    var writer = '';
    var image = '';
    Object.values(item).map(item => {
        id = item.id;
        type = item.type;
        title = item.title;
        content = item.content;
        price = item.price;
        writer = item.writer;
        image = item.image;
    })


    const [contents, setContents] = useState({
        id: id, type: type, title: title, content: content, price: price, writer: writer, image: image
    });

    const [comments, setComments] = useState({
        '1': { id: '1', writer: '도날드덕', comment: '냉장고 내부 사진이 궁금합니다.' },
        '2': { id: '2', writer: '햄버거질려', comment: '거래 가능할까요?' },
    });

    const [user, setUser] = useState({});

    const fetchUser = async () => {
        const temp = await AsyncStorage.getItem('accesstoken');
        const temp2 =  JSON.parse(temp);
        temp2.created =await temp2.created.substr(0, 10);
        setUser(temp2);
    };

    useEffect(() => {
        fetchUser();
    },[]);

    const _addComment = () => {
        var lastID = '0';
        Object.values(comments).map(item => {
            lastID = item.id;
        })
        const newID = String(parseInt(lastID)+1);
        const newCommentObject = {
            [newID] : { id: newID, writer: user.nickname, comment: newComment },
            // [newID] : { id: newID, writer: 'user.nickname', comment: newComment },
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
                        <View style={styles.profile}>
                            <Image 
                                style={styles.image}
                                source={{uri: contents.image}}
                                resizeMode='contain'/>
                            <Text style={styles.contentWriterText}>{contents.writer}</Text>
                        </View>
                        <View style={styles.titlePart}>
                            <View style={styles.title}>
                                <Text style={{...styles.type, color: contents.type == '0' ? 'blue' : 'red'}}>{contents.type == '0' ? '(팝니다)': '(삽니다)'}</Text>
                                <Text style={styles.titleText}>{contents.title}</Text> 
                            </View>
                            <Text style={styles.priceText}>{contents.price}</Text>
                        </View>
                        <Text style={styles.contentText}>{contents.content}</Text>
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
        marginTop: 15,
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

export default MarketClick;