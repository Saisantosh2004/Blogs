import { useContext } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";


export default function Layout({logout}){
  const { setUserInfo } = useContext(UserContext)
  const navigate = useNavigate();
  function logout(){
    fetch('http://localhost:4000/logout', {
    credentials: 'include',
    method: 'POST',
    })
    .then(() => {
      setUserInfo(null);
      navigate('/');
    })
    .catch((error) => {
      console.log('Logout error:', error);
    });
  }
  
    return (
        <main>
          <Header logout={logout}/>
          <Outlet/>
        </main>
    );
}