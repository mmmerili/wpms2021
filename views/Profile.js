import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, ListItem} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '../contexts/ThemeProvider';

const Profile = ({navigation}) => {
  const {theme} = useTheme();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState(
    'https://smilestories.co/wp-content/uploads/Anabel-Selfie-400x400.jpg'
  );

  const {getFilesByTag} = useTag();

  useEffect(() => {
    (async () => {
      const file = await getFilesByTag('avatar_' + user.user_id);
      console.log('file', file);
      setAvatar(uploadsUrl + file.pop().filename);
    })();
  }, [user]);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <ScrollView style={{backgroundColor: theme.backgroundColor}}>
      <Card>
        <Card.Title>
          <Text h1>{user.username}'s profile</Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{name: 'email', color: '#876f46', size: '0px'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{
              name: 'user',
              type: 'font-awesome',
              color: '#876f46',
              size: '30px',
            }}
          />
          <Text>{user.full_name}</Text>
        </ListItem>
        <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('My Files');
          }}
        >
          <Avatar icon={{name: 'logout', color: '#876f46', size: '30px'}} />
          <ListItem.Content>
            <ListItem.Title>My Files</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={logout}>
          <Avatar icon={{name: 'logout', color: '#876f46', size: '30px'}} />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: undefined, aspectRatio: 1, borderRadius: 100},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
