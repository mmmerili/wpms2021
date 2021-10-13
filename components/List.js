import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import Search from '../views/Search';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  // console.log('List: mediaArray', mediaArray);
  return (
    <FlatList
      data={mediaArray.reverse()}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          showButtons={false}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default List;
