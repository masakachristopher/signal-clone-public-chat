import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA-VBDx7CR6Viuw5DaWbfDdXqfCROpZE1E",
    authDomain: "signal-clone-demo.firebaseapp.com",
    projectId: "signal-clone-demo",
    storageBucket: "signal-clone-demo.appspot.com",
    messagingSenderId: "330184920691",
    appId: "1:330184920691:web:3324375996c6a717dfe406"
  };


let app;

if(firebase.apps.length === 0){
app = firebase.initializeApp(firebaseConfig);

}else{
    app = firebase.app();
}

let db = app.firestore()
let auth = firebase.auth();

export {db, auth}
