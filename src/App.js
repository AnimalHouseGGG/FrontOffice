import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './Navbar';
import Prodotti from './Prodotti';
import Login from './Login';
//import Sidebar from './Sidebar';
import Servizi from './Servizi';
import Bacheca from './Bacheca';
import ProductDetails from './ProductDetails';
import ServiceDetails from './ServiceDetails';
import UserPage from './UserPage';
import RegisterPage from './RegisterPage';
import LoginUtils from './LoginUtils';
//import {useEffect,useState} from 'react';
import Cart from './Cart';

function App() { // Creare componente Home per '/' e mettere Catalogo come componente di Home

  //localStorage['cart']=JSON.stringify([]);
  

  const addToCart = (product,qty) => {
    if(LoginUtils.isLoggedIn()){

      product.quantity=qty;
      //not first insert
      let tempCart=localStorage['cart'] ? JSON.parse(localStorage['cart']) : [];
      if(tempCart.find(e=>e._id===product._id)){
        tempCart.map(e=> {  
          if(e._id===product._id) {
            e.quantity=e.quantity+parseInt(qty);
          }
          return 0;
        });
      }
      else tempCart.push(product);
      
      console.log(tempCart);
      localStorage['cart']=JSON.stringify(tempCart);
      
      
      
      alert("inserito")
    }else{
      alert('Must be logged');
    }
  }

  return (
    <Router>
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/bacheca' element={<Bacheca/>}></Route>
          <Route path='/' element={<Prodotti addToCart={addToCart}/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/services' element={<Servizi addToCart={addToCart}/>}></Route>
          <Route path='/item/:id' element={<ProductDetails addToCart={addToCart}/>}></Route>
          <Route path='/service/:id' element={<ServiceDetails addToCart={addToCart}/>}></Route>
          <Route path='/user' element={<UserPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          </Routes>
      
      
    </div>
    </Router>
  );
}

export default App;
