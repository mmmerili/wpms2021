import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';
import {useTheme} from '../contexts/ThemeProvider';
import {View} from 'react-native';

const MyFiles = ({navigation}) => {
  const {theme} = useTheme();
  const {mediaArray} = useMedia(true);
  // console.log('MyFiles: mediaArray', mediaArray);
  return (
    <View style={{backgroundColor: theme.backgroundColor}}>
      <FlatList
        data={mediaArray.reverse()}
        renderItem={({item}) => (
          <ListItem
            singleMedia={item}
            navigation={navigation}
            showButtons={true}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyFiles;
