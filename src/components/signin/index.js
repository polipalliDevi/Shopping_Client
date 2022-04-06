import React ,{useEffect, useState}from "react";
import {setToken} from "../utils/authOperations"
import HeaderOne from "../common components/HeaderOne";
import axios from 'axios';


import "./index.css";
import { Link,useHistory } from "react-router-dom"

//import style from "./index.module.css"

function Signin() {
    const history = useHistory();
    const [user,setUser]=useState({data:"",password:""})

    useEffect(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    },[])

    let name,value

    const handleInputs =(e)=>{
        name=e.target.name
        value=e.target.value
        setUser({...user,[name]:value})
        console.log(user)
    }
    
    const Verify = async(e)=>{
        e.preventDefault();
        let phone,email
        const {data,password} = user
        if(parseInt(data) === true){
            phone = data
            axios.post("https://shoppingappserver.herokuapp.com/login",{phone,password},
            {
                headers:{"Content-Type":"application/json"}
            }).then((res)=>{
                console.log(res)
                if(res.status === 200){
                    const token = res.data.Token
                    const userData = res.data.User.name
                    console.log("respose",res.data.User.name);
                    
                    localStorage.setItem('token',token)
                    localStorage.setItem('user',userData)
                    window.location.href = "/products";

                }
            }).catch((e)=>{
                alert("Login Failed");
            })
        }else{
            email = data
            axios.post("http://localhost:5000/login",{email,password},{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res)=>{
                console.log(res)
                if(res.status === 200){
                    const token = res.data.token
                    const userData = res.data.User
                    console.log("setting local storage");
                    localStorage.setItem('token',token)
                    localStorage.setItem('user',userData)
                    window.location.href = "/products";
                }
            }).catch((e)=>{
                alert("Login Failed");
            })
        }
    }

    return (
        <div className="container">
            <div className="header">
                <HeaderOne />
            </div>
            <div className="signin">
                <div className="signin-block">
                    <h1 className="sigin-heading">SignIn</h1>
                    <form className="signin-form" >
                        <div className="email-block">
                            <h3 className="" >Email</h3>
                            <input type="text" className="sign-form" name="data" value={user.data} onChange={handleInputs}></input>
                        </div>
                        <div className="pass-block">
                            <h3 className="signin-label" >Password</h3>
                            <input type="password" className="sign-form" name='password' value={user.password} onChange={handleInputs}></input>
                        </div>
                        <p className="forgot1">Forgot Password?</p>
                        <button type="sumbit" className="sign-sumbit-btn" onClick={Verify} >SignIn</button>
                    </form>
                    <div className="reg-block">
                        <p className="reg-para">Don't Have Any Account?</p>
                        <Link to='/register'><button type="sumbit" value="Register" className="reg-sumbit-btn">Register</button>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signin;