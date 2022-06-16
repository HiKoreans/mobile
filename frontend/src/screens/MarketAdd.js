import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import writeIcon from '../images/write.png'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import secondhandService from '../service/secondhand';
const { width : SCREEN_WIDTH, height : SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const MarketAdd = ({navigation}) => {

    const [isSelling, setIsSelling] = useState(true);

    const [user, setUser] = useState({});
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    // const [contents, setContents] = useState([]);


    const getUser = async () => {
        const temp = await AsyncStorage.getItem('accesstoken');
        const temp2 =  JSON.parse(temp);
        temp2.created =await temp2.created.substr(0, 10);
        setUser(temp2);
    };

    useEffect(() => {
        getUser();
    },[]);

    const addSecondhand = async (navigation) => {
        if(!subject){
            alert('제목을 입력해주세요.'); return;
        }else if(!content){
            alert('내용을 입력해주세요.'); return;
        }else if(!price){
            alert('금액을 입력해주세요.'); return;
        }

        try{
            await secondhandService.postSecondhand(user.userIdx, subject, content, price, isSelling);
            navigation.goBack('벼룩시장 글 페이지');
        }catch(err){
            console.log(err);
        }
    };

    const _pressSell = () => {
        setIsSelling(true);
    };
    const _pressBuy = () => {
        setIsSelling(false);
    };
    const _handlePriceTextChange = text => {
        setPrice(text);
    };
    const _handleTitleTextChange = text => {
        setSubject(text);
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
                        <View style={styles.option}>
                            <View style={styles.type}>
                                <TouchableOpacity 
                                    style={{...styles.sellBtn, 
                                        backgroundColor: isSelling == true ? 'skyblue' : 'ivory',
                                        borderColor : isSelling == true ? 'skyblue' : 'ivory',}} onPress={_pressSell}>
                                    <Text style={styles.text}>팝니다</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{...styles.buyBtn, 
                                        backgroundColor: isSelling == true ? 'ivory' : 'skyblue',
                                        borderColor : isSelling == true ? 'ivory' : 'skyblue',}} onPress={_pressBuy}>
                                    <Text style={styles.text}>삽니다</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput placeholder='가격' onChangeText={_handlePriceTextChange} value={price} />
                        </View>
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
                    <TouchableOpacity style={styles.btn} onPress={() => addSecondhand(navigation)}>
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
        paddingHorizontal: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    type: {
        flexDirection: 'row',
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

export default MarketAdd;