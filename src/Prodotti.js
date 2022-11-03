import CatalogoProdotti from './CatalogoProdotti';
import useFetch from './useFetch'


const Prodotti = ({addToCart}) => {

    const { error, isPending, data: items } = useFetch('https://site212216.tw.cs.unibo.it/item')
    
    

    return ( <div className='content'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {items && <CatalogoProdotti items={items} addToCart={addToCart}/>}
    </div>);
}
 
export default Prodotti;