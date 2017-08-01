
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


//submit for results
  function search(){

      document.getElementById('resultdisplay').style.display = 'none';
      document.getElementById('tableID').style.display='block';
      document.getElementById('searcher').style.display = 'none';
      document.getElementById('reseter').style.display = 'none';

           printData(gotData);

  }




//reset function
function resetFunction(){
document.getElementById("playerinputform").reset();
}

  function display_div(e){
    if(e == 0){
      document.getElementById('groupedaddon1').style.display = "none";
      document.getElementById('groupedaddon2').style.display = "none";
      document.getElementById('groupedaddon3').style.display = "none";
    }
      document.getElementById('groupedaddon' + e).style.display = "inline-block";


  }


  function printData(funcName) {

      database = firebase.database();
      var ref = database.ref();

      ref.on("value", funcName, errData);

      function errData(error) {
          console.log("Something went wrong.");
          console.log(error);
      }

  }
// The data comes back as an object - all data
      function gotData(data) {


          var div = document.getElementById('resultsTable');
          while(div.firstChild){
              div.removeChild(div.firstChild);
          }

          var players = data.val();
          // Grab all the keys to iterate over the object
          var keys = Object.keys(players);

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
              var position1 = document.getElementById('position1').value;
          }
          if (document.getElementById('position2').checked) {
              var position2 = document.getElementById('position2').value;
          }
           if (document.getElementById('position3').checked) {
              var position3 = document.getElementById('position3').value;
          }
           if (document.getElementById('position4').checked) {
              var position4 = document.getElementById('position4').value;
          }
           if (document.getElementById('position5').checked) {
              var position5 = document.getElementById('position5').value;
          }


          //Header for table
          var table = document.getElementById("resultsTable");
          var header = table.createTHead();
           var row2 = header.insertRow(0);
          var cell1 = row2.insertCell(0);
          cell1.appendChild(document.createTextNode("Steam URL:"));
          var cell2 = row2.insertCell(1);
          cell2.appendChild(document.createTextNode("Dotabuff URL:"));
          var cell3 = row2.insertCell(2);
          cell3.appendChild(document.createTextNode("Main Position:"));
          var cell4 = row2.insertCell(3);
          cell4.appendChild(document.createTextNode("Secondary Position(s):"));
          var cell5 = row2.insertCell(4);
          cell5.appendChild(document.createTextNode("Grouped with:"));
          var cell6 = row2.insertCell(5);
          var comText = "Communication preference:";
          cell6.innerHTML="Comms:";
          cell6.style.maxWidth= "40px";
          var cell7 = row2.insertCell(6);
          cell7.innerHTML="Miscellaneous <br> Information:";

          // Loop through array
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var player = players[key];

              if(player.Region === region && player.Tier === tier && (player.Role === position1 || player.Role === position2|| player.Role === position3 || player.Role === position4 || player.Role === position5)){
              // var list = document.getElementById('playerlist');
              // entry.appendChild(document.createTextNode(player.Region + " " + player.Tier + " " + player.SteamURL + " " + player.Dotabuff + " " + player.Role
              //     + "  " + player.Also + "   " + player.Others + " " + player.Other1 + " " + player.Other2 + "  " +
              //     player.Other3 + " " + player.Comms + " " + player.Misc));
              // var br = document.createElement("br");
              // entry.appendChild(br);
                  // list.appendChild(entry);

                //table that receives values
              var row = header.insertRow(1);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              var cell6 = row.insertCell(5);
              var cell7 = row.insertCell(6);
                    //link for steam url
                  var steamlink = document.createElement('a');
                  steamlink.textContent = 'Steam';
                  steamlink.href = player.SteamURL;
                  cell1.appendChild(steamlink);
                  //link for dotabuff url
                  var dotabufflink = document.createElement('a');
                  dotabufflink.textContent = 'DotaBuff';
                  dotabufflink.href = player.Dotabuff;
              cell2.appendChild(dotabufflink);
              if(player.Role === position1){cell3.appendChild(document.createTextNode("Carry"));}
                  if(player.Role === position2){cell3.appendChild(document.createTextNode("Mid"));}
                  if(player.Role === position3){cell3.appendChild(document.createTextNode("Offlane"));}
                  if(player.Role === position4){cell3.appendChild(document.createTextNode("Roamer / Support"));}
                  if(player.Role === position5){cell3.appendChild(document.createTextNode("Support"));}
              cell4.appendChild(document.createTextNode(player.Also));
              cell5.appendChild(document.createTextNode((player.Others + " other(s)")));
              if(player.Comms == "dotavoice") {
                  // cell4.appendChild(document.createElement("./img/dota_2_icon.png"));
                  cell6.innerHTML= "<img src='./img/dota_2_icon.png' height='42' width='42'/>";
              }
                 else if(player.Comms == "discordvoice") {
                      // cell4.appendChild(document.createElement("./img/dota_2_icon.png"));
                      cell6.innerHTML= "<img src='./img/Discord-Logo-Color.svg' height='42' width='42'/>";
                  }

                  cell7.appendChild(document.createTextNode((player.Misc)));

          }
          }

      }

  // The data comes back as an object - all data
  function gotAllData(data) {

      var div = document.getElementById('playerlist');
      while (div.firstChild) {
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


          var table = document.getElementById('playerlist');
          entry.appendChild(document.createTextNode(player.Region + " " + player.Tier + " " + player.SteamURL + " " + player.Dotabuff + " " + player.Role
              + "  " + player.Also + "   " + player.Others + " " + player.Other1 + " " + player.Other2 + "  " +
              player.Other3 + " " + player.Comms + " " + player.Misc));
          var br = document.createElement("br");
          entry.appendChild(br);
          table.appendChild(entry);


      }
  }