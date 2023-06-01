import React, { useContext, useEffect, useState } from 'react'
import {Link, Navigate} from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../App.css'

export default function Header({logout}){
    // const [username,setUsername]=useState(null);
    const {setUserInfo,userInfo}=useContext(UserContext);
    // const [redirect,setRedirect]=useState(false);

    useEffect(()=>{
      fetch('http://localhost:4000/profile',{credentials:'include'}).then(res=>res.json().then(userInfo=>{
        setUserInfo(userInfo);
      }))
    },[])    
    
    const username=userInfo?.username;

    return (
      <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <i>Hello {username}</i>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout}>Logout</Link> 
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
    );
}