import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #E7EBF4;
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Community = () => {
  return (
    <Container>
      <StyledText>동네생활</StyledText>
    </Container>
  );
};

export default Community;
