import api from './chaser.api';
const Sound = require('react-native-sound');


class Chaser {

  constructor() {
    this.init();
  }

  play(soundName) {
    api.broadcastChaser(true);
    return new Promise((res, rej) => {
      this[soundName].play(success => {
        if (success) {
          res();
        } else {
          rej();
        }
      });
    });
  }

  stop(soundName) {
    this[soundName].stop();
    api.broadcastChaser(false);
  }

  init() {
    this.loadSound('chaser1', 'chaser1.mp3');
    this.loadSound('chaser2', 'chaser2.mp3');
    this.loadSound('chaser3', 'chaser3.mp3');
  }

  loadSound(key, filename) {
    this[key] = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this[key].getDuration() +
          'number of channels: ' + this[key].getNumberOfChannels());
      }
    });
  }
}

export default new Chaser();
