import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBLsQftHeFx9ShUnByekH42MV4eXni5C8A',
	authDomain: 'instagram-738b8.firebaseapp.com',
	projectId: 'instagram-738b8',
	storageBucket: 'instagram-738b8.appspot.com',
	messagingSenderId: '430252327914',
	databaseURL:
		'https://instagram-738b8-default-rtdb.asia-southeast1.firebasedatabase.app',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
