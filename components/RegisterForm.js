import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {Button, Input} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';
import {color} from 'react-native-elements/dist/helpers';

const RegisterForm = ({navigation}) => {
  const {inputs, errors, handleInputChange, handleOnEndEditing, checkUsername} =
    useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    try {
      delete inputs.confirmPassword;
      const registerInfo = await register(inputs);
      if (registerInfo) {
        Alert.alert(registerInfo.message);
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        style={{color: 'white'}}
        placeholder="username"
        placeholderTextColor="white"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          console.log('onEndEditing value', event.nativeEvent.text);
          checkUsername(event.nativeEvent.text);
          handleOnEndEditing('username', event.nativeEvent.text);
        }}
        errorMessage={errors.username}
      />
      <Input
        autoCapitalize="none"
        placeholderTextColor="white"
        style={{color: 'white'}}
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('password', event.nativeEvent.text);
        }}
        errorMessage={errors.password}
      />
      <Input
        autoCapitalize="none"
        placeholderTextColor="white"
        style={{color: 'white'}}
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('confirmPassword', event.nativeEvent.text);
        }}
        errorMessage={errors.confirmPassword}
      />
      <Input
        autoCapitalize="none"
        placeholder="email"
        placeholderTextColor="white"
        style={{color: 'white'}}
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('email', event.nativeEvent.text);
        }}
        errorMessage={errors.email}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        placeholderTextColor="white"
        style={{color: 'white'}}
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('full_name', event.nativeEvent.text);
        }}
        errorMessage={errors.full_name}
      />
      <TouchableOpacity
        style={styles.selectMediaButton}
        raised
        title="Register!"
        onPress={doRegister}
        disabled={errors.username || errors.password || errors.email}
      >
        <Text style={styles.selectMediaText}>Register</Text>
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

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
