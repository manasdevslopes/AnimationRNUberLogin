import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LoginScreen from './screens/LoginScreen.js';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
  },
  {
    defaultNavigationOptions: {
      header: null,
      // headerTintColor: '#fff',
      // headerStyle: {
      //   backgroundColor: '#b83227',
      // },
      // headerTitleStyle: {
      //   color: '#fff',
      // },
    },
  },
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({});
