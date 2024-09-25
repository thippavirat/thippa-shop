import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import QR from "../assets/qr.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Bill = () => {
  const [data, setData] = useState("none");
  const [data1, setData1] = useState("none");
  const [info, setInfo] = useState({}); // Default to an empty object
  const [cart, setCart] = useState([]);
  const { id } = useParams();

  const username = sessionStorage.getItem("username");

  // Toggle UPI visibility
  const show = () => {
    setData(data === "none" ? "block" : "none");
  };

  // Toggle QR scanner visibility
  const show1 = () => {
    setData1(data1 === "none" ? "block" : "none");
  };

  // Fetch user data from the API
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://thippa-s-project-default-rtdb.firebaseio.com/Checkout.json"
      );
      const result = Object.values(res.data);
      let userInfo = result.find((item) => item.id === username);

      if (!userInfo && id) {
        userInfo = result.find((item) => item.id === id && item.user===username);
      }
      setInfo(userInfo || {}); // Set the first matching user or an empty object
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const getCart = async () => {
    try {
      if (id === username) {
        const res1 = await axios.get("https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata.json");
        const cartData = Object.values(res1.data);
        setCart(cartData.filter((item) => item.id === username));
      } else {
        const res2 = await axios.get("https://thippa-s-project-default-rtdb.firebaseio.com/Buy.json");
        const cartData1 = Object.values(res2.data); 
        console.log('Cart data from Buy:', cartData1);// Changed from res1 to res2
        setCart(cartData1.filter((item) => item.ProductID ===parseInt(id)  && item.id === username));
    }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  console.log(cart)
  const getTotal = () => {
    if (id === username) {
      return cart
        .reduce((sum, item) => sum + item.ProductQuantity * item.ProductPrice, 0)
        .toFixed(2);
    } else{
        const item = cart.find(item => item.ProductID === parseInt(id) && item.id === username);
    if (item) {
      return (item.ProductQuantity * item.ProductPrice).toFixed(2);
    } else {
      return '0.00'; // Or handle the case where the item is not found
    }
    
   } };
  

  // Fetch data on component mount
  useEffect(() => {
    getData();
    getCart();
  }, []);

  return (
    <>
      <Navbar />
      <div className="address">
        <h2>Delivery address</h2>
        <div>
          <h4>{info?.firstname || "First Name"} {info?.lastname || "Last Name"}</h4> 
          <p>{info?.address || "Address not available"}</p>
          <h3>{info?.phone || "Phone number not available"}</h3>
        </div>
      </div>

      <div className="bill">
        <h2 className="gbill text-danger">Order summary</h2>
        <div className="gbill">
          <p>Items Price</p>
          <p>Discount</p>
          <p>Delivery Charges</p>
          <h4 className="mt-3">Total Amount</h4>
        </div>
        <div className="gbill">
          <p>${getTotal()}</p>
          <p>$0</p>
          <p>$0</p>
          <p>${getTotal()}</p>
        </div>
        <hr className="gbill" />

        <h2 className="text-danger mt-2 gbill">Payment Method</h2>
        <div className="gbill">
          <input type="radio" id="upi" name="payment_method" onClick={show} />
          <label htmlFor="upi">UPI</label>
          <br />
          <div className="mb-4" style={{ display: data }}>
            <p>Please enter your UPI ID</p>
            <input type="text" placeholder="Enter UPI ID" />
          </div>

          <input type="radio" id="qr" name="payment_method" onClick={show1} />
          <label htmlFor="qr">QR Scanner</label>
          <br />
          <div className="mb-4" style={{ display: data1 }}>
            <p className="mt-2">This is a demo QR scanner</p>
            <img src={QR} alt="QR Code" />
          </div>
        </div>
      </div>
    </>
  );
};
