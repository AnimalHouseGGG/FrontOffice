import { useState } from "react";

const Cart = () => {

    const calculateTotal= ()=>{
        let tmpTotal=0;
        cart.map(e=>tmpTotal+=e.price*e.quantity)
        return tmpTotal;
    }

    const emptyCart = ()=>{
        localStorage.removeItem('cart');
        window.location.reload();
    }

    //debugger
    const cart=  localStorage['cart'] ? JSON.parse(localStorage['cart']) : [];
    console.log(cart);
    const total=useState( ()=> calculateTotal());
    const changeQty = (elemId) => (e) => {

        console.log(e.target.value);
        let tempCart=cart;
        console.log(tempCart);
        tempCart.map(elem => {
            if(elem._id===elemId && elem.quantity>0) elem.quantity=parseInt(e.target.value);
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
            <div>Quantità: {elem.quantity}</div>
            <input id={"elem-" + elem._id} type="number" step="1" value={elem.quantity} onChange={changeQty(elem._id)}></input>
            <div>Prezzo: {elem.price}€</div>
            <div>Subtotale: {elem.price*elem.quantity}€</div>
            
            <br></br>

            <div>Totale: {total}€</div>
                </div>
           )) : <div>Cart is Empty</div>}
           <button type="button" onClick={emptyCart}>Empty Cart</button>
        </div>
     );
}
 
export default Cart;