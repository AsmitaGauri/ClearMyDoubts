/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import { Dispatch } from 'redux';
import { Auth as auth, Firestore as firestore } from '../../../config/Firebase';
import {
  registrationRequested,
  registrationSuccessful,
  registrationFailed,
  logoutUser,
  loginRequested,
  loginSuccessful,
  loginFailed,
} from './action';

const registerWithEmailAndPassword = (userEmail: string, password: string, name: string) => {
  return (dispatch: Dispatch) => {
    dispatch(registrationRequested());
    auth.createUserWithEmailAndPassword(userEmail, password)
      .then(async (userCredentials) => {
        const uid = userCredentials
                  && userCredentials.user
                  && userCredentials.user.uid;
        const displayName = name;
        const email = userCredentials
                    && userCredentials.user
                    && userCredentials.user.email;
        const emailVerified = userCredentials
                            && userCredentials.user
                            && userCredentials.user.emailVerified;
        const phoneNumber = userCredentials
                          && userCredentials.user
                          && userCredentials.user.phoneNumber;
        const photoURL = userCredentials
                       && userCredentials.user
                       && userCredentials.user.photoURL;
        const idToken = userCredentials
                       && userCredentials.user
                       && await userCredentials.user.getIdToken();
        firestore.collection('users').add({
          uid,
          userName: displayName,
        });
        dispatch(registrationSuccessful({
          uid, displayName, email, emailVerified, phoneNumber, photoURL, idToken,
        }));
      })
      .catch((err) => {
        const { code, message } = err;
        dispatch(registrationFailed({ code, message }));
      });
  };
};

const signInWithEmailAndPassword = (userEmail: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(loginRequested());
    auth.signInWithEmailAndPassword(userEmail, password)
      .then(async (userCredentials: any) => {
        const { user } = userCredentials;
        const {
          uid, displayName, email, emailVerified, phoneNumber, photoURL,
        } = user;
        const idToken = await user.getIdToken();
        dispatch(loginSuccessful({
          uid, displayName, email, emailVerified, phoneNumber, photoURL, idToken,
        }));
      })
      .catch((err: any) => {
        const { code, message } = err;
        dispatch(loginFailed({ code, message }));
      });
  };
};

const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(logoutUser());
  };
};
export { registerWithEmailAndPassword, signInWithEmailAndPassword, logout };
