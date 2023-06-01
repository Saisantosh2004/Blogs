import { Navigate } from 'react-router-dom';
import '../../src/App.css';
import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

export default function Loginpage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login' ,{
            method:"POST",
            body:JSON.stringify({username,password}),
            headers:{'content-type':'application/json'},
            credentials:'include'
        })
        // console.log(response);

        if(response.ok){
            response.json().then((userInfo)=>{
                setUserInfo(userInfo);
                setRedirect(true);                
            })
        }
    }

    if(redirect){
        return <Navigate to='/'/>
    }

    return (
        <div>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input type="text" placeholder="username" value={username} onChange= {ev => setUsername(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>Login</button>
            </form>
        </div>
    );
}