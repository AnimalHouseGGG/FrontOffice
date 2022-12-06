import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';  



const RegisterPage = () => {
  const navigate = useNavigate();

    const url='https://site212216.tw.cs.unibo.it/client/';
    
    // States for registration
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] =useState('');
  const [password, setPassword] = useState('');
  const [bornDate, setBornDate] =useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
 
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the surname change
  const handleSurname = (e) => {
    setSurname(e.target.value);
    setSubmitted(false);
  };
 
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the bornDate change
  const handleBornDate = (e) => {
    setBornDate(e.target.value);
    console.log(bornDate);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || surname === '' || username === '' || password === '') {
      setError(true);
    } else {
      const body={
        name: name,
        surname: surname,
        username: username,
        password: password,
        animal: "none",
        born: bornDate
        
      }
      axios.post(url, body).then(async (res)=>{
        let img=document.querySelector("input[type='file']").files.item(0);
                if(img!==null){
                    console.log(res.data._id);
                    debugger
                    var blob=img.slice(0, img.size, 'image/*');
                    let image=new File([blob], res.data._id+'.png', {type: 'image/*'})
                    var form=new FormData();
                    form.append("file", image)
                    console.log(image);
                    await axios.post("https://site212216.tw.cs.unibo.it/image/", form, {
                        headers: {
                            enctype: 'multipart/form-data',
                            processData : false,
                            contentType: false
                        }
                    }).then( (res)=> {
                        console.log(res);
                    })
                }
      }).then( ()=> {navigate('/user')}).catch( e => {
        console.log(e);
      });
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h4>User {name} successfully registered!!</h4>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <p className="text-danger">{"Per favore riempi tutti i campi"}</p>
      </div>
    );
  };
 
  return (
    <div className="form card m-5 p-5">
      <div>
        <h1>User Registration</h1>
      </div>
 
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Name</label>
        <input onChange={handleName} className="input form-control"
          value={name} type="text" />
        <br></br>
        <label className="label">Surname</label>
        <input onChange={handleSurname} className="input form-control"
          value={surname} type="email" />
        <br></br>

        <label className="label">Username</label>
        <input onChange={handleUsername} className="input form-control"
          value={username} type="email" />
        <br></br>
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input form-control"
          value={password} type="password" />
        <br></br>

        <label className="label">Data di nascita</label>
        <input onChange={handleBornDate} className="input form-control"
          value={bornDate} type="date" />
        <br></br>
        <input className="form-control" type="file"></input>
        <br></br>
 
        <button onClick={handleSubmit} className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );

}
 
export default RegisterPage;