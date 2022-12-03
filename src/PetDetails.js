import { Link, useLocation } from "react-router-dom";

const PetDetails = () => {
    const { state } = useLocation();
    const pet=state.pet;

    return ( 

        <div className="card m-5 p-3">
            <div> <img src={pet.img} alt="immagine prodotto"></img></div> 
            <hr></hr>
            <div>{pet.name}</div>
            <hr></hr>
            <div>Specie: {pet.specie}</div>
            <hr></hr>
            <div>Età: {pet.age}</div>
            <hr></hr>
            <div>Sesso: {pet.sex}</div>
            <hr></hr>
            {pet.medical_condition && <div>Condizione medica: {pet.medical_condition}</div>}
            <hr></hr>
            <div>Prezzo: {pet.price}€</div>
            <hr></hr>
            <Link to={'/checkout'} state={pet}><button className="btn btn-warning">Acquista questo cucciolo</button></Link>
            
        </div>
     );
}
 
export default PetDetails;