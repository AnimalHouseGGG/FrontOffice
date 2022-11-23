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
    

    return ( <div>
        {user.name}<br></br>
        {user.surname}<br></br>
        {user.username}<br></br>
        Nato il: {user.born}<br></br>
        Animali preferiti: { user.animal && user.animal.join()}<br></br>
        <div><Link to="/myOrders" state={user.username}>My orders</Link></div>
        <div><Link to="/edit">Edit my profile</Link></div>
        <div><Link to="/myBookings" state={user.username}>My bookings</Link></div>
        <div><Link to="/myAnimals" state={user.username}>My animals</Link></div>
    </div> );
}
 
export default User;