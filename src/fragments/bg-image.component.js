import React from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';

export default ({img}) => {
  return (
    <View style={s.bgImageWrapper}>
      <Image source={img} style={s.bgImage} />
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
    flex: 1,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover'
  }
});
