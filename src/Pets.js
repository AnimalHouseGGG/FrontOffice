import { useState, useEffect } from 'react';
import CatalogoCuccioli from './CatalogoCuccioli';
import useFetch from './useFetch'


const Pets = ({addToCart}) => {

    const { error, isPending, data: pets } = useFetch('https://site212216.tw.cs.unibo.it/animalonsale');

    const [filteredPets, setFilteredPets]=useState(pets);

    const [specie, setSpecie]=useState("-");
    var speci=[];
    for(let i in pets){
        if(!speci.includes(pets[i].specie)) speci.push(pets[i].specie);
    }

    const filter=()=>{
        var array=[];
        for(let i in pets){
            if(specie!=="-"){
                if(pets[i].specie===specie)array.push(pets[i])
            }else{
                array.push(pets[i]) 
            }
        }
        setFilteredPets(array)
    }

    useEffect( ()=> {
        setFilteredPets(pets)
    }, [pets])

    useEffect( ()=>{
        filter()
        // eslint-disable-next-line
    }, [specie])

    return ( <div className='container'>
        { error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>  }
        {pets && 
        <>
            <p style={{margin: '10px'}}>Filter by specie</p>
                    <select style={{margin: '10px'}} onChange={e=>setSpecie(e.target.value)}>
                        <option>-</option>
                        {speci.map( specie => (
                            <option>{specie}</option>
                        ))}
                    </select>
            <CatalogoCuccioli pets={filteredPets}/>
        </>
        }
    </div>);
}
 
export default Pets;