import React from "react";
import "./HeaderTwo.module.css"
import logo from "../images/logo.jpg";
import {Link} from "react-router-dom"
//import style from "./HeaderTwo.module.css"

function HeaderTwo(props){
    return(
        <div className="Header" >
            <div className="logo-title">
                <img className="logo" src={logo} alt="e-shopping"></img>
                <h3 className="title">Logged in </h3>
            </div>
            <div className="nav">
            <nav> 
             <ul className="nav-bar">
            <Link to='/products'><li><h4>Home</h4></li></Link>
            <li><h4>UserName</h4></li>
            <Link to='/userproducts'><li><h4>Bag({props.count})</h4></li></Link>
            <Link to='/'><li><h4>Log Out</h4></li></Link>
          </ul>
        </nav>

            </div>
        </div>
    )
}

export default HeaderTwo;