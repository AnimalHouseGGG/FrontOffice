import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const id=useParams().id;
    console.log(id);

    

    return ( 

        <div>Dettagli {id}</div>
     );
}
 
export default ProductDetails;