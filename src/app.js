import React from 'react';
import {View, StyleSheet} from 'react-native';
import Home from './screens/home.screen';
import Splash from './screens/splash.screen';

export default () => {

  return (
    <Home/>
  );
}

const s = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});
