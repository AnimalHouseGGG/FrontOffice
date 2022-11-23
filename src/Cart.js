import { useState } from "react";
import axios from "axios";

const Cart = () => {
    
    const isEmpty=()=>{
        if ( Array.isArray(cart) && cart.length) return false;
        else return true;
    }
    const cart=  localStorage['cart'] ? JSON.parse(localStorage['cart']) : [];
    const [address, setAddress]=useState("");
    
    const calculateTotal= ()=>{
        let tmpTotal=0;
        cart.map(e=>tmpTotal+=e.price*e.quantity)
        return tmpTotal;
    }
    const total=useState( ()=> calculateTotal());

    const emptyCart = ()=>{
        if(!isEmpty()){
            localStorage.removeItem('cart');
            window.location.reload();
        }
        else alert('already empty')
    }

    const placeOrder= async ()=>{
        
        if(!isEmpty()){
            if(address!==""){
                const user=JSON.parse(localStorage['user']).username;
                const products= cart.map( item=>(
                    JSON.stringify(item)
                ))
                const x=total[0];
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
                emptyCart();
            } else alert('please insert billing address')
        }
        else alert('empty cart')
        
    }

    //debugger
    //console.log(cart);
    const changeQty = (elemId) => (e) => {

        console.log(e.target.value);
        let tempCart=cart;
        console.log(tempCart);
        tempCart.map(elem => {
            if(elem._id===elemId && elem.quantity>0 && elem.disponibility>=parseInt(e.target.value)) elem.quantity=parseInt(e.target.value);
            return 0;
        })
        let newCart=tempCart.filter( e => e.quantity>0);
        console.log(newCart);
        localStorage['cart']=JSON.stringify(tempCart.filter( e => e.quantity>0));
        //debugger
        window.location.reload()
        
        /*tempCart.find( elem=> {
            let newCart=cart.map(elem=>{
                if (elem._id===elemId) elem.quantity=parseInt(e.target.value);
                
            })
            
            if(elem._id===elemId && elem.quantity>0) elem.quantity=e.target.value;
            else if(elem._id===elemId && elem.quantity===0)tempCart
            
        })*/
    }
    


    
    return ( 
        <div className="container">
            
           {localStorage['cart'] !== '[]' && localStorage['cart']!== undefined ? cart.map( elem => (

                <div>
            <div>{elem.name}</div>
            <div>Categoria: {elem.category}</div>
            <div>{elem.description}</div>
            <div>Disponibilità: {elem.disponibility}</div>
            <div>Quantità: {elem.quantity}</div>
            <input id={"elem-" + elem._id} type="number" step="1" value={elem.quantity} onChange={changeQty(elem._id)}></input>
            <div>Prezzo: {elem.price}€</div>
            <div>Subtotale: {elem.price*elem.quantity}€</div>
            
            <br></br>

            <div>Totale: {total}€</div>
                </div>
           )) : <div>Cart is Empty</div>}

            <label>Indirizzo di spedizione</label>
           <input type='text' value={address} onChange={e=>setAddress(e.target.value)}></input>
           <br></br>
           <button type="button" onClick={emptyCart}>Empty Cart</button>
           <button type='submit' onClick={placeOrder}>Place Order</button>
        </div>
     );
}
 
export default Cart;