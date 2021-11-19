import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDCtswQUDFqXKf5ikYdtvRALz3frzN36qA',
	authDomain: 'manageproject-db4f7.firebaseapp.com',
	projectId: 'manageproject-db4f7',
	storageBucket: 'manageproject-db4f7.appspot.com',
	messagingSenderId: '366869959405',
	appId: '1:366869959405:web:2627804fc74c69d50db2e4',
};

// firebase init
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
