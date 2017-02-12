import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BgImg from '../fragments/bg-image.component';
import ChaserScreen from './chaser.screen';
import SplashScreen from './splash.screen';
import {chasers} from '../constants/constants';

const homeBg = require('../assets/Home.png');

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {mode: 'splash'};
    this._turnOffSplash();
  }

  _turnOffSplash() {
    setTimeout(() => {
      this.setState({mode: 'app'});
    }, 4500);
  }

  onPeachSchnappsTap() {
    this._onChaserTap(chasers.schnapps);
  }

  onArakTap() {
    this._onChaserTap(chasers.arak);
  }

  _onChaserTap(chaser) {
    this.setState({chaser});
  }

  onChaserClose() {
    this.setState({chaser: null});
  }

  renderClickableAreas() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onPeachSchnappsTap.bind(this)}>
          <View style={s.schnappsArea}/>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onArakTap.bind(this)}>
          <View style={s.arakArea}/>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  render() {
    const {chaser, mode} = this.state;
    if (mode === 'splash') {
      return (
        <SplashScreen/>
      );
    }
    return (
      <Animatable.View animation={'fadeIn'} style={s.container}>
        <BgImg img={homeBg}/>
        {chaser ?
          <ChaserScreen chaser={this.state.chaser} onClose={this.onChaserClose.bind(this)}/>
          :
          this.renderClickableAreas()
        }
      </Animatable.View>
    );
  }
}

const {height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  schnappsArea: {
    height: height / 2,
  },
  arakArea: {
    height: height / 2,
  }
});
