import * as firebase from 'firebase';
class Api {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDZd2jaQb68UUs_rSd3ucI_M9_PkevGPkA",
      authDomain: "karina-chaser.firebaseapp.com",
      databaseURL: "https://karina-chaser.firebaseio.com",
      storageBucket: "karina-chaser.appspot.com",
      messagingSenderId: "534071823675"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error while login in to firebase ',errorMessage, errorCode, error);
    });
    this.dbRef = firebase.database().ref();
  }

  broadcastChaser(value) {
    this._setLiveChaser(value);
  }

  _setLiveChaser(value) {
    this.dbRef.child(`liveChaser`).set(value);
  }
}

export default new Api();