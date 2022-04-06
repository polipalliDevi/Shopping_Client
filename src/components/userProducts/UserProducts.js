import React, { useEffect, useState } from "react"
import HeaderTwo from "../common components/HeaderTwo";
import "./index.css"

function UserProducts(){
    const [items,setItems]=useState([])
    function getToken(){
        if(window.localStorage){
          return localStorage.getItem("token")
        }
        return ""
      }
    const count=items.length
    console.log(count)
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
                setItems(productdata.products)
        } catch (error) {
            console.log(error)
        }

    }, [])
    async function handleClick(item){
        let id =item._id 
        try {
            const response = await fetch(`https://shoppingappserver.herokuapp.com/api/userproducts/${id}`,{
                method:'DELETE',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials':'true',
                    authorization: `test ${getToken()}`
                }
                
            })
            const data = await response.json()
            if(data.status==="Post Delete"){
                window.alert("sucessfully deleted")
                window.location.href = "/userproducts";
            }else{
                window.alert("not deleted from your product list")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="user-main">
            <div className="user-header">
                <HeaderTwo count={count}/>
            </div>
            <h2>YOUR PRODUCTS PAGE</h2>
            <div className="user-cont">
                {items.map((item)=>{
                    return (
                        <div className="user-box">
                        <div className="user-bx-cont">
                            <div>
                            <img className="user-image" src={item.img}/>
                            </div>                     
                        
                        <div>
                            <h5>{item.productName}</h5>
                            <h3>category:{item.type}</h3>
                            <h2 className="user-price">Rs : {item.cost}</h2>
                            <button className="user-remove-btn" onClick={()=>{handleClick(item)}}>Remove from Cart</button>
                        </div>
                        </div>
                    </div>
                    )
                })}
   
            </div>
        </div>
    )
}

export default UserProducts;