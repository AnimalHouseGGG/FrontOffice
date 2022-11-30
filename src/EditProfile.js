import axios from "axios";
import { useState } from "react";
//import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';  
import * as bootstrap from "bootstrap";


const EditProfile = () => {
    
    const navigate = useNavigate();
    //const {state}=useLocation();
    const user=JSON.parse(localStorage['user']);
    //console.log(user);
    
    const [newUsername, setNewUsername]=useState("");
    
    const [newPassword, setNewPassword]=useState("");
    const [currpsw, setCurrpsw]=useState("");
    const [confirmPsw, setConfirmPsw]=useState("")
    
    const [animals, setAnimals]=useState(user.animal.toString());
    const [name, setName]=useState("");
    const [surname, setSurname]=useState("");
    const [born, setBorn]=useState("");
    
    const handleSubmit= async ()=>{
        const url="https://site212216.tw.cs.unibo.it/client/update"
        const newusername=newUsername;
        const newname=name;
        const newsurname=surname;
        const newpassword=newPassword;
        const newborn=born;
        const newanimals=animals;
        const body={}
        body.name=user.username;
        if(newusername!==user.username) body.username=newusername;
        if(newname!==user.name) body.newName=newname;
        if(newsurname!==user.surname) body.surname=newsurname;
        if(newborn!==user.born) body.born=newborn;
        if(newanimals!==user.animal) body.animal=newanimals.split(',');
        body.currpsw=currpsw;
        body.newpsw=newpassword;
        console.log(body);
        if(newpassword==="" | newPassword===confirmPsw){
            await axios.post(url, body).then(res=>console.log(res));
            navigate("/user");
            //window.location.replace("front/user")
        }
        else{
            var toastEl=document.getElementById("password");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
        }
    }
    console.log(user.password);
    return ( 
        <div className="card m-5 p-3">

            <form>
            <label>
                Name:
                <input type="text" value={name} onChange={e=>setName(e.target.value)} name="name" />
            </label>
            <br></br>
            <label>
                Surname:
                <input type="text" value={surname} onChange={e=>setSurname(e.target.value)} name="surname" />
            </label>
            <br></br>
            <label>
                Username:
                <input type="text" value={newUsername} onChange={e=>setNewUsername(e.target.value)}  name="username" />
            </label>
            <br></br>
            <label>
                Current Password:
                <input type="password" name="currpsw" onChange={e=>setCurrpsw(e.target.value)}/>
            </label>
            <br></br>
            <label>
                New Password:
                <input type="password" name="newpsw" onChange={e=>setNewPassword(e.target.value)} />
            </label>
            <br></br>
            <label>
                Confirm new Password:
                <input type="password" name="newpswconf" onChange={e=>setConfirmPsw(e.target.value)}/>
            </label>
            <br></br>
            <label>
                Favourite animals:
                <input type="text" name="favanimals" value={animals} onChange={e=>setAnimals(e.target.value)} />
            </label>
            <br></br>
            <label>
                Born date:
                <input type="date" name="borndate" onChange={e=>setBorn(e.target.value)}></input>
            </label>
            <br></br>
            </form>
            <button onClick={handleSubmit}>Save changes</button>
        </div>
     );
}
 
export default EditProfile;