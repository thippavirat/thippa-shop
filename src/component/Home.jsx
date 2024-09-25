import React from 'react'
import Navbar from './navbar/Navbar'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const id = sessionStorage.getItem('username');
  const navigate = useNavigate()


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
  // console.log(Products)
  
  
  
    const Card = (props) => {
        return(
        <div className="card cards" >
          <img src={props.img} className="card-img-top cardimg m-2" style={{width:'90%', height:'40%'}} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">${props.ProductPrice}</p>
            <div className='d-flex justify-content-around'>
          <button onClick={()=>buy(props.Productname, props.Productprice,props.id) } className="btn btn-primary ">Buy Now</button>
            <button onClick={() => addToCart(props.Productname, props.Productprice, props.id)} className="btn btn-secondary">Add to Cart</button>
            </div>

          </div>
        </div>
        )
      };

  return (
    <>
    <div className='home'>
      <Navbar/>
      <div className="h">
        <div className="hgird">
             <h4 style={{color:'purple'}}>Welcome To</h4>
             <h2 style={{marginLeft:'15px'}}> Thippa's Book shop</h2>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum perferendis nesciunt maxime consectetur nostrum, vero asperiores sunt ea repellendus enim sapiente deserunt voluptates quaerat similique tempora! Deserunt praesentium rem voluptas!</p>
             <Link to='product' className='hbtn'> Lets Shop</Link>
        </div>
        <div className="hgrid">
            <img src="https://th.bing.com/th/id/OIP.zGVPqiYhrWe62V6YukbxFAHaEK?rs=1&pid=ImgDetMain" alt="book image" />
        </div>
      </div>
    </div>
    <div className="mid">
      
        <div className="mgrid">
            <img src="https://www.babelio.com/users/AVT_Arnold-Lobel_9032.jpg" alt="author pic" />
        </div>
        <div className="mgrid">
            <h3>“Books to the ceiling, Books to the sky, My pile of books is a mile high. How I love them! How I need them! I’ll have a long beard by the time I read them.” - Arnold Lobel</h3>
        </div>
    </div>
    <div style={{height:'500px'}} >
        <h6 style={{ textAlign: "center", marginTop: "10px" }}>
          
          HERE CHECK OUT
        </h6>
        <h1>Our Feature Products</h1>
        <Card id='1' img="https://covers.audiobooks.com/images/covers/full/9781664930568.jpg" name='Autobiography of a Yogi' ProductPrice="270" />
       
        
        <Link to="/Product"  className="btnn2">
          See all Products
        </Link>
      </div>
      <footer style={{backgroundColor:'#07274f', display:'flex',width:'100%' ,height:'450px',justifyContent:'center'}}>
      <div className="footer">

      <div className="fgrid">
        <h5>Thippa's shop</h5>
      </div>
      <div className="fgrid">
        <h5>Follow</h5>
      </div>
      <div className="fgrid">
        <h5> contact</h5>
      </div>
      <div className="fgrid">
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid at officia fugiat consequatur accusantium libero! Debitis, magnam libero.</h5>
      </div>
      <div className="fgrid">
       <Link to="https://www.instagram.com/thippa_18/" ><i className="fa-brands fa-instagram "></i></Link>
       <Link >
       <i className="fa-brands ms-3 fa-linkedin"></i></Link>
      </div>
      <div className="fgrid">
        <p>9380774117</p>
        <p>thippakohli@gmail.com</p>
      </div>
      <hr /><hr /><hr />
      <div className="fgrid">
        <p>© 2024 Thippa cart. All rights reserved.</p>
      </div>
      <div className="fgrid">
      <p>Privacy Policy</p>
      <p>terms and conditions</p>
      </div>
     
      </div>

     </footer>

    </>
  )
}

export default Home
