/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import { Dispatch } from 'redux';
import Firebase from '../../../config/Firebase';
import {
  registrationRequested,
  registrationSuccessful,
  registrationFailed,
} from './action';

const auth = Firebase.auth();

const registerWithEmailAndPassword = (userEmail: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(registrationRequested());
    auth.createUserWithEmailAndPassword(userEmail, password)
      .then(async (userCredentials) => {
        const uid = userCredentials
                  && userCredentials.user
                  && userCredentials.user.uid;
        const displayName = userCredentials
                          && userCredentials.user
                          && userCredentials.user.displayName;
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

const signInWithEmailAndPassword = (email: string, password: string) => {
  auth.signInWithEmailAndPassword(email, password)
    .then((userDetails) => console.log(userDetails))
    .catch((err) => console.log(err));
};

export { registerWithEmailAndPassword, signInWithEmailAndPassword };
