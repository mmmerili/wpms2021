import React from 'react';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';
import ThemeProvider from './contexts/ThemeProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainProvider>
          <Navigator />
        </MainProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
