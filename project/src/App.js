import Input from "./Components/Input/Input";
import Home from "./Components/Home/Home";
import MainHeader from './Components/MainHeader/MainHeader'
import AuthContext from "./context/auth-context";
import { useContext } from "react";
function App() {
    const ctx=useContext(AuthContext);
 return(
   
      <>
          <MainHeader  />
          <main>
            {!ctx.isLoggedIn && <Input />}
            {ctx.isLoggedIn && <Home />}
          </main>
     </>  
      
 );

}

export default App;
