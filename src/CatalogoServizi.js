import { Link } from "react-router-dom";


const CatalogoServizi = ({services}) => {

     return (
       <div className="services-list" style={{ display: 'flex'}}>
        {services.map( service => (
            <div class="card" style={{width: 288}}>
            <img class="card-img-top" src={service.img} alt="service"></img>
            <div class="card-body">
              <h5 class="card-title">{service.name}</h5>
              <p class="card-text">Categoria: {service.category}</p>
              <Link class="btn btn-primary" to={"/service/"+service._id} state={{service}}> Details </Link>
            </div>
          </div>
        ))}
       </div> 
     );
}
 
export default CatalogoServizi;