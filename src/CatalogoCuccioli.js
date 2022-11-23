import { Link } from "react-router-dom";

const CatalogoCuccioli = ({pets}) => {
     return (
        <div className="pets-list" style={{ display: 'flex'}}>
         {pets.map( pet => (
             <div className="card text-center" style={{width: 288}} key={pet._id}>
             <img className="card-img-top" src={pet.img} alt="animal"></img>
             <div className="card-body">
               <h5 className="card-title">{pet.name}</h5>
               <p className="card-text">Specie: {pet.specie}</p>
               <Link className="btn btn-primary" to={"/pet/"+pet._id} state={{pet}}> Details </Link>
             </div>
           </div>
         ))}
        </div> 
      );
}
 
export default CatalogoCuccioli;