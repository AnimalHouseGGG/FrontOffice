import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {

    const url='https://site212216.tw.cs.unibo.it/client/';
    
    // States for registration
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] =useState('');
  const [password, setPassword] = useState('');
  const [bornDate, setBornDate] =useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
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
      setSubmitted(true);
      setError(false);
      const body={
        name: name,
        surname: surname,
        username: username,
        password: password,
        animal: "none",
        born: bornDate
        
      }
      axios.post(url, body).then(res=>console.log(res)).then( ()=> window.location.replace('/user'));
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
        <h1>User {name} successfully registered!!</h1>
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 
  return (
    <div className="form">
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
        <input onChange={handleName} className="input"
          value={name} type="text" />
 
        <label className="label">Surname</label>
        <input onChange={handleSurname} className="input"
          value={surname} type="email" />

        <label className="label">Username</label>
        <input onChange={handleUsername} className="input"
          value={username} type="email" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />

        <label className="label">Data di nascita</label>
        <input onChange={handleBornDate} className="input"
          value={bornDate} type="date" />
 
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );

}
 
export default RegisterPage;