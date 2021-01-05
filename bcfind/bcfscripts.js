

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


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

   var myFirebaseRef = firebase.database().ref().child('Posts');
var pathArray = window.location.pathname.split( '/' );
 var profileURL =  window.location.pathname;
profileURL = profileURL.substring(0, profileURL.length-pathArray[pathArray.length-1].length);
profileURL += "profile.html";
 var loginURL =  window.location.pathname;
 loginURL = loginURL.substring(0, loginURL.length-pathArray[pathArray.length-1].length);
 loginURL += "login.html";
var findpartyURL=  window.location.pathname;
findpartyURL = loginURL.substring(0, findpartyURL.length-pathArray[pathArray.length-1].length);
findpartyURL += "findparty.html";
var loginredirectURL =  window.location.pathname;
loginredirectURL = loginURL.substring(0, loginredirectURL.length-pathArray[pathArray.length-1].length);
loginredirectURL += "loginredirect.html";
var indexURL =  window.location.pathname;
indexURL = loginURL.substring(0, indexURL.length-pathArray[pathArray.length-1].length);
indexURL += "index.html";

   //TODO: Change these paths when you migrate
//real-time login listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        document.getElementById('loginLink').setAttribute('href','profile.html');
        if(window.location.pathname === loginURL){
            window.location.assign("profile.html");
        }
        if(window.location.pathname === loginredirectURL){
          window.location.assign("findparty.html");
        }
    }
    else{
      if(window.location.pathname === indexURL){
        document.getElementById('findPartyLink').setAttribute('href','loginredirect.html');
      }
        if(window.location.pathname === profileURL){
            window.location.assign("login.html");
        }
        if(window.location.pathname === findpartyURL){
            window.location.assign("loginredirect.html");
        }
        console.log('not logged in');
    }
});

function logout(){
    firebase.auth().signOut();
}

function removePost(){

    var user = firebase.auth().currentUser;
    var uid;
    if(user != null){
        uid = user.uid;
    }

    var ref = firebase.database().ref().child('Posts');
    ref.on('child_added', function(snapshot) {
    // console.log(snapshot.key);
    // console.log(snapshot.child("UserID").val());
    var idCheck = (snapshot.child("UserID").val());
    if(idCheck === uid){
        ref.child(snapshot.key).remove();
    }
    });

   document.getElementById('message').innerHTML = "Post Removed";
   document.getElementById('profileUpdated').style.display = 'inline-block';
}

