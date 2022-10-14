const CatalogoServizi = ({services}) => {
     return (
       <div className="services-list" style={{ display: 'flex'}}>
        {services.map( service => (
            <div class="card" style={{width: 288}}>
            <img class="card-img-top" src={service.img} alt="service"></img>
            <div class="card-body">
              <h5 class="card-title">{service.name}</h5>
              <p class="card-text">Categoria: {service.category}</p>
              <a href="/services" class="btn btn-primary">Details</a>
            </div>
          </div>
        ))}
       </div> 
     );
}
 
export default CatalogoServizi;