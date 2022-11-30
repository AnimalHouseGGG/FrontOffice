import CatalogoServizi from "./CatalogoServizi";
import useFetch from './useFetch'
import { useEffect, useState } from "react";



const Servizi = () => {

    const { error, isPending, data: services } = useFetch('https://site212216.tw.cs.unibo.it/service');

    const [filteredServices, setFilteredServices]=useState(services);
    

    var categories=[];
    for(let item in services){
        if(!categories.includes(services[item].category)) categories.push(services[item].category);
    }
    var sedi=[];
    for(let i in services){
        if(!sedi.includes(services[i].place)) sedi.push(services[i].place);
    }
    
    const maxPrice=(services)=>{
        let max=0;
        for(let item in services){
            if(parseInt(services[item].price)>max)max=services[item].price;
        }
        return max;
    }
    const [price,setPrice]=useState(maxPrice(services));
    const [category, setCategory]=useState("-");
    const [sede, setSede]=useState("-");


     useEffect( ()=> {
        setFilteredServices(services)
        setPrice(maxPrice(services))
    }, [services])
    


    const filter=()=>{
        var array=[];
        for(let i in services){
            if(sede!=="-"){
                if(category!=="-"){
                    if(services[i].price<=price && services[i].category===category && services[i].place===sede) array.push(services[i])
                }
                else{
                    if(services[i].price<=price && services[i].place===sede) array.push(services[i]);
                }
            }else{
                if(category!=="-"){
                    if(services[i].price<=price && services[i].category===category) array.push(services[i])
                }
                else{
                    if(services[i].price<=price) array.push(services[i]);
                }
            }
        }
        setFilteredServices(array)
    }

    useEffect( ()=>{
        filter()
        // eslint-disable-next-line
    }, [price,category,sede])
    return ( 
        <div className='container'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {services && 
        <>
        

            <div class="card m-5">
                <div class="card-body">
                    <p>Filter by price (less than)</p>
                    <input id="price" step="1" type="range" min="1" max={maxPrice(services)} onChange={e=>setPrice(e.target.value)}></input>
                    <span>{price}</span>
                    <p>Filter by category</p>
                    <select onChange={e=>setCategory(e.target.value)}>
                        <option>-</option>
                        {categories.map( category => (
                            <option>{category}</option>
                        ))}
                    </select>
                    <p>Filter by sedi</p>
                    <select onChange={e=>setSede(e.target.value)}>
                        <option>-</option>
                        {sedi.map( sede => (
                            <option>{sede}</option>
                        ))}
                    </select>
                </div>
            </div>
        <CatalogoServizi services={filteredServices}/>
        </>
        }
    </div>
     );
}
 
export default Servizi;