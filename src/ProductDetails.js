import { useLocation } from "react-router-dom";

const ProductDetails = () => {

    const { state } = useLocation();
    const item=state.item;
    console.log(item);



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
            <div>{item.disponibility}</div>
        </div>
     );
}
 
export default ProductDetails;