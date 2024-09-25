import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
  const username = sessionStorage.getItem('username')

  const logout =()=>{
    sessionStorage.removeItem('username')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-top fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Thippa's Book Shop </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/product">Products</Link>
        </li>
        {username?<>
          <li className="nav-item ">
          <label className='nav-link' > Hi {username}</label>
        </li>
        <li className="nav-item">
          <Link className="nav-link active " aria-current="page" to={'/Login'} onClick={logout}>Logout</Link>
        </li>
        </>:<>
        <li className="nav-item ">
          <Link className="nav-link active" aria-current="page" to={"/Login"}>Login</Link>
        </li>
       
        </>}
        <li className="nav-item">
          <Link to={`/Cart/${username}`}  className="nav-link active" aria-current="page" >Cart</Link>
        </li>
      
        
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
