

//Un Thunks Es una Funcion que retorna una funcion Asincrona


import { checkingCredentials, login, logout } from "./authSlice"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNoteLogout } from "../journal"


export const checkingAutentication = (email, password)=>{
    return async ( dispatch ) => {
       dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = ()=>{
    return async ( dispatch )=>{
        dispatch(checkingCredentials())

       const result = await singInWithGoogle()
       
       if(!result.ok) return dispatch(logout(result.errorMessage));
       
       delete result.ok;
       dispatch(login(result))
    }
}

export const startCreatingUserWithEmailsPassword = ({email, password, displayName}) =>{
    return async (dispatch)=>{
        dispatch(checkingCredentials())

        const {ok, uid, photoURL, errorMessage} = await  registerUserWithEmailPassword({email, password, displayName})
        
        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password}) =>{
    return async (dispatch)  =>{
        dispatch(checkingCredentials())

        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password})
        
        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))

    }
}

export const startLogoutAuth =  () =>{
    return async(dispatch)=>{
         await logoutFirebase();
         dispatch(clearNoteLogout())
         dispatch(logout())
    }
}