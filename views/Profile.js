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
import Search from './Search';

const Profile = ({navigation}) => {
  const {theme} = useTheme();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState(
    'https://cdn-icons-png.flaticon.com/512/3329/3329252.png'
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
      <Search
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      ></Search>
      <Card>
        <Card.Title>
          <Text
            style={{
              fontSize: 40,
              color: 'rgba(38, 36, 40, 0.94)',
              fontFamily: 'Baskerville-SemiBold',
            }}
            h1
          >
            {user.username}'s profile
          </Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar
            icon={{
              name: 'alternate-email',
              color: 'rgba(138, 62, 236, 0.94)',
              size: '30px',
            }}
          />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{
              name: 'user',
              type: 'font-awesome',
              color: 'rgba(138, 62, 236, 0.94)',
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
          <Avatar
            icon={{
              name: 'image-search',
              color: 'rgba(138, 62, 236, 0.94)',
              size: '40px',
            }}
          />
          <ListItem.Content>
            <ListItem.Title>My Posts</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem bottomDivider onPress={logout}>
          <Avatar
            icon={{
              name: 'logout',
              color: 'rgba(138, 62, 236, 0.94)',
              size: '40px',
            }}
          />
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
