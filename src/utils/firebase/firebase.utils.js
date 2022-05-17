import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth,
         signInWithRedirect,
         signInWithPopup,
         GoogleAuthProvider
        } from 'firebase/auth';
import { getFirestore,
         doc,
         getDoc,
         setDoc
       } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBuXozJGxK_rhg1bHt9YW7z7tutvFiu7Bw",
    authDomain: "crown-clothing-db-beb9c.firebaseapp.com",
    projectId: "crown-clothing-db-beb9c",
    storageBucket: "crown-clothing-db-beb9c.appspot.com",
    messagingSenderId: "681647332423",
    appId: "1:681647332423:web:b6801d6eee245e4738e562"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentfromAuth = async (userAuth) => {
        const userDocRef = doc(db, 'users', userAuth.uid)
        console.log(userDocRef)
        const userSnapshot = await getDoc(userDocRef)
        console.log(userSnapshot)
        console.log(userSnapshot.exists())

        //If user data doesn't exist
        if(userSnapshot.exists()){
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try{
                await setDoc(userDocRef, { displayName,
                                           email,
                                           createdAt
                                         });
            } catch(error){
                console.log('Error creating the user' + error.message)
            }
        }

        //If user exists nothing to do
        return userDocRef
  };