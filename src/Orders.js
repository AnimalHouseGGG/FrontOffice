import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const Orders =  () => {

    const [myOrders, setMyOrders]=useState([]);
    
    const {state}=useLocation();
    const user=state;
    const url="https://site212216.tw.cs.unibo.it/order/"+user;

    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get(url); 
                setMyOrders(res.data);
                //localStorage['user']=JSON.stringify(res.data[0]);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [url]);
    
    //const orders= await axios.get(url).then(res=>console.log(res))
    console.log("done");
    return ( 
        <div className="card m-5 p-5" style={{  backgroundColor: '#f8d09f'}}>
            <h3 className="mb-5"><strong>Ordini di: {user}</strong></h3>
            {myOrders && myOrders.map( order=>(
                <div key={order._id}>
                <p>Ordine #{order._id}</p>
            <div className="mt-3"> {
                order.products.map( product => (
                    <>
                    <div key={JSON.parse(product)._id}>
                    <div> <strong>{JSON.parse(product).name}</strong></div>
                    {JSON.parse(product).category && <div> Categoria: {JSON.parse(product).category}</div>}
                    {JSON.parse(product).specie && <div> Specie: {JSON.parse(product).specie}</div>}
                    {JSON.parse(product).age && <div> Età: {JSON.parse(product).age} mesi</div>}
                    {JSON.parse(product).sex && <div> Sesso: {JSON.parse(product).sex}</div>}
                    <div> {JSON.parse(product).description}</div>
                    <div>Prezzo: {JSON.parse(product).price}€</div>
                    </div>
                    <br></br>
                    </>
                ))
                }</div>
            <div>Totale ordine: {order.total}€</div>
            <hr></hr>
            </div>
        ))}
        </div>
     );
}
 
export default Orders;