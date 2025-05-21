import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function signInWithGoogle() {
  try {
    // Prompt user to pick a Google account
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    // Create a Firebase credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with credential to Firebase
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
