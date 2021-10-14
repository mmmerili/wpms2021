import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator, Button, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {DateTime} from 'luxon';
import {Card, ListItem, Text} from 'react-native-elements';
import {Video, Audio} from 'expo-av';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../contexts/ThemeProvider';
import {TouchableOpacity, Alert} from 'react-native';

const Single = ({route}) => {
  const {theme} = useTheme();
  const {params} = route;
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState(0);
  const [iAmLikingIt, setIAmLikingIt] = useState(false);
  const videoRef = useRef(null);

  const onPressHandler = (event) => setLikes(likes + 1);

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
    <View style={{backgroundColor: theme.backgroundColor, flex: 1}}>
      <Card>
        <Card.Title style={{fontFamily: 'Baskerville-SemiBold'}} h4>
          {params.title}
        </Card.Title>
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
        <View style={{alignItems: 'center'}}>
          <Text
            style={
              ([styles.description],
              {fontFamily: 'Baskerville-SemiBold', fontSize: 20})
            }
          >
            {params.description}
          </Text>
          <ListItem>
            <Text style={{fontFamily: 'Baskerville-SemiBold', fontSize: 20}}>
              {ownerInfo.username}'s post
            </Text>
          </ListItem>
        </View>
        <ListItem style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.selectMediaButton]}
            raised
            title="like"
            onPress={onPressHandler}
          >
            <Text style={styles.selectMediaText}>Like</Text>
          </TouchableOpacity>
          <Text>{likes}</Text>
        </ListItem>
      </Card>
    </View>
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
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontFamily: 'Baskerville-SemiBold',
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
