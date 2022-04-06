import React, { useState, useEffect } from "react"
import HeaderTwo from "../common components/HeaderTwo"
import "./index.css"
import bag from "../images/addtobag.jpg"
import Product from "../Sub-Home/SubHome";
import {Link} from "react-router-dom"
//import getToken from "../utils/authOperations"


function HomePage() {
    const [isSelected,setIsSelected]=useState(false)
    const [curproductid,setCurProductId]=useState(null)
    const [fake, setFake] = useState([]);
    const [count,setCount]=useState(0)
    console.log(count)
    //console.log(fake)
    
    const toggleSelected=()=>{
        setIsSelected(!isSelected)
    }

    const handleClick=(product)=>{
        console.log(product)
        setCurProductId(product)
        toggleSelected()
    }
    let id=curproductid
   // console.log(curproduct)
   function getToken(){
    if(window.localStorage){
      return localStorage.getItem("token")
    }
    return ""
  }

    useEffect(async() => {

        try {
                const response = await fetch('https://shoppingappserver.herokuapp.com/api/products',{
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials':'true',
                        authorization: `test ${getToken()}`
                      }
                })
                const productdata = await response.json();
                console.log(productdata)
                if (!productdata.status === 200) {
                    const error = new Error(response.error);
                    throw error;
                }        
                setFake(productdata.products)
        } catch (error) {
            console.log(error)
        }

    }, [])
    useEffect(async() => {
        try {
                const response = await fetch('https://shoppingappserver.herokuapp.com/api/userproducts',{
                    method:'GET',
                    mode:'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials':'true',
                        authorization: `test ${getToken()}`
                      }
                })
                const productdata = await response.json();
                console.log(productdata)
                if (!productdata.status === 200) {
                    const error = new Error(response.error);
                    throw error;
                }        
                setCount(productdata.products.length)
        } catch (error) {
            console.log(error)
        }

    }, [])

    //'https://fakestoreapi.com/products'
 
    //products()

    return (
        <div className="home">
            <div className="home-header">
                <HeaderTwo  count={count}/>
            </div>

            <h2>PRODUCTS HOME PAGE</h2>
            <div className="container1">
                {fake.map((product,index) => {
                    return (
                        <>
                            <div className="box" >
                                
                                    <div className="pimg">
                                    <img className="image" key={index} src={product.image}/>
                                    </div >
                                    <div className="pdetails">
                                    <div className="ptitle">
                                    <h5 key={index} className="p-name">{product.title}</h5>
                                    </div>
                                    <div className="pcategory">
                                    <h3 className="category" key={index}>Category: {product.category}</h3>

                                    </div>
                                    <div className="pprice">
                                    <h2 className="price" key={index}>Rs: {product.price}</h2>
                                    </div>
                                    <div className="pbutton">
                                    <button className="view-buttton" onClick={()=>handleClick(product)}>View</button>
                                    </div>                                                   {isSelected && <Product product={curproductid} handleSelected={toggleSelected}/>}
                                                                     
                                    </div>
                               
                                
                            </div>
                        </>
                    )
                })}


            </div>
                
        </div>
    )
}

export default HomePage;