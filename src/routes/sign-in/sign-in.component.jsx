import { signInWithGooglePopup, createUserDocumentfromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentfromAuth(user)
        console.log(userDocRef)
    }

    return(

        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Pop Up
            </button>
        </div>
    );
}

export default SignIn;