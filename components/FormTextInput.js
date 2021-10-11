import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';

const FormTextInput = ({style, ...otherProps}) => {
  return (
    <TextInput
      style={[styles.textInput, style, styles.textInputStyle]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    color: 'green',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
