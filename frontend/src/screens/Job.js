import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

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

const Job = () => {

  const [contents, setContents] = useState({
    '1': { id: '1', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '2': { id: '2', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '3': { id: '3', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '4': { id: '4', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '5': { id: '5', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
    '6': { id: '6', title: 'Project Manager', writer: 'Netmarble US', image: 'https://picsum.photos/id/237/200/300' },
  });

  return (
    <List>
      <Container>
        {Object.values(contents)
          .map(item => (
            <View style={styles.content} key={item.id}>
              <TouchableOpacity>
                <View style={styles.titlePart}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.writer}>{item.writer}</Text>
                </View>
                <Image 
                    style={styles.image}
                    source={{uri: item.image}}
                    resizeMode='contain'/>
              </TouchableOpacity>
            </View>
        ))}
        
        
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
    marginTop: 10,
  },
  titlePart: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  type: {
    color: 'red',
  },
  title: {

  },
  writer: {
    textAlign: 'right',
  },
  image: {
    // maxWidth: 100,
    // maxHeight: 100,
    width: '100%',
    height: 150, 
    // overflow: 'hidden',
  },
});

export default Job;
