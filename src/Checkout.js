import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {

    const state=useLocation();

    const pet=state.state;

    const [address, setAddress]=useState("");

    const placeOrder= async ()=>{
        
        if(address!==""){
                const user=JSON.parse(localStorage['user']).username;
                pet.quantity=0;
                pet.disponibility=0;
                pet.price=10;
                const products=[JSON.stringify(pet)];
                
                const x=pet.price;
                const url="https://site212216.tw.cs.unibo.it/order/"
                const body={
                    client: user,
                    products: products,
                    address: address,
                    total: x,
                    state: "in progress"
                }
                const headers={
                    headers: {
                        authority: localStorage['accessToken']
                    }
                }
                await axios.post(url, body, headers).then( res=> console.log(res))
        } else alert('please insert billing address')
    }
        


    return ( 
        <div className="container">
            
            <form>
            <label>Indirizzo di spedizione</label>
                <input type='text' value={address} onChange={e=>setAddress(e.target.value)}></input>
            </form>
            <button onClick={placeOrder}>Compra</button>
        </div>
     );
}
 
export default Checkout;