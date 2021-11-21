import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
// const firebaseConfig = {
//   apiKey: 'AIzaSyCjcbV-Xhe74zqELifiPDUxUZ9_CfbqzV0',
//   authDomain: 'clear-my-doubts-9ca27.firebaseapp.com',
//   projectId: 'clear-my-doubts-9ca27',
//   storageBucket: 'clear-my-doubts-9ca27.appspot.com',
//   messagingSenderId: '1035727886720',
//   appId: '1:1035727886720:web:4ffa562716e7e3bf3a4965'
// };

// Initialize Firebase
const Auth = auth();
const Firestore = firestore();
const Messaging = messaging();

export {
  Auth, Firestore, messaging, Messaging, firestore,
};
