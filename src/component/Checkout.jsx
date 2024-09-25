import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';
import Navbar from './navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'; // Make sure Swal is properly imported

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const [productdata, setData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    id: id,
    user:username
  });

  const update = (e) => {
    const { name, value } = e.target;
    setData({
      ...productdata,
      [name]: value,
    });
  };

  const upload = async (e) => {
    e.preventDefault(); // Prevent form reload
    const { firstname, lastname, phone, address } = productdata;

    // Validate fields
    if (firstname && lastname && phone && address) {
      try {
        await axios.post("https://thippa-s-project-default-rtdb.firebaseio.com/Checkout.json", productdata);

        Swal.fire({
          title: 'Info added',
          text: 'Now you can proceed to buy',
          icon: 'success',
          timer: 2000,
        });

        // Navigate based on the ID and username comparison
        if (id === username) {
          navigate(`/bill/${username}`); // Navigate to bill with username
        } else {
          navigate(`/bill/${id}`); // Navigate to bill with id
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred. Please try again.',
          icon: 'error',
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        title: 'Mandatory',
        text: 'Please enter all the fields',
        icon: 'error',
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <form onSubmit={upload} noValidate>
          <h2>Checkout</h2>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            onChange={update}
            placeholder="Your first name.."
            required
          />

          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            onChange={update}
            placeholder="Your last name.."
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={update}
            placeholder="Your phone number.."
            required
          />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Your address.."
            onChange={update}
            required
          />

          <div className="d-flex mt-3 justify-content-around">
            <Link to={"/Product"} className="btn btn-success">Go Back</Link>
            <button type="submit" className="btn btn-primary">Checkout</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
