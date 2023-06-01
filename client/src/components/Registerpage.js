import { useState } from 'react';
import '../../src/App.css';

export default function Loginpage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');

    async function register(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/register' ,{
            method:"POST",
            body:JSON.stringify({username,password}),
            headers:{'content-type':'application/json'}
        })
        console.log(response);
        if(response.status===200){
            alert("Registraion Succesful")
        }
        else{
            alert("Registraion Failed")
        }
    }

    return (
        <div>
            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input type="text" placeholder="username" value={username} onChange= {ev => setUsername(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>

    );
}