import React, { useEffect } from "react";
import "./index.css";
import HeaderTwo from "../common components/HeaderTwo";
import Footer from "../common components/Footer"

function Product(props){
    //console.log(props.product._id)

    function getToken(){
        if(window.localStorage){
          return localStorage.getItem("token")
        }
        return ""
      }
    
    const {title,description,category,price,image}=props.product

    async function handleClick(){
        try {
            const productName=title;
            const cost=price;
            const img=image;
            const content=description;
            const type=category;

            const response = await fetch("https://shoppingappserver.herokuapp.com/api/userproducts",{
                method:"POST",
                mode:"cors",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `test ${getToken()}`
                },
                body:   JSON.stringify({
                    productName,
                    cost,
                    img,
                    type,
                    content
                })

                
            })

            const data = await response.json()
            if (data.status==="success"){
                window.alert("sucessfully add to cart")
                window.location.href='/products'
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }




    //let id=props._id

    return (
        
       <div className="product-main">
           <div className="product-popup">
           <div className="home-header">
                <HeaderTwo />
            </div>
            <div className="product">
                <div className="product-content">
                <img  classNmae="product-image" src={props.product.image}></img>
                <div>
                <h5 className="prodcut-titile">Title: {props.product.title}</h5>
                <h3 className="prodcut-des">Description: {props.product.description}</h3>
                <h5 className="product-cat">Category: {props.product.category}</h5>
                <h2 className="proudct-price">Rs: {props.product.price}</h2>
                
                <button className="product-cart" onClick={handleClick}>Add To Cart</button>
                {/* <div>
                    <label>Qunatity</label>
                    <input></input>
                </div> */}
                

                </div>
                
                <button className="product-close" onClick={()=>props.handleSelected()}>X</button>
                </div>
                
            </div>
            <div>
                <Footer/>
            </div>
            </div>

       </div>
    )
}

export default Product;