import CatalogoCuccioli from './CatalogoCuccioli';
import useFetch from './useFetch'


const Pets = ({addToCart}) => {

    const { error, isPending, data: pets } = useFetch('https://site212216.tw.cs.unibo.it/animalonsale')
    
    

    return ( <div className='content'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {pets && <CatalogoCuccioli pets={pets}/>}
    </div>);
}
 
export default Pets;