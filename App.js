import React from 'react';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import ThemeProvider from './contexts/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <MainProvider>
        <Navigator />
      </MainProvider>
    </ThemeProvider>
  );
};

export default App;
