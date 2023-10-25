import React,{useEffect,useState} from "react";
const AuthContext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
})
export const AuthContextProvider=(props)=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const loggedInInfo=localStorage.getItem('loggedIn');
        if(loggedInInfo==="1")
        setIsLoggedIn(true)
    },[])
    const loginHandler=(name,number,email,address)=>{
        localStorage.setItem("loggedIn","1")
        setIsLoggedIn(true);
    }
    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("loggedIn")
      };

    return(
        <AuthContext.Provider
         value={{
            isLoggedIn:isLoggedIn,
         onLogout:logoutHandler,
         onLogIn:loginHandler,
         }}>
            {props.children}

</AuthContext.Provider>
    )
}
export default AuthContext;