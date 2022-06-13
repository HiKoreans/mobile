import React from 'react';
import styled from 'styled-components/native';
import { Text, Alert, Button, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  // align-items: center;
  background-color: #E7EBF4;
  
`;

const MyInfo = () => {
  return (
    <Container>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>이름(닉네임)</Text>
                    <Text style={styles.content}>이름이름</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>아이디</Text>
                    <Text style={styles.content}>ID</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>비밀번호</Text>
                    <Text style={styles.content}>***</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>전화번호</Text>
                    <Text style={styles.content}>010-1111-1111</Text>
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>거주지역</Text>
                    <Text style={styles.content}>Canada</Text>
                </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  titleArea: {
      width: '100%',
      alignItems: 'center',
      paddingLeft: 20,
      paddingTop: 30,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 10,
      marginBottom: 10,
  },
  title: {
    width: '100%',
    fontSize : 23,
    marginBottom: 15,
  },
  content: {
      width: '100%',
      textDecorationLine: 'underline',
      fontSize : 18,
  },
})

export default MyInfo;
