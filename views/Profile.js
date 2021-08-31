import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  console.log('profile', isLoggedIn);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Log out!" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {};

export default Profile;
