import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    // const credential = GoogleAuthProvider.credentialFromResult(result)
    const user = result.user;

    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    const response = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = response.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = response.user;

    return {
      ok: true,
      displayName,

      photoURL,
      uid
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