function submitForm()
{

//number of players
var count = document.getElementById('playercount').value;

//other player positions

    //add1 positions
    var othercheck1 = '';
    if (document.getElementById('add1capcheckbox').checked) {
        othercheck1 += ' ' + document.getElementById('add1capcheckbox').value.toString();
    }
    if (document.getElementById('add1position1check').checked) {
        othercheck1 += ' ' + document.getElementById('add1position1check').value.toString();
    }
    if (document.getElementById('add1position2check').checked) {
        othercheck1 += ' ' + document.getElementById('add1position2check').value.toString();
    }
    if (document.getElementById('add1position3check').checked) {
        othercheck1 += ' ' + document.getElementById('add1position3check').value.toString();
    }
    if (document.getElementById('add1position4check').checked) {
        othercheck1 += ' ' + document.getElementById('add1position4check').value.toString();
    }
    if (document.getElementById('add1position5check').checked) {
        othercheck1 += ' ' + document.getElementById('add1position5check').value.toString();
    }

    //add2 positions
    var othercheck2 = '';
    if (document.getElementById('add2capcheckbox').checked) {
        othercheck2 += ' ' + document.getElementById('add2capcheckbox').value.toString();
    }
    if (document.getElementById('add2position1check').checked) {
        othercheck2 += ' ' + document.getElementById('add2position1check').value.toString();
    }
    if (document.getElementById('add2position2check').checked) {
        othercheck2 += ' ' + document.getElementById('add2position2check').value.toString();
    }
    if (document.getElementById('add2position3check').checked) {
        othercheck2 += ' ' + document.getElementById('add2position3check').value.toString();
    }
    if (document.getElementById('add2position4check').checked) {
        othercheck2 += ' ' + document.getElementById('add2position4check').value.toString();
    }
    if (document.getElementById('add2position5check').checked) {
        othercheck2 += ' ' + document.getElementById('add2position5check').value.toString();
    }

    //add3 positions
    var othercheck3 = '';
    if (document.getElementById('add3capcheckbox').checked) {
        othercheck3 += ' ' + document.getElementById('add3capcheckbox').value.toString();
    }
    if (document.getElementById('add3position1check').checked) {
        othercheck3 += ' ' + document.getElementById('add3position1check').value.toString();
    }
    if (document.getElementById('add3position2check').checked) {
        othercheck3 += ' ' + document.getElementById('add3position2check').value.toString();
    }
    if (document.getElementById('add3position3check').checked) {
        othercheck3 += ' ' + document.getElementById('add3position3check').value.toString();
    }
    if (document.getElementById('add3position4check').checked) {
        othercheck3 += ' ' + document.getElementById('add3position4check').value.toString();
    }
    if (document.getElementById('add3position5check').checked) {
        othercheck3 += ' ' + document.getElementById('add3position5check').value.toString();
    }


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

var user = firebase.auth().currentUser;
var uid;
if(user != null){
    uid = user.uid;
}
    //limits users to have one post
    var ref = firebase.database().ref().child('Posts');
    //creates new post in database if logged in user doesn't have one
    //if they do have one it updates their information
    ref.orderByChild("UserID").equalTo(uid).once("value", snapshot => {
        const userData = snapshot.val();
        if (!userData) {



            //pulls data from current logged in user to push to posts database
            var ref = firebase.database().ref().child('Users');
            ref.on('child_added', function(snapshot) {
                // console.log(snapshot.key);
                 //console.log(snapshot.child("UserID").val());

                 var user = firebase.auth().currentUser;
                 var uid;
                 if(user != null){
                     uid = user.uid;
                 }

                var idCheck = (snapshot.child("UserID").val());

                if(idCheck === uid){


                    var region = (snapshot.val() && snapshot.val().Region);
                    var steamurl = "http://steamcommunity.com/id/" +(snapshot.val() && snapshot.val().SteamURL);
                    var tier = (snapshot.val() && snapshot.val().Tier);
                    var also = (snapshot.val() && snapshot.val().Also);
                    var role = (snapshot.val() && snapshot.val().Role);
                    var dotabuff = "https://www.dotabuff.com/players/" + (snapshot.val() && snapshot.val().Dotabuff);
                    nestedPush();

                    function nestedPush() {

                        myFirebaseRef.push({
                            Region: region,
                            SteamURL: steamurl,
                            Dotabuff: dotabuff,
                            Role: role,
                            Tier: tier,
                            Also: also,
                            Others: count,
                            Comms: voice,
                            Misc: misc,
                            Other1: othercheck1,
                            Other2: othercheck2,
                            Other3: othercheck3,
                            UserID: uid
                        });
                    }
                }
            });
        }
        if (userData) {

            //updates post if they already have one
            var user = firebase.auth().currentUser;
            var uid;
            if(user != null){
                uid = user.uid;
            }

            var ref = firebase.database().ref().child('Posts');
            ref.on('child_added', function(snapshot) {
                // console.log(snapshot.key);
                // console.log(snapshot.child("UserID").val());
                var idCheck = (snapshot.child("UserID").val());
                if(idCheck === uid){
                    var region = (snapshot.val() && snapshot.val().Region);
                    var steamurl = "http://steamcommunity.com/id/" +(snapshot.val() && snapshot.val().SteamURL);
                    var tier = (snapshot.val() && snapshot.val().Tier);
                    var also = (snapshot.val() && snapshot.val().Also);
                    var role = (snapshot.val() && snapshot.val().Role);
                    var dotabuff = "https://www.dotabuff.com/players/" + (snapshot.val() && snapshot.val().Dotabuff);
                    nestedPush();
                    function nestedPush() {
                        myFirebaseRef.child(snapshot.key).update({
                            Region: region,
                            SteamURL: steamurl,
                            Dotabuff: dotabuff,
                            Role: role,
                            Tier: tier,
                            Also: also,
                            Others: count,
                            Comms: voice,
                            Misc: misc,
                            Other1: othercheck1,
                            Other2: othercheck2,
                            Other3: othercheck3,
                            UserID: uid
                        });
                    }
                }
            });

            document.getElementById('submitmessage').innerHTML = "Post Updated";
        }
    });



   document.getElementById('groupPosted').style.display = 'block';

   // console.log(test.key);
}

