import React from 'react';
import * as Animatable from 'react-native-animatable';
import BgImg from '../fragments/bg-image.component';
import {StyleSheet, Dimensions} from 'react-native';
import chaserService from '../services/chaser';
import {chasers} from '../constants/constants';

const scnappsImages = [require('../assets/Karina_Schnapps-1.png'), require('../assets/Karina_Schnapps-2.png')];
const arakImages = [require('../assets/Karina_ARAK-1.png'), require('../assets/Karina_ARAK-2.png')];
const animations = ['tada', 'bounceIn'];

export default ({chaser}) => {
  if (!chaser) {
    return null;
  }

  chaserService.play(chaser === chasers.schnapps ? 'chaser1' : 'chaser2');
  const animation = animations[Math.floor(Math.random() * animations.length)];
  const imgArr = chaser === chasers.schnapps ? scnappsImages : arakImages;
  const image = imgArr[Math.floor(Math.random() * imgArr.length)];

  return (
    <Animatable.View animation={animation} style={s.container}>
      <BgImg img={image}/>
    </Animatable.View>
  );
};

const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width
  },
});