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
        <div><Link to="/myOrders" state={user.username}>My orders</Link></div>
    </div> );
}
 
export default User;