import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as bootstrap from "bootstrap";


const MyAnimals = () => {

    const [myAnimals, setMyAnimals]=useState([]);
    
    const {state}=useLocation();
    const user=state;
    const url="https://site212216.tw.cs.unibo.it/animal/";
    //const url="https://site212216.tw.cs.unibo.it/animal/nessuno";
    const [nome, setNome]=useState("");
    const [specie, setSpecie]=useState("");
    const [age, setAge]=useState("");
    const [med_con, setMedCon]=useState("");

    const headers={
        headers: {
            authority: localStorage['accessToken']
        }
    }
    
    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get(url+user); 
                setMyAnimals(res.data);
                //localStorage['user']=JSON.stringify(res.data[0]);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [url]);
    
    const handleSubmit=()=>{
        if(nome!=="" && specie!=="" && age!==""){
            const body={
                name: nome,
                specie: specie,
                age: parseInt(age),
                sex: document.getElementById("sex").value,
                owner: user,
            }
            if(med_con!=="")body.medical_condition=med_con;
            console.log(body);
            axios.post(url, body, headers).then(()=>window.location.reload());
        }
        else {
            var toastEl=document.getElementById("fields");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
        }
        
    }

    const handleDelete= (animal)=> (e)=>{
        e.preventDefault();
        console.log(animal);
        const body={
            owner: user
        }
        try {
            axios.delete(url+animal, {data: body, headers:headers}).then(()=>window.location.reload())
            
        } catch (error) {
            console.log(e);
        }
    }

    return ( 
        <div className="card m-5 p-3">
            <div className="animals">
            {myAnimals.length===0 && <div>Non hai ancora registrato nessun animale!</div>}
            {myAnimals.length!==0 && <div>
                    {myAnimals.map( animal=> (
                        <>
                        <img src={animal.img} alt="foto animale"></img>
                        <div>{animal.name}</div>
                        <div>Specie: {animal.specie}</div>
                        <div>Età: {animal.age}</div>
                        <div>Sesso: {animal.sex}</div>
                        {animal.medical_condition && <div>Condizione medica: {animal.medical_condition}</div>}
                        {!animal.medical_condition && <div>Condizione medica: assente</div>}
                        <button className="btn btn-primary" onClick={handleDelete(animal.name)}>Rimuovi</button>
                        </>
                    ))
                    
                    }
                </div>}
            </div>
            <div className="add mt-3">
                    <p>Registra un animale!</p>
                    <form>
                        <label>Nome</label>
                        <input type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}></input>
                        <br></br>
                        <label>Specie</label>
                        <input type="text" placeholder="Specie" value={specie} onChange={e=>setSpecie(e.target.value)}></input>
                        <br></br>
                        <label>Età</label>

                        <input type="number" placeholder="Età" value={age} onChange={e=>setAge(e.target.value)}></input>
                        <br></br>
                        <label>Sesso</label>
                        
                        <select id="sex">
                            <option value="M">Maschio</option>
                            <option value="F">Femmina</option>
                        </select>
                        <br></br>
                        
                        <label for='medcon'>Condizione Medica</label>
                        <textarea id='medcon' placeholder="Condizione medica" value={med_con} onChange={e=>setMedCon(e.target.value)}></textarea>

                    </form>
                    <button onClick={handleSubmit}>Registra</button>
            </div>
        </div>
     );
}
 
export default MyAnimals;