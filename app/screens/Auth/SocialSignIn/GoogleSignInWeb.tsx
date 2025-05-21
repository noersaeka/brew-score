// googleSignInWeb.ts
import auth from '@react-native-firebase/auth';
import { firebaseWebConfig } from './web-config';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

const redirectUri = 'https://gerilya-944a3.firebaseapp.com/__/auth/handler'; // or use dynamic link

export async function googleSignInWithWeb() {
  // const provider = new auth.GoogleAuthProvider();

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${firebaseWebConfig.apiKey}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=token` +
    `&scope=profile email openid`;

  console.log('waw', firebaseWebConfig.apiKey);
  if (await InAppBrowser.isAvailable()) {
    const result = await InAppBrowser.openAuth(authUrl, redirectUri, {
      // Custom styling options
      showTitle: true,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
    });

    if (result.type === 'success' && result.url) {
      const url = new URL(result.url);
      const accessToken = url.hash.match(/access_token=([^&]*)/)?.[1];

      if (!accessToken) throw new Error('No access token received');

      const googleCredential = auth.GoogleAuthProvider.credential(null, accessToken);
      await auth().signInWithCredential(googleCredential);
    }
  } else {
    Linking.openURL(authUrl);
  }
}
