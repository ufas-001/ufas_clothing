import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQFWpcDeNOSFVQmlLsYcQOWTmLCYJHyg0",
    authDomain: "ufas-clothing.firebaseapp.com",
    databaseURL: "https://ufas-clothing.firebaseio.com",
    projectId: "ufas-clothing",
    storageBucket: "ufas-clothing.appspot.com",
    messagingSenderId: "118509774438",
    appId: "1:118509774438:web:0b8767e2e62faaf5226fa7",
    measurementId: "G-NGTSFZ3LQP"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createDate = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createDate,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }

    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;