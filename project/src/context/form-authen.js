import React from "react";
const FormAuthenContext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
})
export const FormAuthenProvider=(props)=>{
    <FormAuthenContext.Provider
         value={{
            
         }}>
            {props.children}

</FormAuthenContext.Provider>

}
export default FormAuthenContext;