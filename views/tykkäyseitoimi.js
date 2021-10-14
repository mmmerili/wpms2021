merru
#5862

merru — 04/14/2021
mietin samaa
mut eiköhä jotenki
Miro — 04/14/2021
niii
teen tätä viikko kolmen virtual servuu XD
merru — 04/14/2021
siiis en saanu sitäkää toimii
Miro — 04/14/2021
Rippistä
merru — 04/14/2021
must tuntuu et i fucked up something real bad xdd
no tämä
Miro — 04/14/2021
ei siin onneks mitää pahaa voi tapahtuu
Open the firewall to allow web traffic through http (port 80) and https (port 443):

$ sudo firewall-cmd --permanent --zone=public --add-service=http --add-service=https
Tos on tollanen kohta
mihis toi port 80 ja port 443 menee
merru — 04/14/2021
no huh
ööö hyvä kysymys
Miro — 04/14/2021
helvetin hyvät ohjeet XD
merru — 04/14/2021
jep xd
Miro — 04/14/2021
Image
Miten täältä pääs pois XD
merru — 04/16/2021
oho kiva ignore xdd rip
saiks
Miro — 04/16/2021
XD
Miro — 04/28/2021
https://lucid.app/lucidchart/2564e850-dbbf-4c80-b6a1-41fae8f21f31/edit?page=0_0#
https://lucid.app/lucidchart/invitations/accept/inv_7392b992-4343-4f16-8f9a-e8cd16f0ee71?viewport_loc=-390%2C-20%2C3006%2C1449%2C0_0
Miro — 05/07/2021
http://10.114.34.9/
voit avaa ton linkin vaa
merru — 08/24/2021
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMediaArray(json);
      } catch (e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);
  console.log('List rivi 16', mediaArray);

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
Miro — 08/24/2021
import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const ListItem = ({singleMedia}) => {
  console.log(singleMedia);
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{
            uri:
              'http://media.mw.metropolia.fi/wbma/uploads/' +
              singleMedia.filename,
          }}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#eee',
    borderRadius: 6,
    flex: 1,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 6,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
Miro — 09/08/2021
yoyoyoyoy
merru — 09/08/2021
täMä
Miro — 09/08/2021
miten toi kolmonen tehää
lähteeks sul ääntä
merru — 09/08/2021
om
g
nii lähtee saatana
Miro — 09/08/2021
pirautan sulle
You missed a call from
Miro
 that lasted a few seconds.
 — 09/08/2021
merru — 09/08/2021
wait
Miro — 09/08/2021
ji
joko XD
merru — 09/08/2021
struggling
Miro — 09/08/2021
onks noissa kuvissa
toi vaalein nii ykkönen
mitä veikkaat
merru — 09/08/2021
jooo
mietin kanss
Miro — Today at 11:27 AM
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator, Button} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
// import {DateTime} from 'luxon';
import {Card, ListItem, Text} from 'react-native-elements';
import {Video, Audio} from 'expo-av';
import {useUser, useFavourites} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {params} = route;
  const [updateLikes, setUpdateLikes] = useState(0);
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState([]);
  const [iAmLikingIt, setIAmLikingIt] = useState(true);
  const videoRef = useRef(null);
  const {addFavourite, getFavouritesByFileId} = useFavourites();

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(params.user_id, token));
  };
  const getLikes = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const result = await getFavouritesByFileId(params.file_id, token);
    // console.log('getlikes', result.length); // näyttää tykkäykset
    setLikes(result.length);
    // console.log('userID', result[0].user_id, ownerInfo.user_id); // Näkyykö buttoni// TODO: use api hooks to get favourites
    // setLikes()
    // set the value of iAmLikingIt
  };
  const likeThis = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const result = await addFavourite(params.file_id, token);
    console.log('result', result);
    setUpdateLikes(updateLikes + 1);
  };
  useEffect(() => {
    getOwnerInfo();
  }, []);
  useEffect(() => {
    getLikes();
  }, [updateLikes]);
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
            title="Tykkää"
            onPress={() => {
              setUpdateLikes(likeThis + 1);
            }}
          />
        ) : (
          <Button
            title="Unlike"
... (28 lines left)
Collapse
tykkays_ei_toimi.js
4 KB
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {doFetch} from '../utils/http';
import {appID, baseUrl} from '../utils/variables';

const useMedia = (ownFiles) => {
Expand
Apihook_tykkayksille.js
7 KB
Miro — Today at 12:07 PM
const useFavourites = () => {
  const addFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token, 'Content-type': 'application/json'},
      body: JSON.stringify({
        file_id: fileId,
      }),
    };
pistä toi siihe api hooksiin ku sielt löytyy se use Favourites kohta
﻿
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ActivityIndicator, Button} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
// import {DateTime} from 'luxon';
import {Card, ListItem, Text} from 'react-native-elements';
import {Video, Audio} from 'expo-av';
import {useUser, useFavourites} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {params} = route;
  const [updateLikes, setUpdateLikes] = useState(0);
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState([]);
  const [iAmLikingIt, setIAmLikingIt] = useState(true);
  const videoRef = useRef(null);
  const {addFavourite, getFavouritesByFileId} = useFavourites();

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(params.user_id, token));
  };
  const getLikes = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const result = await getFavouritesByFileId(params.file_id, token);
    // console.log('getlikes', result.length); // näyttää tykkäykset
    setLikes(result.length);
    // console.log('userID', result[0].user_id, ownerInfo.user_id); // Näkyykö buttoni// TODO: use api hooks to get favourites
    // setLikes()
    // set the value of iAmLikingIt
  };
  const likeThis = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const result = await addFavourite(params.file_id, token);
    console.log('result', result);
    setUpdateLikes(updateLikes + 1);
  };
  useEffect(() => {
    getOwnerInfo();
  }, []);
  useEffect(() => {
    getLikes();
  }, [updateLikes]);
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
            title="Tykkää"
            onPress={() => {
              setUpdateLikes(likeThis + 1);
            }}
          />
        ) : (
          <Button
            title="Unlike"
            onPress={() => {
              setIAmLikingIt(likeThis - 1);
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
