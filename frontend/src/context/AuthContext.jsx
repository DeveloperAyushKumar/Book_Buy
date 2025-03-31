// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebase.config';
// import { setLogLevel } from 'firebase/app';
import { createContext, useContext, useEffect, useState} from 'react'
const AuthContext =createContext()
import axios from "axios"
// using pvodier pattern  : https://mortenbarklund.com/blog/react-architecture-provider-pattern/
// custom hook that will be used by child components

 export const useAuth =()=>{
    return useContext(AuthContext);
}

// provider  ,
export const AuthProvider =({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const checkAuthStatus=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_BACKENDURL}/api/auth/me`,{
                headers:{Authorization:`Bearer ${localStorage.getItem('authToken')}`}
            })
            console.log(res.data)
            setCurrentUser(res.data.user);

        }
        catch(error){
            setCurrentUser(null);
            console.error("error occured in mounting ",error)

        }
    }
    const registerUser= async(username ,email , password)=>{
        try {
            const res=await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/auth/signup`,{username ,email,password})
         if(res.status==200||res.status==201){
            localStorage.setItem("authToken",res.data.token); // store jwt
            checkAuthStatus(); 
         }
         alert( res.data.message);
        } catch (error) {
            
            console.error("registration failed ",error)
            
        }
       
    }  
    // login
    const loginUser= async(email , password)=>{
        try {
            const res =await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/auth/login`,{email,password})
          checkAuthStatus()
            alert(res.message)
        } catch (error) {
            console.error("login failed ",error)
            
        }
       
    }
    // signIn with google 
    const signInWithGoogle=async ()=>{
        window.location.href=`${import.meta.env.VITE_BACKENDURL}/api/auth/google`
        
        
    }
    // logout user
    const logout =async()=>{
        try {
            await axios.post(`${import.meta.env.VITE_BACKENDURL}/api/auth/logout`)
            
        } catch (error) {
            console.error("logout failed",error)

        }
    }
    // manage user 
    useEffect(()=>{
        const urlParams=new URLSearchParams(window.location.search);
        console.log(urlParams)
        const token =urlParams.get("token");
        if(token){
            localStorage.setItem("authToken",token);
            //remove token from url
            window.history.replaceState({},document.title,window.location.pathname)
        }
        checkAuthStatus();
    },[])

    const value={
        loading,
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,

    }


    return (
        <AuthContext.Provider value ={value}>
        {children}
        </AuthContext.Provider>
    )
}


