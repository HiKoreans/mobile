import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width : SCREEN_WIDTH } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const List = styled.ScrollView`
  flex: 1;
`;

const Community = () => {
  return (
    <List>
      <Container>
      {/* <Container>
        <Text>동네생활</Text>
      </Container> */}
        <View style={styles.content}>
          <TouchableOpacity>
            <View style={styles.titlePart}>
              <Text style={styles.type}>(공지) </Text>
              <Text style={styles.title}>제목</Text>
            </View>
            <Text style={styles.writer}>관리자</Text>
          </TouchableOpacity>
        </View>
        
      </Container>
    </List>
  );
};

const styles = StyleSheet.create({
  content: {
    // flex: 1,
    backgroundColor: 'white',
    borderRadius : 10,
    borderWidth : 1,
    borderColor : 'skyblue',
    padding: 10,
    width: SCREEN_WIDTH/10*9,
    margin: 3,
  },
  titlePart: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  type: {
    color: 'red',
  },
  title: {

  },
  writer: {
    textAlign: 'right',
  },
});

export default Community;