//Update / save profile
function updateSave() {


    var myFirebaseUserRef = firebase.database().ref().child('Users');


    var steamurl = document.getElementById("steamurlform").value;
    var dotabuff = document.getElementById("dotabuffform").value;


//region
    if (document.getElementById('North America').checked) {
        var region = document.getElementById('North America').value;
    }
    else if (document.getElementById('Europe').checked) {
        var region = document.getElementById('Europe').value;
    }
    else {
        region = '';
    }

//tier
    if (document.getElementById('Tier 3').checked) {
        var tier = document.getElementById('Tier 3').value;
    }
    else if (document.getElementById('Tier 4').checked) {
        var tier = document.getElementById('Tier 4').value;
    }
    else if (document.getElementById('Tier 5').checked) {
        var tier = document.getElementById('Tier 5').value;
    }
    else if (document.getElementById('Tier 6').checked) {
        var tier = document.getElementById('Tier 6').value;
    }
    else if (document.getElementById('Tier 7').checked) {
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
    else if (document.getElementById('position3').checked) {
        var pos = document.getElementById('position3').value;
    }
    else if (document.getElementById('position4').checked) {
        var pos = document.getElementById('position4').value;
    }
    else if (document.getElementById('position5').checked) {
        var pos = document.getElementById('position5').value;
    }
    else pos = '';

    var check = '';
//otherpositions
    if (document.getElementById('capcheckbox').checked) {
        check += ' ' + document.getElementById('capcheckbox').value.toString();
    }
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

    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }

    var ref = firebase.database().ref().child('Users');
    var refPost = firebase.database().ref();
    //creates new user in database if logged in user doesn't have one
    //if they do have one it updates their information
    ref.orderByChild("UserID").equalTo(uid).once("value", snapshot => {
        const userData = snapshot.val();
        if (!userData) {
            myFirebaseUserRef.push({
                SteamURL: steamurl,
                Region: region,
                Tier: tier,
                Dotabuff: dotabuff,
                Role: pos,
                Also: check,
                UserID: uid
            });
        }
        if (userData) {
        updateUser();
        }
    });

    //updates  user
    function updateUser(){
        var user = firebase.auth().currentUser;
        var uid;
        if(user != null){
            uid = user.uid;
        }

        var ref = firebase.database().ref().child('Users');
        ref.on('child_added', function(snapshot) {
            // console.log(snapshot.key);
            // console.log(snapshot.child("UserID").val());
            var idCheck = (snapshot.child("UserID").val());
            if(idCheck === uid){
                ref.child(snapshot.key).update({
                    SteamURL: steamurl,
                    Region: region,
                    Tier: tier,
                    Dotabuff: dotabuff,
                    Role: pos,
                    Also: check,
                });
            }
        });

    }

    document.getElementById('playerinputformEdit').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('editProfile').style.display = 'inline-block';
    document.getElementById('profileUpdated').style.display = 'inline-block';
    document.getElementById('btnRemovePost').style.display = 'inline-block';
    document.getElementById('btnLogout').style.display = 'inline-block';
    document.getElementById('message').innerHTML = "Profile Updated!";
}



var firstSearch = true;
//submit for results
  function search(){

      document.getElementById('resultdisplay').style.display = 'none';
      document.getElementById('tableID').style.display='block';
      document.getElementById('searcher').style.display = 'none';
      document.getElementById('reseter').style.display = 'none';

           printData(gotData);

           if(firstSearch === true){
               chatListener();
           }
           firstSearch=false;

  }

