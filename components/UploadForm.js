import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

const UploadForm = ({
  title,
  handleSubmit,
  handleInputChange,
  loading,
  inputs,
}) => {
  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
        value={inputs.title}
      />
      <Input
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
        value={inputs.description}
      />
      <TouchableOpacity
        style={styles.selectMediaButton}
        underlayColor="#fff"
        onPress={handleSubmit}
        loading={loading}
      >
        <Text style={styles.selectMediaText}>Upload</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
};

export default UploadForm;
