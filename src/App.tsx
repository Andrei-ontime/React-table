import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Products from './components';

const AppContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const App = () => {
  return (
    <AppContainer>
      <Products />
    </AppContainer>
  );
};

export default App;