//show the edit profile page
 function editShow(){
      document.getElementById('playerinputformEdit').style.display = 'block';
      document.getElementById('editProfile').style.display = 'none';
      document.getElementById('updateBtn').style.display = 'inline-block';
      document.getElementById('profileUpdated').style.display = 'none';
document.getElementById('btnRemovePost').style.display = 'none';
document.getElementById('btnLogout').style.display = 'none';

 }

function sendEmail(){
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  console.log("email sent");
}).catch(function(error) {
  // An error happened.
});

}

//reset function
function resetFunction(){
document.getElementById("playerinputform").reset();
if(document.getElementById('groupedaddon1') !== null) {
    document.getElementById('groupedaddon1').style.display = "none";
    document.getElementById('groupedaddon2').style.display = "none";
    document.getElementById('groupedaddon3').style.display = "none";
}

}

  function display_div(e) {
      if (e === 0) {
          document.getElementById('groupedaddon1').style.display = "none";
          document.getElementById('groupedaddon2').style.display = "none";
          document.getElementById('groupedaddon3').style.display = "none";
          //uncheck boxes
          document.getElementById('add1capcheckbox').checked=false;
          document.getElementById('add2capcheckbox').checked=false;
          document.getElementById('add3capcheckbox').checked=false;
          document.getElementById('add1position1check').checked=false;
          document.getElementById('add2position1check').checked=false;
          document.getElementById('add3position1check').checked=false;
          document.getElementById('add1position2check').checked=false;
          document.getElementById('add2position2check').checked=false;
          document.getElementById('add3position2check').checked=false;
          document.getElementById('add1position3check').checked=false;
          document.getElementById('add2position3check').checked=false;
          document.getElementById('add3position3check').checked=false;
          document.getElementById('add1position4check').checked=false;
          document.getElementById('add2position4check').checked=false;
          document.getElementById('add3position4check').checked=false;
          document.getElementById('add1position5check').checked=false;
          document.getElementById('add2position5check').checked=false;
          document.getElementById('add3position5check').checked=false;
      }

      if (e == 1) {
          document.getElementById('groupedaddon' + e).style.display = "block";
          document.getElementById('groupedaddon' + 2).style.display = "none";
          document.getElementById('groupedaddon' + 3).style.display = "none";
          //uncheck boxes
          document.getElementById('add2capcheckbox').checked=false;
          document.getElementById('add2position1check').checked=false;
          document.getElementById('add2position2check').checked=false;
          document.getElementById('add2position3check').checked=false;
          document.getElementById('add2position4check').checked=false;
          document.getElementById('add2position5check').checked=false;
          document.getElementById('add3capcheckbox').checked=false;
          document.getElementById('add3position1check').checked=false;
          document.getElementById('add3position2check').checked=false;
          document.getElementById('add3position3check').checked=false;
          document.getElementById('add3position4check').checked=false;
          document.getElementById('add3position5check').checked=false;
      }
      if (e == 2) {
      document.getElementById('groupedaddon' + 1).style.display = "block";
      document.getElementById('groupedaddon' + e).style.display = "block";
      document.getElementById('groupedaddon' + 3).style.display = "none";
          //uncheck boxes
          document.getElementById('add3capcheckbox').checked=false;
          document.getElementById('add3position1check').checked=false;
          document.getElementById('add3position2check').checked=false;
          document.getElementById('add3position3check').checked=false;
          document.getElementById('add3position4check').checked=false;
          document.getElementById('add3position5check').checked=false;
  }
      if(e== 3) {
          document.getElementById('groupedaddon' + 1).style.display = "block";
          document.getElementById('groupedaddon' + 2).style.display = "block";
          document.getElementById('groupedaddon' + e).style.display = "block";
      }
  }


  function printData(funcName) {

      database = firebase.database();
      var ref = database.ref().child('Posts');


      ref.on("value", funcName, errData);
      //ref.on("value", funcName, errData);

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
          cell1.appendChild(document.createTextNode("URLs"));
          var cell3 = row2.insertCell(1);
          cell3.appendChild(document.createTextNode("Main Position:"));
          var cell4 = row2.insertCell(2);
          cell4.appendChild(document.createTextNode("Secondary Position(s):"));
          var cell5 = row2.insertCell(3);
          cell5.appendChild(document.createTextNode("Grouped with:"));
          var cell6 = row2.insertCell(4);
          cell6.appendChild(document.createTextNode("Comms:"));
          var cell7 = row2.insertCell(5);
          cell7.innerHTML="Miscellaneous <br> Information:";
          var cell8 = row2.insertCell(6);
          cell8.innerHTML="MSG";

          // Loop through array
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              var player = players[key];

              if(player.Region === region && player.Tier === tier && (player.Role === position1 || player.Role === position2|| player.Role === position3 || player.Role === position4 || player.Role === position5)){

                //table that receives values
              var row = header.insertRow(1);
              var cell1 = row.insertCell(0);
              cell1.style="white-space:nowrap";
              cell1.style.maxWidth="9%";
              cell1.style.minWidth="8%";
              var cell3 = row.insertCell(1);
              var cell4 = row.insertCell(2);
              var cell5 = row.insertCell(3);
              var cell6 = row.insertCell(4);
              cell6.style.maxWidth="4%";
              cell6.style.minWidth="4%";
              var cell7 = row.insertCell(5);
              var cell8 = row.insertCell(6);
                    //img link for steam url
                  var steamimg= document.createElement('img');
                  steamimg.src="./img/SteamIcon.png";
                  steamimg.width='42';
                  steamimg.height='42';
                  var steamlink = document.createElement('a');
                  steamlink.target = "_blank";
                  steamlink.href = player.SteamURL;
                  steamlink.appendChild(steamimg);
                  cell1.appendChild(steamlink);
                  //space between
                  cell1.appendChild(document.createTextNode("  "));
                  //img link for dotabuff url
                  var dotabuffimg= document.createElement('img');
                  dotabuffimg.src="./img/dotabufficon.png";
                  dotabuffimg.width='42';
                 dotabuffimg.height='42';
                  var dotabufflink = document.createElement('a');
                  dotabufflink.target = "_blank";
                  dotabufflink.href = player.Dotabuff;
                  dotabufflink.appendChild(dotabuffimg);
              cell1.appendChild(dotabufflink);
              if(player.Role === position1){cell3.appendChild(document.createTextNode("Carry"));}
                  if(player.Role === position2){cell3.appendChild(document.createTextNode("Mid"));}
                  if(player.Role === position3){cell3.appendChild(document.createTextNode("Offlane"));}
                  if(player.Role === position4){cell3.appendChild(document.createTextNode("Roamer / Support"));}
                  if(player.Role === position5){cell3.appendChild(document.createTextNode("Carry"));}
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


                  //img link for msg icon
                  var msgimg = document.createElement('img');
                  msgimg.src="./img/msgicon.png";
                  msgimg.width='42';
                  msgimg.height='42';
                  var msglink = document.createElement('a');
                  msglink.target = "_blank";
                  msglink.href = "javascript:;";
                  msglink.innerHTML = "<img onclick='openChat(\""+player.UserID+"\")' src='./img/msgicon.png' height = '38' width='38' />";
                  cell8.appendChild(msglink);
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

  function dropUp(){
    var x = document.getElementById("dropup");
    if (x.style.display === "none") {
    x.style.display = "inline-block";
  }

}


function closeDropUp(){
    var x = document.getElementById("dropup");
    x.style.display = "none";
    clearTextBox();
    currentlyOpen = "";
    // var msgbtn = document.getElementById(userTo + "btn");
    // msgbtn.style.display = "none";
    unsubscribe();
}

var openedAlready = false;
  var currentlyOpen;

    function openChat(userTo){
        if(openedAlready === true) {
            closeDropUp(); //close dropup if open to reset chat log
        }           //to prevent glitches from multiple opens

        if(!currentNotifsOpen.includes(userTo)) {
            currentNotifsOpen.push(userTo);
            openNewNotification(userTo);
        }
        currentlyOpen = userTo;
        //clears old text log when you open a new chat
         var dropupTextBox = document.getElementById("dropupText");
         dropupTextBox.innerHTML = "";

            var dropup = document.getElementById("dropup");
            // if (openedAlready === true) {
            //     dropUp();
            // } else {
                var user = firebase.auth().currentUser;
                var uid;
                if (user != null) {
                    uid = user.uid;
                }
                var sendMsgBtn = document.getElementById("sendMsgBtn");
                sendMsgBtn.onclick = function () {
                    sendMsg(userTo);
                    clearTextBox();
                };
                dropUp();



          //  }
    getChatData(userTo);

// Execute a function when the user releases a key on the keyboard
    var input = document.getElementById("inputMsg");
    input.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("sendMsgBtn").click();
        }
    });
    updateScroll();

