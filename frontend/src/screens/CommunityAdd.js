import React, { useState } from 'react';
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

const CommunityAdd = ({navigation}) => {

    const [isReady, setIsReady] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contents, setContents] = useState({
        //데이터 연동시 제거부분
        '1': { id: '1', type: '0', title: '한국 거리두기 조정안 안내', content: '한국 거리두기 조정안 안내', writer: '관리자' },
        '2': { id: '2', type: '0', title: '미국 코로나19 백신접종 안내', content: '미국 코로나19 백신접종 안내', writer: '관리자' },
        '3': { id: '3', type: '1', title: '주변 한식당 맛집 추천해주세요~', content: '주변 한식당 맛집 추천해주세요~', writer: '햄버거질려' },
        '4': { id: '4', type: '1', title: 'abc University 재학 중인 분 계산가요?', content: 'abc University 재학 중인 분 계산가요?', writer: 'abcdef' },
        '5': { id: '5', type: '1', title: '유니버셜 스튜디오 꿀팁 공유합니다!', content: '유니버셜 스튜디오 꿀팁 공유합니다!', writer: '도날드덕' },
        '6': { id: '6', type: '1', title: '~~~~~~~~~~', content: '~~~~~~~~~~', writer: '동네생활' },
    });

    const _loadData = async () => {
        // const data = await AsyncStorage.getItem('data');
        // setContents(JSON.parse(data || '{}'));
    };

    const _addContents = (navigation) => {
        var lastID = '0';
        Object.values(contents).map(item => {
            lastID = item.id;
        })
        const newID = String(parseInt(lastID)+1);
        //관리자 식별 필요
        const newContentObject = {
            [newID] : { id: newID, type: '0', title: title, content: content, writer: '사용자' },
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
    }

    const _handleTitleTextChange = text => {
        setTitle(text);
    };
    const _handleContentTextChange = text => {
        setContent(text);
    };

    return isReady ? (
        <Container>
            <View style={styles.header}>
                <Text style={styles.headerText}>동네생활</Text>
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
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => _addContents(navigation)}>
                        <Text style={styles.uploadText}>업로드</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
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
    title: {
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
        height: SCREEN_HEIGHT*0.85-40-40-20-20-10,
        marginVertical: 10,
    },
    contentText: {
        width: SCREEN_WIDTH*0.9-20-20,
        fontSize: 20,
    },
    uploadBtn: {
        backgroundColor: 'skyblue',
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'skyblue',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    uploadText: {
        fontSize: 20,
    },
});

export default CommunityAdd;