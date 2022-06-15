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
    return (
        <Container>
            <Text>JobAdd.js</Text>
        </Container>
    );
};
const styles = StyleSheet.create({
});

export default JobAdd;