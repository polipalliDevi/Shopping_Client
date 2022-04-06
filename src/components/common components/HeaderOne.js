import React from "react";
import logo from "../images/logo.jpg";
import "./HeaderOne.css";
import {Link} from "react-router-dom"

function HeaderOne(){
    return(
        <div className="Header">
            <div className="logo-title">
                <img className="logo" src={logo} alt="e-shopping"></img>
                <h3 className="title">E-Shopping Website</h3>
            </div>
            <div className="nav">
            <nav> 
             <ul className="nav-bar">
            <Link to='/'><li><h4>Home</h4></li></Link>
            <Link to='/register'><li><h4>Register</h4></li></Link>
            <Link to='/'><li><h4>SignIn</h4></li></Link>
          </ul>
        </nav>

            </div>
        </div>
    )
    
}

export default HeaderOne;