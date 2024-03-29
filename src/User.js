import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";


const User = () => {
    const [user, setUser]=useState({});
    const currUsr=localStorage['userId'];
    const url= 'https://site212216.tw.cs.unibo.it/client/'+currUsr;
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get(url); 
                res.data[0].born=res.data[0].born.slice(0,10);
                setUser(res.data[0]);
                localStorage['user']=JSON.stringify(res.data[0]);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [url]);
    
    
    const src='https://site212216.tw.cs.unibo.it/front/'+user._id+'.png';

    return ( <div>

            <div class="card m-3" style={{maxWidth: '540px'}}>
            <div class="row g-0">
                <div class="col-md-4 card-img-top">
                <img src={src} onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://site212216.tw.cs.unibo.it/front/noimg.png";
                    }}  
                    class="img-fluid rounded-start" alt="profile_picture">
                </img>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{user.name} {user.surname}</h5>
                        <p>{user.username}</p>
                        Nato il: {user.born}<br></br>
                        Animali preferiti: { user.animal && user.animal.join()}<br></br>
                        <div><Link to="/myOrders" state={user.username}>I miei ordini</Link></div>
                        <div><Link to="/myBookings" state={user.username}>Le mie prenotazioni</Link></div>
                        <div><Link to="/myAnimals" state={user.username}>I miei animali</Link></div>
                        <br></br>
                        <div><Link to="/edit">Modifica profilo</Link></div>
                </div>
                </div>
            </div>
            </div>
        
    </div> );
}
 
export default User;