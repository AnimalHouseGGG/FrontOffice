import { Link } from "react-router-dom";


const CatalogoServizi = ({services}) => {

     return (
       <div className="services-list" style={{ display: 'flex'}}>
        {services.map( service => (
            <div className="card" style={{width: 288}} key={service._id}>
            <img className="card-img-top" src={service.img} alt="service"></img>
            <div className="card-body">
              <h5 className="card-title">{service.name}</h5>
              <p className="card-text">Categoria: {service.category}</p>
              <Link className="btn btn-primary" to={"/service/"+service._id} state={{service}}> Details </Link>
            </div>
          </div>
        ))}
       </div> 
     );
}
 
export default CatalogoServizi;