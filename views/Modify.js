import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Alert} from 'react-native';
import UploadForm from '../components/UploadForm';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useTheme} from '../contexts/ThemeProvider';
import {StyleSheet} from 'react-native';

const Modify = ({route}) => {
  const {theme} = useTheme();
  const navigation = route.params.navigation;
  // const [image, setImage] = useState(require('../assets/icon.png'));
  const {inputs, handleInputChange, setInputs} = useUploadForm();
  const {modifyMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  useEffect(() => {
    (() => {
      setInputs({
        title: route.params.singleMedia.title,
        description: route.params.singleMedia.description,
      });
    })();
  }, []);

  const doModify = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await modifyMedia(
        inputs,
        userToken,
        route.params.singleMedia.file_id
      );
      if (result.message) {
        Alert.alert(
          'Modify',
          result.message,
          [
            {
              text: 'Ok',
              onPress: () => {
                setUpdate(update + 1);
                navigation.navigate('My Files');
              },
            },
          ],
          {cancelable: false}
        );
      }
    } catch (e) {
      console.log('doModify error', e.message);
    }
  };

  return (
    <View style={[StyleSheet.container, {backgroundColor: '#b496d4', flex: 1}]}>
      <UploadForm
        style={{color: 'white'}}
        title="Upload"
        handleSubmit={doModify}
        handleInputChange={handleInputChange}
        loading={loading}
        inputs={inputs}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
};

Modify.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Modify;
