import { useEffect,useState } from 'react';
import CatalogoProdotti from './CatalogoProdotti';
import useFetch from './useFetch'


const Prodotti = ({addToCart}) => {

    const { error, isPending, data: items } = useFetch('https://site212216.tw.cs.unibo.it/item')
    
    const [filteredItems, setFilteredItems]=useState(items)
    

    var categories=[];
    for(let item in items){
        if(!categories.includes(items[item].category)) categories.push(items[item].category);
    }
    
    const maxPrice=(items)=>{
        let max=0;
        for(let item in items){
            if(parseInt(items[item].price)>max)max=items[item].price;
        }
        return max;
    }

    const [price,setPrice]=useState(maxPrice(items));
    const [category, setCategory]=useState("-");

     useEffect( ()=> {
        setFilteredItems(items)
        setPrice(maxPrice(items))
    }, [items])
    


    const filter=()=>{
        var array=[];
        for(let i in items){
            if(category!=="-"){
                if(items[i].price<=price && items[i].category===category) array.push(items[i])
            }
            else{
                if(items[i].price<=price) array.push(items[i]);
            }
        }
        setFilteredItems(array)
    }

    useEffect( ()=>{
        filter()
        // eslint-disable-next-line
    }, [price,category])
    return ( <div className='container'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {filteredItems && 
        <>
            <div className='filters' style={{margin: '10px'}}>
                <p>Filter by price (less than)</p>
                <input id="price" type="range" value={price} min="1" max={maxPrice(items)} onChange={e=>setPrice(e.target.value)}></input>
                <span>{price}</span>
                <p>Filter by category</p>
                <select onChange={e=>setCategory(e.target.value)}>
                    <option>-</option>
                    {categories.map( category => (
                        <option>{category}</option>
                    ))}
                </select>
            </div>
            <CatalogoProdotti items={filteredItems} addToCart={addToCart}/>
        </>
        }
    </div>);
}
 
export default Prodotti;