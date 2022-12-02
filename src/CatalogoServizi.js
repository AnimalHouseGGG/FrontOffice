import { Link } from "react-router-dom";


const CatalogoServizi = ({services}) => {

     return (
       <div className="container items-list">
        {services.map( service => (
            <div className="card itemcard text-center m-3" style={{width: '18rem'}} key={service._id}>
            <img className="card-img-top" src={service.img} alt="service"></img>
            <div className="card-body">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">Categoria: {service.category}</p>
              <p className="card-text">Prezzo: {service.price}€</p>
              <Link className="btn btn-primary" to={"/service/"+service._id} state={{service}}> Details </Link>
            </div>
          </div>
        ))}
       </div> 
     );
}
 
export default CatalogoServizi;