openedAlready = true;
}

function sendMsg(userTo) {

    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }
    var chatRef = db.collection("chats");
    var msg = document.getElementById("inputMsg").value;



    //pulls data from current logged in user to send messages
    var ref = firebase.database().ref().child('Users');
    ref.on('child_added', function(snapshot) {
        var idCheck = (snapshot.child("UserID").val());
        if(idCheck === uid){
         var steamurl = (snapshot.val() && snapshot.val().SteamURL);


            //Sends pushes message to database with uid and a message FIRST OR ---WORKING
            chatRef.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    if ((doc.data().user1 == uid && doc.data().user2 == userTo) || (doc.data().user2 == uid && doc.data().user1 == userTo)) {
                        if(msg != "") {
                            chatRef.doc(doc.id).collection("messages").doc().set({
                                from: uid,
                                msg: steamurl + ": " + msg,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()

                            })

                                .then(function() {
                                    console.log("Document successfully written!", chatRef.id);
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                        }

                    }
                });
            });

        }
    });

}

function clearTextBox(){
  document.getElementById("inputMsg").value = '';
}

function updateMessageThread(){
//if the user is already messaging someone
//don't post new
var message = document.getElementById("inputMsg").value;
var user = firebase.auth().currentUser;
var uid;
if(user != null){
    uid = user.uid;
}

var ref = firebase.database().ref().child('Messages');
ref.on('child_added', function(snapshot) {
    // console.log(snapshot.key);
    // console.log(snapshot.child("UserID").val());
    var idCheck = (snapshot.child("UserID1").val());

    if(idCheck === uid){

        ref.child(snapshot.key).push({
            Message:message,
        });
    }
});

}

