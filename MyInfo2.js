import React from 'react';
import styled from 'styled-components/native';
import { Text, Alert, Button, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #E7EBF4;
  
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const MyInfo = () => {
  return (
    <Container>
      <StyledText>내정보</StyledText>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Simple App</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"Password"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        // onPress={this._doLogin.bind(this)}
                        >
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  titleArea: {
      width: '100%',
      // padding: wp('10%'),
      alignItems: 'center',
  },
  title: {
      // fontSize: wp('10%'),
      // color: 'red',
  },
  formArea: {
      width: '100%',
      // paddingBottom: wp('10%'),
  },
  textForm: {
      borderWidth: 0.5,
      borderColor: '#888',
      width: '100%',
      // height: hp('5%'),
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
  },
  buttonArea: {
      width: '100%',
      // height: hp('5%'),
  },
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
})

export default MyInfo;
