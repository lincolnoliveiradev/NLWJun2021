import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
}

// const firebaseConfig = {
//     apiKey: "AIzaSyA5prYiXYFn-CbX0i8l4X2TWDdfShd54AE",
//     authDomain: "letmeask-9f4db.firebaseapp.com",
//     databaseURL: "https://letmeask-9f4db-default-rtdb.firebaseio.com",
//     projectId: "letmeask-9f4db",
//     storageBucket: "letmeask-9f4db.appspot.com",
//     messagingSenderId: "793142546316",
//     appId: "1:793142546316:web:649ac1a8910a0c054b90a9"
// }

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }