import "./Navbar.css"
import { Link } from 'react-router-dom';
import LoginUtils from "./LoginUtils";

const Navbar = () => {
    /*return ( 
        <nav className="navbar">
                    <li>    <Link to="/">Home</Link>   </li>
                    <li>    <Link to="/">Contacts</Link>   </li> 
                    <li>    <Link to="/">About</Link>   </li> 
        </nav>
     );*/
     return (
        <nav className="navbar">
      <a href="/"> <h1>Animal house</h1> </a>
      <div className="links">
        <Link to="/">Prodotti</Link>
        <Link to='/services'>Servizi</Link>
        <Link to='/bacheca'>Bacheca</Link>
        {!LoginUtils.isLoggedIn() ? 
        <Link to="/user" style={{ 
          color: 'white', 
          backgroundColor: 'green',
          borderRadius: '8px' 
        }}>Login</Link>
        :
        <Link to='/user'>User</Link>
      }
      {
        LoginUtils.isLoggedIn() ? 
        <Link onClick={LoginUtils.logout} to="/" style={{ 
          color: 'white', 
          backgroundColor: 'green',
          borderRadius: '8px' 
        }}>Logout</Link>
        :
        <div></div>
      }
      </div>
    </nav>
     )
}
 //remove line 24
export default Navbar;