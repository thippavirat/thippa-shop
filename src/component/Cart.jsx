import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Navbar } from '../Navbar/Navbar';
// import axios from 'axios';

// import '../../App.css';
// import { useParams, Link, useNavigate } from 'react-router-dom';

 const Cart = () => {
    const [items, setItems] = useState([]);
    const { id } = useParams();
    const username = sessionStorage.getItem('username');
    const navigate = useNavigate(); // to programmatically navigate

    const getData = async () => {
      try {
          const resp = await axios.get('https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata.json');
          if (resp.data) {
              const fetchedItems = Object.keys(resp.data).map(key => ({
                  ...resp.data[key],
                  firebaseKey: key // Store the Firebase key
              }));
              setItems(fetchedItems);
          }
      } catch (error) {
          console.error("Error fetching cart data:", error);
      }
  };
  

    useEffect(() => {
        getData();
    }, []);

    const handleQuantityChange = (ProductID, newQuantity) => {
        setItems(items.map(item =>
            item.ProductID === ProductID ? { ...item, ProductQuantity: newQuantity } : item
        ));
    };

    const handleRemove = async (firebaseKey) => {
      try {
          // Deleting the item from the backend
          const itemUrl = `https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata/${firebaseKey}.json`;
          await axios.delete(itemUrl);

          // Updating the state after successful deletion
          setItems(items.filter(item => item.firebaseKey !== firebaseKey));
      } catch (error) {
          console.error("Error removing item:", error);
      }
  };

    const getTotal = () => {
        return items
            .filter(item => item.id === username)
            .reduce((sum, item) => sum + item.ProductQuantity * item.ProductPrice, 0)
            .toFixed(2);
    };

    // Function to update the cart items in the backend
    const updateCart = async () => {
        const userItems = items.filter(item => item.id === username);
           
        try {
            const updates = userItems.map(async (item) => {
                // Assuming `ProductID` is used as the key in Firebase
                const itemUrl = `https://thippa-s-project-default-rtdb.firebaseio.com/Cartdata/${item.firebaseKey}.json`;
                return axios.patch(itemUrl, {
                    ProductQuantity: item.ProductQuantity,
                });
            });

            // Wait for all the updates to complete
            await Promise.all(updates);
            console.log('Cart updated successfully');
        } catch (error) {
            console.error("Error updating cart data:", error);
        }
    };

    const handleCheckout = async () => {
        await updateCart();  // Update cart in the backend
        navigate(`/CheckOut/${username}`);  // Redirect to checkout
    };

    return (
        <>
            <Navbar />
            <div className="cart">
                <h1>Shopping Cart</h1>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                if (item.id === username) {
                                    return (
                                        <tr key={index}>
                                            <td>{item.ProductName}</td>
                                            <td>
                                                <input
                                                    className='qnt'
                                                    type="number"
                                                    value={item.ProductQuantity}
                                                    min="1"
                                                    onChange={(e) => handleQuantityChange(item.ProductID, parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>${item.ProductPrice.toFixed(2)}</td>
                                            <td>${(item.ProductQuantity * item.ProductPrice).toFixed(2)}</td>
                                            <td>
                                                <button className="btnnn" onClick={() => handleRemove(item.firebaseKey)}>Remove</button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="total">
                    <h2>Total: ${getTotal()}</h2>
                    <div className="d-flex mt-3 justify-content-around">
                        <Link to={"/Product"} className="btn btn-success">Go Back</Link>
                        <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cart