function printMessages(funcName) {

    database = firebase.database();
    var ref = database.ref().child('Messages');

    ref.on("value", funcName, errData);



    function errData(error) {
        console.log("Something went wrong.");
        console.log(error);
    }

}

function gotMessages(data){
  //current user data
  var user = firebase.auth().currentUser;
  var uid;
  if(user != null){
      uid = user.uid;
  }


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



      if(player.UserID1 == uid){
        //console.log(player.UserID1);

        var ref = firebase.database().ref().child('Messages');
        //console.log(ref);
        ref.on('child_added', function(snapshot) {
            //console.log(snapshot.key);
            // console.log(snapshot.child("UserID").val());
            var idCheck = (snapshot.val());
            var testKeys = Object.keys(idCheck);
            var hasKey = false; //contains uid

            for (var j = 0; j < testKeys.length; j++) {
            var testKey = testKeys[j];

            var testMessage = idCheck[testKey];

            if(testMessage === uid){
		    for(var k =0; k < testKeys.length; k++){
			var testKey2 = testKeys[k];
		
		var testMessage = idCheck[testKey2];    
			    if(testMessage.Message != null){
			    console.log(testMessage.Message);
			    }
		    }
	    }   
          }
        });
      }

      var table = document.getElementById('playerlist');
      entry.appendChild(document.createTextNode(player.Message + " " + player.UserID1));
      var br = document.createElement("br");
      entry.appendChild(br);
      table.appendChild(entry);


  }
}

function updateScroll(){
    var myDiv = document.getElementById("dropup");
    myDiv.scrollTop = myDiv.scrollHeight;

}

