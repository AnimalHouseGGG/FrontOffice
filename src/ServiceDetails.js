import { useLocation } from "react-router-dom";

const ServiceDetails = () => {

    const { state } = useLocation();
    const service=state.service;
    //console.log(service);



    return ( 

        <div className="container">
            <div> <img src={service.img} alt="immagine servizio"></img></div> 
            <hr></hr>
            <div>{service.name}</div>
            <hr></hr>
            <div>Categoria: {service.category}</div>
            <hr></hr>
            <div>{service.description}</div>
            <hr></hr>
            <div>Prezzo: {service.price}</div>
            <hr></hr>
            <div>{service.disponibility}</div>
        </div>
     );
}
 
export default ServiceDetails;