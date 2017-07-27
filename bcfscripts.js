
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDn9H15dCT237yYjpnOxtdqQUNEBxms3sQ",
    authDomain: "bcfind-52146.firebaseapp.com",
    databaseURL: "https://bcfind-52146.firebaseio.com",
    projectId: "bcfind-52146",
    storageBucket: "bcfind-52146.appspot.com",
    messagingSenderId: "895323885188"
  };
  firebase.initializeApp(config);
   var myFirebaseRef = firebase.database().ref();

function submitForm()
{

  var steamurl = document.getElementById("steamurlform").value;
  var dotabuff = document.getElementById("dotabuffform").value;


//region
  if (document.getElementById('North America').checked) {
   var region = document.getElementById('North America').value;
  }
 else if (document.getElementById('Europe').checked) {
   var region = document.getElementById('Europe').value;
  }
  else{
    region = '';
  }

//tier
  if (document.getElementById('Tier 3').checked) {
   var tier = document.getElementById('Tier 3').value;
  }
 else if (document.getElementById('Tier 4').checked) {
   var tier = document.getElementById('Tier 4').value;
  }
  else  if (document.getElementById('Tier 5').checked) {
   var tier = document.getElementById('Tier 5').value;
  }
  else  if (document.getElementById('Tier 6').checked) {
   var tier = document.getElementById('Tier 6').value;
  }
  else  if (document.getElementById('Tier 7').checked) {
   var tier = document.getElementById('Tier 7').value;
  }
  else if (document.getElementById('Tier 8').checked) {
   var tier = document.getElementById('Tier 8').value;
  }
  else tier = '';

  //position
    if (document.getElementById('position1').checked) {
     var pos = document.getElementById('position1').value;
    }
   else if (document.getElementById('position2').checked) {
     var pos = document.getElementById('position2').value;
    }
    else  if (document.getElementById('position3').checked) {
     var pos = document.getElementById('position3').value;
    }
    else  if (document.getElementById('position4').checked) {
     var pos = document.getElementById('position4').value;
    }
     else if (document.getElementById('position5').checked) {
     var pos = document.getElementById('position5').value;
    }
    else pos = '';

var check = '';
//otherpositions
if (document.getElementById('position1check').checked) {
  check += ' ' + document.getElementById('position1check').value.toString();
}
if (document.getElementById('position2check').checked) {
  check += ' ' + document.getElementById('position2check').value.toString();
}
if (document.getElementById('position3check').checked) {
 check += ' ' + document.getElementById('position3check').value.toString();
}
if (document.getElementById('position4check').checked) {
 check += ' ' + document.getElementById('position4check').value.toString();
}
if (document.getElementById('position5check').checked) {
 check += ' ' + document.getElementById('position5check').value.toString();
}

//number of players

var count = document.getElementById('playercount').value;


 //preferred comms
 if (document.getElementById('discord').checked) {
 var voice = document.getElementById('discord').value;
}
 else if (document.getElementById('dota').checked) {
 var voice = document.getElementById('dota').value;
}
else voice = '';

//misc
var misc = document.getElementById('misbox').value;

var other1 = document.getElementById('playeradd1').value;
var other2 = document.getElementById('playeradd2').value;
var other3 = document.getElementById('playeradd3').value;

  myFirebaseRef.push({SteamURL: steamurl,Region: region, Tier: tier, Dotabuff: dotabuff, Role: pos,
  Also: check, Others: count, Comms: voice, Misc: misc, Other1: other1, Other2: other2, Other3: other3});
  //event.preventDefault();

}



//reset function
function resetFunction(){
document.getElementById("playerinputform").reset();
}


function zeroSelect(){
  document.getElementById("groupedaddon1").style.display = "none"
  document.getElementById("groupedaddon2").style.display = "none"
  document.getElementById("groupedaddon3").style.display = "none"
}

function oneSelect(){
  document.getElementById("groupedaddon1").style.display = "inline-block"
  document.getElementById("groupedaddon2").style.display = "none"
  document.getElementById("groupedaddon3").style.display = "none"
}
function twoSelect(){
  document.getElementById("groupedaddon1").style.display = "inline-block"
  document.getElementById("groupedaddon2").style.display = "inline-block"
  document.getElementById("groupedaddon3").style.display = "none"
}
function threeSelect(){
  document.getElementById("groupedaddon1").style.display = "inline-block"
  document.getElementById("groupedaddon2").style.display = "inline-block"
  document.getElementById("groupedaddon3").style.display = "inline-block"
}

  function printData()
  {

      database = firebase.database();
      var ref = database.ref();

      ref.on("value", gotData, errData);

      function errData(error) {
          console.log("Something went wrong.");
          console.log(error);
      }

// The data comes back as an object
      function gotData(data) {

          var div = document.getElementById('playerlist');
          while(div.firstChild){
              div.removeChild(div.firstChild);
          }

          var players = data.val();
          // Grab all the keys to iterate over the object
          var keys = Object.keys(players);

          // Loop through array
          var entry = document.createElement('li');
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var player = players[key];
              var test = player.Role;

              //var table = document.getElementById('playerlist');
              var table = document.getElementById('playerlist');
              entry.appendChild(document.createTextNode(player.Region + " " + player.Tier + " " + player.SteamURL + " " + player.Dotabuff + " " + player.Role
                  + "  " + player.Also + "   " + player.Others + " " + player.Other1 + " " +  player.Other2 + "  " +
                  player.Other3 + " " + player.Comms + " " + player.Misc));
              var br = document.createElement("br");
              entry.appendChild(br);
             table.appendChild(entry);


          }
      }
  }