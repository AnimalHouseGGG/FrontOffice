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
                <input class="form-control" type="text" value={name} onChange={e=>setName(e.target.value)} name="name" />
            </label>
            <br></br>
            <label>
                Surname:
                <input class="form-control" type="text" value={surname} onChange={e=>setSurname(e.target.value)} name="surname" />
            </label>
            <br></br>
            <label>
                Username:
                <input class="form-control" type="text" value={newUsername} onChange={e=>setNewUsername(e.target.value)}  name="username" />
            </label>
            <br></br>
            <label>
                Current Password:
                <input class="form-control" type="password" name="currpsw" onChange={e=>setCurrpsw(e.target.value)}/>
            </label>
            <br></br>
            <label>
                New Password:
                <input class="form-control" type="password" name="newpsw" onChange={e=>setNewPassword(e.target.value)} />
            </label>
            <br></br>
            <label>
                Confirm new Password:
                <input class="form-control" type="password" name="newpswconf" onChange={e=>setConfirmPsw(e.target.value)}/>
            </label>
            <br></br>
            <label>
                Favourite animals:
                <input class="form-control" type="text" name="favanimals" value={animals} onChange={e=>setAnimals(e.target.value)} />
            </label>
            <br></br>
            <label>
                Born date:
                <input class="form-control" type="date" name="borndate" onChange={e=>setBorn(e.target.value)}></input>
            </label>
            <br></br>
            </form>
            <div className="text-center">
            <button class="btn w-25 p-3 border border-2 border-dark" onClick={handleSubmit}>Save changes</button>
            </div>
        </div>
     );
}
 
export default EditProfile;