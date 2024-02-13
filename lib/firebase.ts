import firebase from 'firebase-admin';

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
  ? process.env.FIREBASE_PROJECT_ID
  : '';
const FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY = process.env
  .FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
  ? process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
  : '{}';

firebase.initializeApp({
  credential: firebase.credential.cert(
    JSON.parse(FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY),
  ),
  projectId: FIREBASE_PROJECT_ID,
});

export default firebase;