var alreadyOpened = new Array();
var unsubscribe;
var i = 0;
function getChatData(userTo){
    // Add a new document in collection
    var chatRef = db.collection("chats");

    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }


    db.collection("chats").onSnapshot(function (querySnapshot) {
        var hasOne = false;
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            if ((doc.data().user1 == uid && doc.data().user2 == userTo) || (doc.data().user2 == uid && doc.data().user1 == userTo)) {
                hasOne = true;
            } else {
                //empty for now
            }
        });
        //if a doc doesn't exists for these IDS, create one
        if (hasOne == false) {
            chatRef.doc().set({
                user1: uid,
                user2: userTo
            })
                .then(function () {
                    console.log("Document successfully written! NEW ID", chatRef.id);
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }

    });





    //pulls data from current logged in user to send messages
    var ref = firebase.database().ref().child('Users');
    ref.on('child_added', function(snapshot) {
        // console.log(snapshot.key);
        //console.log(snapshot.child("UserID").val());

        var user = firebase.auth().currentUser;
        var uid;
        if(user != null){
            uid = user.uid;
        }

        var idCheck = (snapshot.child("UserID").val());

        if(idCheck === uid){
         var steamurl = (snapshot.val() && snapshot.val().SteamURL);


            //FOR READING DATA AND PRINTING TO THE CHATBOX
            db.collection("chats").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots

                    //console.log(doc.id, " => ", doc.data());
                    if ((doc.data().user1 === uid && doc.data().user2 === userTo) || (doc.data().user2 === uid && doc.data().user1 === userTo)) {
                        unsubscribe = chatRef.doc(doc.id).collection("messages").orderBy("timestamp")
                            .onSnapshot(function (snapshot) {
                                snapshot.docChanges.forEach(function (change) {


                                    if (change.type === "added") {
                                        var dropupTextBox = document.getElementById("dropupText");
                                        var notYou = false;
                                        for(var k = 0; k < steamurl.length; k++) {
                                            if (steamurl.charAt(k) !== change.doc.data().msg.charAt(k)) {
                                                notYou = true;
                                            }
                                        }
                                            if(notYou === true) {
                                                dropupTextBox.innerHTML += "<span style=color:red>" + change.doc.data().msg + "</span>" + "<BR>";
                                            }
                                            else{
                                                dropupTextBox.innerHTML += "<span style=color:blue>" + change.doc.data().msg + "</span>" + "<BR>";
                                            }

                                        updateScroll();
                                    }
                                });
                            });
                        for(var j = 0; j < alreadyOpened.length; j++)
                            if (alreadyOpened[j] === doc.id) {

                            }

                        alreadyOpened[i] = doc.id;
                        i++;
                    }

                });

            });

        }
    });



    // //FOR READING DATA AND PRINTING TO THE CHATBOX
    // db.collection("chats").get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //
    //         //console.log(doc.id, " => ", doc.data());
    //         if ((doc.data().user1 === uid && doc.data().user2 === userTo) || (doc.data().user2 === uid && doc.data().user1 === userTo)) {
    //              unsubscribe = chatRef.doc(doc.id).collection("messages").orderBy("timestamp")
    //                 .onSnapshot(function (snapshot) {
    //                     snapshot.docChanges.forEach(function (change) {
    //
    //
    //                         if (change.type === "added") {
    //                             var dropupTextBox = document.getElementById("dropupText");
    //                             dropupTextBox.innerHTML += change.doc.data().msg + "<BR>";
    //                             updateScroll();
    //                         }
    //                     });
    //                 });
    //                 for(var j = 0; j < alreadyOpened.length; j++)
    //                 if (alreadyOpened[j] === doc.id) {
    //
    //                 }
    //
    //                 alreadyOpened[i] = doc.id;
    //                 i++;
    //         }
    //
    //     });
    //
    // });
}

