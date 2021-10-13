import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import {TouchableOpacity} from 'react-native';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(inputs);
      console.log('doLogin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO: Save user info (loginInfo.user) to MainContext
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error);
    }
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.backgroundColor}>
      <Input
        autoCapitalize="none"
        placeholderTextColor="white"
        style={{color: 'white'}}
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholderTextColor="white"
        style={{color: 'white'}}
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.selectMediaButton}
        raised
        title="Login!"
        onPress={doLogin}
      >
        <Text style={styles.selectMediaText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectMediaButton: {
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#d19836',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#edcf9d',
  },
  selectMediaText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;
