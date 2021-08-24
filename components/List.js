import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);
  const url = baseUrl + 'media';

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(baseUrl + 'media');
        const mediaIlmanThumbnailia = await response.json();
        const kaikkitiedot = mediaIlmanThumbnailia.map(async (media) => {
          const response = await fetch(baseUrl + 'media/' + media.file_id);
          const tiedosto = await response.json();
          return tiedosto;
        });
        setMediaArray(await Promise.all(kaikkitiedot));
      } catch (e) {
        console.log(e.message());
      }
    };
    loadMedia();
  }, []);

  console.log('List: mediaArray', mediaArray);
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
