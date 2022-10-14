import CatalogoServizi from "./CatalogoServizi";
import useFetch from './useFetch'



const Servizi = () => {

    const { error, isPending, data: services } = useFetch('https://site212216.tw.cs.unibo.it/service')

    return ( 
        <div className='content'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {services && <CatalogoServizi services={services}/>}
    </div>
     );
}
 
export default Servizi;