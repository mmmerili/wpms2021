import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as RNEListItem} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import ThemeProvider, {useTheme} from '../contexts/ThemeProvider';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {Rating} from 'react-native-ratings';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {Image} from 'react-native';
import {ImageBackground} from 'react-native';

const ListItem = ({singleMedia, navigation, showButtons}) => {
  const {update, setUpdate} = useContext(MainContext);
  const {theme} = useTheme();
  // console.log('singleMedia', singleMedia);
  const {deleteMedia} = useMedia();
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.listitembackground}>
        <ImageBackground
          resizeMode="cover"
          style={styles.image}
          source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Single', singleMedia);
            }}
          >
            <RNEListItem
              bottomDivider
              containerStyle={{backgroundColor: 'rgba(46, 60, 171, 0.2)'}} // onPress={() => {
              // navigation.navigate('Single', singleMedia);
              // }}
            >
              <RNEListItem.Content>
                <View style={styles.listitem}>
                  <View
                    style={{
                      backgroundColor: '#7666bd',
                      flex: 0.75,
                      padding: 20,
                      borderRadius: 15,
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <RNEListItem.Title
                      style={{fontSize: 60, fontWeight: 'bold', color: 'white'}}
                      h4
                    >
                      {singleMedia.title}
                    </RNEListItem.Title>
                    <RNEListItem.Subtitle style={{color: 'white'}}>
                      {singleMedia.description}
                    </RNEListItem.Subtitle>
                  </View>
                </View>
                {showButtons && (
                  <>
                    <Button
                      title="Modify"
                      onPress={() => {
                        navigation.navigate('Modify', {
                          singleMedia,
                          navigation,
                        });
                      }}
                    />
                    <Button
                      title="Delete"
                      onPress={async () => {
                        try {
                          const token = await AsyncStorage.getItem('userToken');
                          const response = await deleteMedia(
                            singleMedia.file_id,
                            token
                          );
                          console.log('Delete', response);
                          if (response.message) {
                            setUpdate(update + 1);
                          }
                        } catch (e) {
                          console.log('ListItem, delete: ', e.message);
                        }
                      }}
                    />
                  </>
                )}
              </RNEListItem.Content>
              <RNEListItem.Chevron />
            </RNEListItem>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  listitembackground: {
    backgroundColor: 'rgba(104, 93, 208, 0.0)',
    flexDirection: 'column',
  },
  title: {
    fontSize: 100,
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  listitem: {
    padding: 0,
    flexDirection: 'row',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
