/* eslint-disable no-undef */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {ImageBackground} from 'react-native';
import {Card, ListItem, Text} from 'react-native-elements';
import {useTheme} from '../contexts/ThemeProvider';

const Login = ({navigation}) => {
  const {theme} = useTheme();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);
  // console.log('Login isLoggedIn', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('logIn asyncstorage token:', userToken);
    if (userToken) {
      try {
        const userInfo = await checkToken(userToken);
        if (userInfo.user_id) {
          setUser(userInfo);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.log('getToken', e.message);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}
    >
      <ImageBackground
        source={require('../assets/splash.jpg')}
        style={styles.image}
      >
        {registerFormToggle ? (
          <Card>
            <Card.Divider />
            <Card.Title h4>Register</Card.Title>
            <RegisterForm navigation={navigation} />
          </Card>
        ) : (
          <Card>
            <Card.Title h4>Login</Card.Title>
            <LoginForm navigation={navigation} />
          </Card>
        )}
        {/* TODO: add link/button & event handler to change state: setRegformtoggle(!regformtoggle);  */}
        <ListItem
          onPress={() => {
            setRegisterFormToggle(!registerFormToggle);
          }}
        >
          <ListItem.Content>
            <Text style={styles.text}>
              {registerFormToggle
                ? 'Already registered? Login here'
                : 'No account? Register here.'}
            </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  selectMediaButton: {
    marginRight: 25,
    marginLeft: 25,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
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
    fontSize: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
