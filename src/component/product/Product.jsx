import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Product = () => {
  const [Products,setproducts]=useState([])
  const id = sessionStorage.getItem('username');
  const navigate = useNavigate()

 const getdata=async()=>{
         const res=await axios.get('https://thippa-s-project-default-rtdb.firebaseio.com/ProductData.json')
         setproducts(Object.values(res.data))

 }
 useEffect(()=>{
  getdata()
 },[]
)
const addToCart = async (pname, price, pid,) => {
  if (id) {
    try {
      const resp = await axios.get('https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata.json');
      const cartData = resp.data;
      let isInCart = false

      if(cartData!=undefined){
        isInCart= Object.values(cartData).some(cartItem => cartItem.id === id && cartItem.ProductID === pid);
      }

      if (isInCart) {
        Swal.fire({
          title: 'In Your Cart!',
          text: "This item is already in the cart.",
          icon: 'info',
          timer: 2000,
        });
        navigate(`/cart/${id}`);
      } else {
        const data = { id, ProductName: pname, ProductPrice: price, ProductID: pid, ProductQuantity: 1 };
        await axios.post(`https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata/.json`, data);
        navigate(`/cart/${id}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  } else {
    Swal.fire({
      title: 'Login',
      icon: 'warning',
      text: 'You have to Login first to add Item in Cart',
      timer: 2000,
    });
    navigate('/login');
  }
};
console.log(Products)



const buy = async (pname, price, pid) => {
  if (!id) {
    Swal.fire({
      title: 'Login',
      icon: 'warning',
      text: 'You need to login to proceed with the purchase',
      timer: 2000,
    });
    navigate('/login');
    return;
  }

  const data = {
    id, 
    ProductName: pname, 
    ProductPrice: price, 
    ProductID: pid, 
    ProductQuantity: 1
  };

  try {
    const resp = await axios.post(`https://thippa-s-project-default-rtdb.firebaseio.com/Buy/.json`, data);
    navigate(`/CheckOut/${pid}`);
  } catch (error) {
    console.error("Error uploading purchase data:", error);
  }
};

  return (<>
  
        <Navbar/>
    <div>
      {Products.map((value,index)=>(
      
      
        <div className="card" key={index}>
        <img src={value.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{value.Productname}</h5>
          <p className="card-text">${value.Productprice}</p>
          <div className='d-flex justify-content-around'>
          <button onClick={()=>buy(value.Productname, value.Productprice,value.id) } className="btn btn-primary ">Buy Now</button>
            <button onClick={() => addToCart(value.Productname, value.Productprice, value.id)} className="btn btn-secondary">Add to Cart</button>
            </div>
        </div>
      </div>
      

      ))}
            </div>
  
    </>)
}

export default Product
