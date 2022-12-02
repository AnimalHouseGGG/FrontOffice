import { Link } from "react-router-dom";

const CatalogoCuccioli = ({pets}) => {
     return (
      <div className="container items-list">
         {pets.map( pet => (
             <div className="card itemcard text-center m-3" style={{width: '18rem'}} key={pet._id}>
             <img className="card-img-top" src={pet.img} alt="animal"></img>
             <div className="card-body">
               <h5 className="card-title">{pet.name}</h5>
               <p className="card-text">Specie: {pet.specie}</p>
               <p className="card-text">Prezzo: {pet.price}€</p>
               <Link className="btn btn-primary" to={"/pet/"+pet._id} state={{pet}}> Details </Link>
             </div>
           </div>
         ))}
        </div> 
      );
}
 
export default CatalogoCuccioli;