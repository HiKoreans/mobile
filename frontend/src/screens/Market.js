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

const Market = () => {
  return (
    <Container>
      <StyledText>벼룩시장</StyledText>
    </Container>
  );
};

export default Market;
