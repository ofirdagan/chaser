import React from 'react';
import {View, StyleSheet} from 'react-native';
import chaser from './services/chaser';
import Home from './screens/home.screen';

export default () => {

  const onPlay = (soundName) => {
    chaser.play(soundName);
  };

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
