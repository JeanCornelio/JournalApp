import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async()=>{
    
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);

        const {displayName, email,  photoURL, uid} = result.user;

        return{
            ok:true,
            //User Info
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok:false,
            //User Info
            errorMessage
        }

    }
}


export const registerUserWithEmailPassword = async ({email, password, displayName}) =>{

    try {

      const resp = await  createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL } = resp.user;
      
      await updateProfile(FirebaseAuth.currentUser, { displayName });


      return{
        ok:true,
        //User Info
        uid,
        photoURL,
        email,
        displayName
    }  

    } catch (error) {
        console.log(error);
        return{
            ok:false,
            //User Info
            errorMessage: error.message
        }
    }
}


export const loginWithEmailPassword = async ({email, password}) =>{

   try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName} = resp.user

        return{
            ok:true,
            //User Info
            uid,
            photoURL,
            displayName
        }  
   } catch (error) {
    return{
        ok:false,
        //User Info
        errorMessage: error.message
    }
   }

}

export const logoutFirebase = async() =>{
    return await FirebaseAuth.signOut();
}