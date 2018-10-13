firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var name = user.displayName;
      var pic = user.photoURL
      document.getElementById("user_para").innerHTML = "Welcome User : " + name;
      //document.getElementById("user_pic").innerHTML = pic;
        document.getElementById("user_pic").src=pic;
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
function logout(){
  firebase.auth().signOut();
}

//new
/*
function ingoogle() {
    function newLoginHappened(user) {
        if (user) {
            //user is signed in
            document.getElementById("user_div").style.display = "block";
            document.getElementById("login_div").style.display = "none";
            app(user);
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);
    function app(user){
        var user_name = user.displayName;
        //user.email
        //user.photoURL
        //user.uid
        document.getElementById("user_para").innerHTML = "Welcome User : " + user_name;
    }
}*/
function ingoogle(){
  var provider = new firebase.auth.GoogleAuthProvider;
  //firebase.auth().signInWithRedirect(provider)
    firebase.auth().signInWithPopup(provider).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

    firebase.auth().signInWithRedirect(provider).then(function () {
        console.log(3333)
        firebase.auth().getRedirectResult().then(function(result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(user)
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })
}
function signup() {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Error signing up: Error Code - " + errorCode + "\nProblem - "+ error.message);
  console.log(errorCode, errorMessage);
});
}

