import React, { useState } from 'react'
import Navbar from './navbar/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
const [username,setusername]=useState('')
const [password,setpassword]=useState('')
const navigation=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
      if(username!==''&&password!==''){
         const res=await  fetch('https://thippa-s-project-default-rtdb.firebaseio.com/Userdata.json')
               const data = await res.json()
               const detail=Object.values(data)
         
                 const user = detail.find((item)=>item.id===username)
                 console.log(user)
          if(!user){
            Swal.fire({
              title:'user not found',
              text:"please enter valid username",
              icon:'warning',
              timer:2000
            })
              return;
          }
          if (user.password !== password) {
            Swal.fire({
              title: 'Wrong Password',
              text: "Please enter the correct password",
              icon: 'warning',
              timer: 2000,
            });
          } else {
            Swal.fire({
              title: 'Successfully Logged In',
              text: "You have successfully logged in",
              icon: 'success',
              timer: 2000,
            });
            sessionStorage.setItem('username', username);

            navigation('/product')
          }
                
      }
  
  else{
    Swal.fire({
      title:"manditatory",
      text:"please enter all the fields",
      icon:'error',
      timer:2000
     })
  }
}

  return (
    <div>
        <Navbar/>
        <div className="signup-container">
      <h2>Login</h2>
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

       <div>
        <p>Dont have account? <Link to='/signup' className='text-decoration-none'>Signup</Link></p>
       </div>

        <button type="submit" className='sbtn'>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
