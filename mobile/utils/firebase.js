import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
    apiKey: "AIzaSyDKVWx2BMepi_gMdtv-jRz1xnBCDn7jK5A",
    authDomain: "letscode-3fd06.firebaseapp.com",
    databaseURL: "https://letscode-3fd06.firebaseio.com",
    projectId: "letscode-3fd06",
    storageBucket: "letscode-3fd06.appspot.com",
    messagingSenderId: "463436922175",
    appId: "1:463436922175:web:458c70eaa99285e2"
};

firebase.initializeApp(config);

export default firebase;
