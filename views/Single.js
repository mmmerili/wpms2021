import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator, Button} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {DateTime} from 'luxon';
import {Card, ListItem, Text} from 'react-native-elements';
import {Video, Audio} from 'expo-av';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {params} = route;
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState([]);
  const [iAmLikingIt, setIAmLikingIt] = useState(false);
  const videoRef = useRef(null);

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(params.user_id, token));
  };
  const getLikes = async () => {
    // TODO: use api hooks to get favourites
    // setLikes()
    // set the value of iAmLikingIt
  };

  useEffect(() => {
    getOwnerInfo();
    getLikes();
  }, []);

  return (
    <Card>
      <Card.Title h4>{params.title}</Card.Title>
      <Card.Title>
        {
          /* TODO: crashes in android with latest Expo GO -> fix
          {DateTime.fromISO(params.time_added)
          .setLocale('fi')
          .toLocaleString({month: 'long', day: 'numeric', year: 'numeric'})} */
          params.time_added
        }
      </Card.Title>
      <Card.Divider />
      {params.media_type === 'image' && (
        <Card.Image
          source={{uri: uploadsUrl + params.filename}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}
      {params.media_type === 'video' && (
        <Video
          ref={videoRef}
          style={styles.image}
          source={{uri: uploadsUrl + params.filename}}
          useNativeControls
          resizeMode="contain"
          usePoster
          posterSource={{uri: uploadsUrl + params.screenshot}}
        ></Video>
      )}
      {params.media_type === 'audio' && (
        <>
          <Text>Audio not supported YET.</Text>
          <Audio></Audio>
        </>
      )}
      <Card.Divider />
      <Text style={styles.description}>{params.description}</Text>
      <ListItem>
        <Text>{ownerInfo.username}</Text>
      </ListItem>
      <ListItem>
        {/* TODO: show like or dislike button depending on the current like status,
        calculate like count for a file */}
        {iAmLikingIt ? (
          <Button
            title="Like"
            onPress={() => {
              // use api hooks to POST a favourite
            }}
          />
        ) : (
          <Button
            title="Unlike"
            onPress={() => {
              // use api hooks to DELETE a favourite
            }}
          />
        )}
        <Text>Total likes: {likes.length}</Text>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
