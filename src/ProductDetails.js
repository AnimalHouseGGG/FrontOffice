import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = (props) => {
    const { state } = useLocation();
    const item=state.item;
    const [qty, setQty] = useState(1);

    const available= item.disponibility>0;
    console.log(available);
    const handleAddToCart= (e)=>{
        e.preventDefault();
        if( item.disponibility>=qty)
        props.addToCart(item, qty)
        else alert('product not available in that qty')
    }


    return ( 

        <div className="container">
            <div> <img src={item.img} alt="immagine prodotto"></img></div> 
            <hr></hr>
            <div>{item.name}</div>
            <hr></hr>
            <div>Categoria: {item.category}</div>
            <hr></hr>
            <div>{item.description}</div>
            <hr></hr>
            <div>Prezzo: {item.price}</div>
            <hr></hr>
            <div>{ available ? <div> Quantità: {item.disponibility}</div> : <div>Product unavailable</div>}</div>
            <button onClick={handleAddToCart}>Add</button>
            
            <input type="number" value={qty} required step="1" min="1" onChange={ e => setQty(e.target.value)}></input>
        </div>
     );
}
 
export default ProductDetails;