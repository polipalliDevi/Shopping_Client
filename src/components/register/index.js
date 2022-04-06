import React, { useState } from "react";
import {Link,useHistory} from "react-router-dom"
import HeaderOne from "../common components/HeaderOne";
import "./index.css"


function Register(){
    const history=useHistory()
    const [user,setUser]=useState({name:"",email:"",phone:"",password:"",city:""})

    let name,value

    const handleDetails=(e)=>{
        console.log(e)
        name = e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value})
        console.log(user)
    } 

    const Postdata=async(e)=>{
        e.preventDefault();
        const {name,email,phone,password,city}=user;

        const response= await fetch('https://shoppingappserver.herokuapp.com/register',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"                 
            },
            body:JSON.stringify({name,email,phone,city,password})
        })
        const data = await response.json()
        if(data.status===400 || !data){
            window.alert("user already exist")
            console.log("user Already exist")
        }else{
            window.alert("user registered successfully")
            console.log("user registered successfully")
            history.push('/')
        }

    }
return(
    <div className="container">
    <div className="header">
        <HeaderOne/>
    </div>
    <div className="signin">
        <div className="signin-block">
            <h1 className="sigin-heading">Register</h1>
            <form className="signin-form">
                <h3 className="signin-label1">Name</h3>
                <input className="sigin-input1" name="name" value={user.name} autoComplete='off' onChange={handleDetails}   type='name'/>
                <br/>
                <h3 className="signin-label2">Email</h3>
                <input className="sigin-input2" name="email" value={user.email} autoComplete='off' onChange={handleDetails}type='email'/>
                <br/>
                <h3 className="signin-label3">Phone</h3>
                <input className="sigin-input3" type='phone' name="phone" value={user.phone} autoComplete='off' onChange={handleDetails}/>
                <br/>
                <h3 className="signin-label4">City</h3>
                <input className="sigin-input4" type='text' name="city" value={user.city} autoComplete='off' onChange={handleDetails}/>
                <br/>
                <h3 className="signin-label5">Password</h3>
                <input className="sigin-input5" type='password'autoComplete='off' name="password" value={user.password} onChange={handleDetails}/>
                <br/>
                <div className="div-btn">
                    <button className="btn" onClick={Postdata}>Register</button>
                </div>
            </form>
            <div className="sign-block">
                <p className="para">Already Have An Account?</p>
                <Link to='/'><button className="sign-btn">Signin</button></Link>
            </div>
        </div>
    </div>


</div>
)
}


export default Register;