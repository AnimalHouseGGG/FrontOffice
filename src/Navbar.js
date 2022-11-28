import "./Navbar.css"
import { Link } from 'react-router-dom';
import LoginUtils from "./LoginUtils";
import {FaShoppingCart }from 'react-icons/fa';

const Navbar = () => {

    const style={ 
      color: 'white', 
      backgroundColor: 'green',
      borderRadius: '8px' 
    }
    
     return (
      <div className="container navbarcontainer">
        <nav className="navbar">
      <a href="/"> <h1>Animal house</h1> </a>
      <div className="links">
        <Link to="/" style={style}>Prodotti</Link>
        <Link to='/services' style={style}>Servizi</Link>
        <Link to='/pets' style={style}>Cuccioli</Link>
        <Link to='/bacheca' style={style}>Bacheca</Link>
        {!LoginUtils.isLoggedIn() ? 
        <Link to="/user" style={style}>Login</Link>
        :
        <Link to='/user' style={style}>User</Link>
      }
      {
        LoginUtils.isLoggedIn() ? 
        <Link onClick={LoginUtils.logout} to="/" style={style}>Logout</Link>
        :
        <div></div>
      }{
        LoginUtils.isLoggedIn() ? <Link to='/cart' style={style}>
          <FaShoppingCart></FaShoppingCart>
        </Link> : <div></div>
      }
      
      </div>
    </nav>
    </div>
     )
}

export default Navbar;