function resetFunction(){
document.getElementById("playerinputform").reset();
}

$(function () {
const config = {
    apiKey: "AIzaSyDn9H15dCT237yYjpnOxtdqQUNEBxms3sQ",
    authDomain: "bcfind-52146.firebaseapp.com",
    databaseURL: "https://bcfind-52146.firebaseio.com",
    projectId: "bcfind-52146",
    storageBucket: "bcfind-52146.appspot.com",
    messagingSenderId: "895323885188"
  };
  firebase.initializeApp(config);
  $('-js-form').on('submit',event => {
      event.preventDefault();
      const region = $('#region').val();
      const tier = $('#tier').val();
      const position $('#position').val();
      const voice $('#dota').val();
      console.log(region,tier,position,voice);
}
