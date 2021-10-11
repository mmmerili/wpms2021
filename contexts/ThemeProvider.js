import React, {createContext, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {View, Stylesheet} from 'react-native';
import {defaultTheme} from '../utils/theme';
import {useState} from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({
  container: {},
});

export default ThemeProvider;
