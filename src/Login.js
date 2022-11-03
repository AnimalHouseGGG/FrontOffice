import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "https://site212216.tw.cs.unibo.it"
const ACCESS_TOKEN_STORAGE = 'accessToken';



const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const navigate = useNavigate();


  
  
  
  async function setToken(token){
      localStorage[ACCESS_TOKEN_STORAGE] = token;
      let myObj = JSON.parse(atob(token.split('.')[1]));
      localStorage['userId'] = myObj.id; 
  }
  
  const handleLogin= async e=>{
    e.preventDefault();
      let data = {}
      data.username = username;
      data.psw = password;
      data.role="customer";
  
      //console.log(data);
      let urlLogin=url+"/login/users";
      
     
      await axios.post(urlLogin, data).then( async res=> {
        setToken(res.data["authority"]);
        let userId=localStorage['userId'];
        let urlUser=url+"/client/"+userId;
        await axios.get(urlUser).then( res => {
          localStorage['user']=JSON.stringify(res.data[0])
        }).then( ()=> window.location.reload())
      }).catch(e=>console.log(e.response.data.message));
      
      
  }
    

    

    return ( 
        <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input 
          type="text" 
          required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        
        <button type="submit">Login</button>
        <br></br>
        <Link to="/register">Non sei ancora registrato? Clicca qui</Link>
      </form>
    </div>
     );
}


 
export default Login;
