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

const ListItem = ({singleMedia, navigation, showButtons}) => {
  const {update, setUpdate} = useContext(MainContext);
  const {theme} = useTheme();
  // console.log('singleMedia', singleMedia);
  const {deleteMedia} = useMedia();
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.listitembackground}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Single', singleMedia);
          }}
        >
          <RNEListItem
            bottomDivider
            containerStyle={{backgroundColor: 'rgba(38, 23, 169, 0.7)'}}
            // onPress={() => {
            // navigation.navigate('Single', singleMedia);
            // }}
          >
            <Avatar
              size="xlarge"
              square
              source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
            ></Avatar>
            <RNEListItem.Content>
              <RNEListItem.Title style={styles.title} h4>
                {singleMedia.title}
              </RNEListItem.Title>
              <RNEListItem.Subtitle>
                {singleMedia.description}
              </RNEListItem.Subtitle>
              <Rating
                backgroundColor="rgba(76, 20, 9, 0.27)"
                type="custom"
                ratingColor="purple"
                ratingCount={3}
                imageSize={40}
                showRating
                // onFinishRating={this.ratingCompleted}
                fractions="{1}"
                startingValue="{1}"
                tintColor="rgba(104, 93, 208, 0.59)"
                color="white"
              />
              {showButtons && (
                <>
                  <Button
                    title="Modify"
                    onPress={() => {
                      navigation.navigate('Modify', {singleMedia, navigation});
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
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  listitembackground: {
    backgroundColor: 'rgba(104, 93, 208, 0.59)',
  },
  title: {
    fontSize: 100,
    color: 'white',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
