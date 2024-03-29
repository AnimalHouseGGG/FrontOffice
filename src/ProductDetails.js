import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as bootstrap from 'bootstrap';

const ProductDetails = (props) => {
    const { state } = useLocation();
    const item=state.item;
    const [qty, setQty] = useState(1);

    const available= item.disponibility>0;
    const handleAddToCart= (e)=>{
        e.preventDefault();
        if( item.disponibility>=qty){
            props.addToCart(item, qty)
        }
        else if(!available){
            var toastEl=document.getElementById("unavailable");
            var toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
        else {
            var toastEl=document.getElementById("toomany");
            var toast = new bootstrap.Toast(toastEl);
            toast.show();

    toast.show()
        }
    }


    return ( 

        <div className="card m-5 p-3">
            <div className="card-img-top"> <img src={item.img} alt="immagine prodotto"></img></div> 
            <hr></hr>
            <div className="card-body">
                <p>{item.name.replaceAll("-", " ")}</p>
                <hr></hr>
                <p>Categoria: {item.category}</p>
                <hr></hr>
                <p>{item.description}</p>
                <hr></hr>
                <p>Prezzo: {item.price}€</p>
                <hr></hr>
                <div>{ available ? <p> Quantità: {item.disponibility}</p> : <p>Prodotto non disponibile</p>}</div>
                {
                    available ? <>
                    <br></br>
                    <input className="form-control" class="ml-5" type="number" value={qty} required step="1" min="1" onChange={ e => setQty(e.target.value)} style={{maxWidth: '50px'}}></input>
                    <br></br>
                    <br></br>
                    <button className="btn btn-warning" onClick={handleAddToCart} style={{maxWidth: '200px', margin: '5px'}}>Aggiungi al carrello</button>
                        </> : ""
                }
            </div>
            
            
            

            {/* toasts */}
            <div className="toast-container position-absolute p-3 top-0 end-0">
                <div id="toomany" class="toast align-items-center text-white bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <p>Prodotto non disponibile in questa quantità</p> 
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>

                <div id="unavailable" class="toast align-items-center text-white bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <p>Prodotto non disponibile</p> 
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>

                <div id="inserito" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            <p>Prodotto inserito correttamente nel carrello</p> 
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default ProductDetails;