import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Card,
  Text,
} from 'react-native';
import List from '../components/List';
import {useTheme} from '../contexts/ThemeProvider';

const Home = ({navigation}) => {
  const {theme} = useTheme();
  return (
    <SafeAreaView
      style={[styles.droidSafeArea, {backgroundColor: theme.backgroundColor}]}
    >
      <StatusBar style="auto" />
      <View style={[{backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.text, {color: theme.textColor},]}>
          Custon bottom tab navigation!
        </Text>

        <List navigation={navigation}/>
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
