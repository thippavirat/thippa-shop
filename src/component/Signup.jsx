import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
 const [username ,setusername]=useState('')
 const [email ,setemail]=useState('')
 const [password ,setpassword]=useState('')
 const navigation =useNavigate()

  // State to store form data and validation errors
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  
  // });

  
  // // Handle form input changes
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
     const data ={id:username,email,password}
     if(username!==''&& email!==''&&password!==''){
      const res=axios.post("https://thippa-s-project-default-rtdb.firebaseio.com/Userdata.json",data)

      Swal.fire(
        {
          title:'successfully signup',
          text:'now you can login',
          icon:'success',
          timer:2000
        }
      )
      navigation('/login')
     } else{
     Swal.fire({
      title:"manditatory",
      text:"please enter all the fields",
      icon:'error',
      timer:2000
     })
     }
   
  }
 
  return (
    <>
    <Navbar/>
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* Username field */}
        <div>
         
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            placeholder=' enter username'
          />
        </div>

        {/* Email field */}
        <div>
         
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder=' enter email'
          />
      
        </div>

        {/* Password field */}
        <div>
          
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
             placeholder=' enter password'
          />
        </div>

       

        <button type="submit" className='sbtn' >Signup</button>
      </form>
    </div>
    </>
  );
};

export default Signup;