var firstTime = true;
function chatListener(){


    //listens for chat updates
    // Add a new document in collection
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
        uid = user.uid;
    }

    var chatRef = db.collection("chats");
    //Listener for new chat messages
    db.collection("chats").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots

            //console.log(doc.id, " => ", doc.data());
            if (doc.data().user1 === uid  || doc.data().user2 === uid) {
                var unsubscribe = chatRef.doc(doc.id).collection("messages").orderBy("timestamp")
                    .onSnapshot(function (snapshot) {
                        snapshot.docChanges.forEach(function (change) {
                            if (change.type === "added" && firstTime === false) {
                                if(doc.data().user1 === uid){
                                  //  openChat(doc.data().user2);
                                    if(!currentNotifsOpen.includes(doc.data().user2)) {
                                        openNewNotification(doc.data().user2);
                                        currentNotifsOpen.push(doc.data().user2);
                                    }else{
                                        if(currentlyOpen !== doc.data().user2) {
                                            var notifBtn = document.getElementById(doc.data().user2 + "btn");
                                            notifBtn.style.backgroundColor = '#c60f22';
                                        }
                                    }
                                }
                                else if(doc.data().user2 === uid){
                                  //  openChat(doc.data().user1);
                                    if(!currentNotifsOpen.includes(doc.data().user1)) {
                                        openNewNotification(doc.data().user1);
                                        currentNotifsOpen.push(doc.data().user1);
                                    }else{
                                        if(currentlyOpen !== doc.data().user1) {
                                            var notifBtn = document.getElementById(doc.data().user1 + "btn");
                                            notifBtn.style.backgroundColor = '#c60f22';
                                        }
                                    }
                                }
                            }
                        });
                    });
            }
        });

    });

    setTimeout(turnOnListener, 3000);

}

function turnOnListener(){ //delays listening for 3 seconds to ensure only new messages provide notifications
    firstTime = false;
}

var currentNotifsOpen = new Array();
function openNewNotification(userFrom){

    //pulls data from current logged in user to send messages
    var ref = firebase.database().ref().child('Users');
    ref.on('child_added', function(snapshot) {


        var idCheck = (snapshot.child("UserID").val());

        if(idCheck === userFrom){

            var steamurl = (snapshot.val() && snapshot.val().SteamURL);


            var btn = document.createElement("Button");
            var textFrom = document.createTextNode(steamurl);
            btn.id = userFrom + "btn";
            btn.appendChild(textFrom);
            btn.style.cssText = 'background-color: #c60f22;border: none;color: white;width: 15%;position: relative;padding: 5px 10px;overflow-x: hidden;margin: 2px;float: right;text-align: center;text-decoration: none;font-size: 16px;right:15px;';
            btn.addEventListener("click", opensChat);
            function opensChat() {
                if(currentlyOpen === userFrom){
                    closeDropUp();
                    currentlyOpen = "";
                }else {
                    openChat(userFrom);
                }
            }

            document.getElementById("footerID").appendChild(btn);

        }
    });



    // var btn = document.createElement("Button");
    // var textFrom = document.createTextNode(userFrom);
    // btn.id = userFrom + "btn";
    // btn.appendChild(textFrom);
    // btn.style.cssText = 'background-color: #4CAF50;border: none;color: white;width: 15%;position: relative;padding: 5px 10px;overflow-x: hidden;margin: 2px;float: right;text-align: center;text-decoration: none;font-size: 16px;right:15px;';
    // btn.addEventListener("click", opensChat);
    // function opensChat() {
    //     if(currentlyOpen === userFrom){
    //         closeDropUp();
    //         currentlyOpen = "";
    //     }else {
    //         openChat(userFrom);
    //     }
    // }
    //
    // document.getElementById("footerID").appendChild(btn);

}

function getSteamUrl(userIDToGet){

    //TODO: DELETE THIS AFTER COMPLETION, USE TO PULL STEAMURL IF NEEDED


    //pulls data from current logged in user to send messages
    var ref = firebase.database().ref().child('Users');
    ref.on('child_added', function(snapshot) {


        var idCheck = (snapshot.child("UserID").val());

        if(idCheck === userIDToGet){

         var steamurl = (snapshot.val() && snapshot.val().SteamURL);


        }
    });

}

function closeChat(){


    document.getElementById(currentlyOpen + "btn").remove();
    var index =  currentNotifsOpen.indexOf(currentlyOpen);
    if (index !== -1)  currentNotifsOpen.splice(index, 1);

    closeDropUp();
}

