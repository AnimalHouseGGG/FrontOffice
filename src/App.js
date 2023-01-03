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
import Orders from './Orders';
import EditProfile from './EditProfile';
import Bookings from './Bookings';
import Pets from './Pets';
import PetDetails from './PetDetails';
import Checkout from './Checkout';
import MyAnimals from './MyAnimals';
import * as bootstrap from "bootstrap";
import 'bootstrap/dist/js/bootstrap.bundle';

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
            if(e.disponibility>=parseInt(e.quantity)+parseInt(qty))
            {
              e.quantity=parseInt(e.quantity)+parseInt(qty);
              var toastEl=document.getElementById("inserito");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
            }
            else {
              var toastEl=document.getElementById("toomany");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
            }
          }
          return 0;
        });
      }
      else {
        tempCart.push(product);
        var toastEl=document.getElementById("inserito");
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
      
      console.log(tempCart);
      localStorage['cart']=JSON.stringify(tempCart);
      
      
      
    }else{
      var toastEl=document.getElementById("notlogged");
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
  }

  return (
    <>
    <Router basename='/front'>
    <div className="App container">
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
          <Route path='/myOrders' element={<Orders></Orders>}></Route>
          <Route path='/edit' element={<EditProfile></EditProfile>}></Route>
          <Route path='/myBookings' element={<Bookings></Bookings>}></Route>
          <Route path='/checkout' element={<Checkout></Checkout>}></Route>
          <Route path='/myAnimals' element={<MyAnimals></MyAnimals>}></Route>
          </Routes> 
    </div>
    </Router>
    <div className='toast-container position-absolute p-3 top-0 end-0'>

      <div id="notlogged" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore prima effettua il login</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="billing" class="toast align-items-center text-white bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore inserisci un Indirizzo di spedizione</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="password" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore controlla di aver inserito correttamente la nuova password</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="fields" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore controlla di aver inserito correttamente tutti i campi</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service1" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Non puoi prenotare negli orari selezionati perché la fine del servizio è oltre l'orario di chiusura</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service2" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore seleziona una data di fine</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service3" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Gli orari selezionati si sovrappongono ad altre prenotazioni</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service4" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Il periodo selezionato si sovrappone ad altre prenotazioni</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service5" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Per favore seleziona una data di fine</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

      <div id="service6" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Errore nella prenotazione</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>


      <div id="incorrect" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                          <div class="d-flex">
                              <div class="toast-body">
                                  <p>Password non corretta</p> 
                              </div>
                              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                          </div>
      </div>

    </div>
    </>
  );
}

export default App;
