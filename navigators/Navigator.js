/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {useContext} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';
import {Icon} from 'react-native-elements';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
// import {Text} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      size="xlarge"
      barStyle={{backgroundColor: 'rgb(104, 93, 208)'}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          let iconName = '';
          switch (route.name) {
            case 'Posts':
              iconName = 'liquor';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Upload':
              iconName = 'file-upload';
              break;
          }
          return (
            <Icon
              focused={focused}
              tintColor={{tintColor}}
              name={iconName}
              size={35}
              color={'rgba(68, 43, 195, 0.9)'}
              reverse={false}
              raised={true}
              style={{color: 'red'}}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Posts" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Front"
            component={TabScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="My Files" component={MyFiles} />
          <Stack.Screen name="Modify" component={Modify} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
