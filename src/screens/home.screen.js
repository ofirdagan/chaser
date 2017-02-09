import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Dimensions} from 'react-native';
import BgImg from '../fragments/bg-image.component';
import ChaserScreen from './chaser.screen';
import {chasers} from '../constants/constants';
const homeBg = require('../assets/Home.png');

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPeachSchnappsTap() {
    this.setState({chaser: chasers.schnapps});
  }

  onArakTap() {
    this.setState({chaser: chasers.arak});
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
    return (
      <View style={s.container}>
        <BgImg img={homeBg}/>
        {this.state.chaser ?
          <ChaserScreen chaser={this.state.chaser}/>
          :
          this.renderClickableAreas()
        }
      </View>
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
