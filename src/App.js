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

function App() { // Creare componente Home per '/' e mettere Catalogo come componente di Home
  return (
    <Router>
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/bacheca' element={<Bacheca/>}></Route>
          <Route path='/' element={<Prodotti/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/services' element={<Servizi/>}></Route>
          <Route path='/item/:id' element={<ProductDetails/>}></Route>
          </Routes>
      
      
    </div>
    </Router>
  );
}

export default App;
