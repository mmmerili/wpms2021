import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import List from '../components/List';
import {useTheme} from '../contexts/ThemeProvider';
import Search from './Search';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

const Home = ({navigation}) => {
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={[styles.droidSafeArea, {backgroundColor: theme.backgroundColor}]}
    >
      <StatusBar style="auto" />
      <Search
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      ></Search>
      <Text
        style={{
          fontSize: 25,
          color: 'white',
          margin: 20,
          alignSelf: 'center',
          fontFamily: 'Baskerville-SemiBold',
        }}
      >
        Post here your favorite drinks and experiences!
      </Text>
      <View style={[{backgroundColor: theme.backgroundColor}]}>
        <List navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
