import "./Navbar.css"
import { Link } from 'react-router-dom';
import LoginUtils from "./LoginUtils";
import {FaShoppingCart }from 'react-icons/fa';
import { useState } from "react";

const Navbar = () => {

  const [collapsed, setCollapsed]=useState(true);

  const setCollapse=()=>{
    if(!collapsed){
      document.getElementById("navbarNav").classList.remove("show");
    }
    else{
      document.getElementById("navbarNav").classList.add("show");
    }
    setCollapsed(!collapsed);
    

  }

    const style={ 
      color: 'white', 
      backgroundColor: '#e8a87c',
      borderRadius: '8px' 
    }
    
     return (

      <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/front"><strong>Animal house</strong></a>
    <button class="navbar-toggler" type="button"  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setCollapse()}>
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item mb-2 mt-2">
          <Link to="/" style={style}>Prodotti</Link>
        </li>
        <li class="nav-item mb-2 mt-2">
          <Link to='/services' style={style}>Servizi</Link>
        </li>
        <li class="nav-item mb-2 mt-2">
          <Link to='/bacheca' style={style}>Bacheca</Link>
        </li>
        <li class="nav-item mb-2 mt-2">
            {!LoginUtils.isLoggedIn() ? 
            <Link to="/user" style={style}>Login</Link>
            :
            <Link to='/user' style={style}>User</Link>
            }
        </li>
        <li class="nav-item mb-2 mt-2">
          {
          LoginUtils.isLoggedIn() ? 
          <Link onClick={LoginUtils.logout} to="/" style={style}>Logout</Link>
          :
          <div></div>
          }
        </li>
        <li class="nav-item mb-2 mt-2">
          {
          LoginUtils.isLoggedIn() ? <Link to='/cart' style={style}>
            <FaShoppingCart></FaShoppingCart>
          </Link> : <div></div>
          }
        </li>

      </ul>
    </div>
  </div>
</nav>














        
     )
}

export default Navbar;