// import {
//     FIREBASE_WEB_API_KEY,
//     FIREBASE_WEB_AUTH_DOMAIN,
//     FIREBASE_WEB_PROJECT_ID,
//     FIREBASE_WEB_STORAGE_BUCKET,
//     FIREBASE_WEB_MESSAGING_SENDER_ID,
//     FIREBASE_WEB_APP_ID,
//     FIREBASE_WEB_MEASUREMENT_ID
// } from '@env';
import Config from "react-native-config";

export const firebaseWebConfig = {
    apiKey: Config.FIREBASE_WEB_API_KEY,
    authDomain: Config.FIREBASE_WEB_AUTH_DOMAIN,
    projectId: Config.FIREBASE_WEB_PROJECT_ID,
    storageBucket: Config.FIREBASE_WEB_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_WEB_MESSAGING_SENDER_ID,
    appId: Config.FIREBASE_WEB_APP_ID,
    measurementId: Config.FIREBASE_WEB_MEASUREMENT_ID
};