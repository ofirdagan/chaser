import React from 'react';
import BgImg from '../fragments/bg-image.component';
const splashBg = require('../assets/splash-bg.png');
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

export default () => {
  return (
    <View style={s.container}>
      <BgImg img={splashBg}/>
      <Video
        repeat
        resizeMode='cover'
        source={require('../assets/fill.mov')}
        style={s.backgroundVideo}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundVideo: {
    width: 110,
    height: 115
  },
});