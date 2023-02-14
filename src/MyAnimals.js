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
            authority: localStorage['clientToken']
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
    
    const handleSubmit= async ()=>{
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
            axios.post(url, body, headers).then(async (res)=> {
                let img=document.querySelector("input[type='file']").files.item(0);
                if(img!==null){
                    console.log(res.data._id);
                    debugger
                    var blob=img.slice(0, img.size, 'image/*');
                    let image=new File([blob], res.data._id+'.png', {type: 'image/*'})
                    var form=new FormData();
                    form.append("file", image)
                    console.log(image);
                    await axios.post("https://site212216.tw.cs.unibo.it/image/", form, {
                        headers: {
                            enctype: 'multipart/form-data',
                            processData : false,
                            contentType: false
                        }
                    }).then( (res)=> {
                        console.log(res);
                    })
                }
            }).then(()=>window.location.reload());
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
    const src='https://site212216.tw.cs.unibo.it/front/'
    return ( <>
        <div className="card m-5 p-4">
            <div className="animals">
            {myAnimals.length===0 && <div><strong>Non hai ancora registrato nessun animale!</strong></div>}
            {myAnimals.length!==0 && <div>
                    {myAnimals.map( animal=> (
                        <>
                        <div className="card text-center m-3 p-3">
                            <div className="card-img-top">
                                <img src={src+animal._id + ".png"} 
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src="https://site212216.tw.cs.unibo.it/front/noimg-animal.png";
                                    }}
                                alt="foto animale">
                                </img>
                            </div>
                            <hr></hr>
                        <div>Nome: {animal.name}</div>
                        <div>Specie: {animal.specie}</div>
                        <div>Età: {animal.age}</div>
                        <div>Sesso: {animal.sex}</div>
                        {animal.medical_condition && <div>Condizione medica: {animal.medical_condition}</div>}
                        {!animal.medical_condition && <div>Condizione medica: assente</div>}
                        <div className="text-center">
                            <button className="btn w-25 btn-danger" onClick={handleDelete(animal.name)}>Rimuovi</button>
                        </div>
                        </div>
                        </>
                    ))
                    
                    }
                </div>}
            </div>
            </div>
            <div className="card m-5 p-5">
                    <p>Registra un animale!</p>
                    <form>
                        <label>Nome</label>
                        <input className="form-control" type="text" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)}></input>
                        <br></br>
                        <label>Specie</label>
                        <input className="form-control" type="text" placeholder="Specie" value={specie} onChange={e=>setSpecie(e.target.value)}></input>
                        <br></br>
                        <label>Età</label>

                        <input className="form-control" type="number" placeholder="Età" value={age} onChange={e=>setAge(e.target.value)}></input>
                        <br></br>
                        <label>Sesso</label>
                        
                        <select className="form-control" id="sex">
                            <option value="M">Maschio</option>
                            <option value="F">Femmina</option>
                        </select>
                        <br></br>
                        
                        <label for='medcon'>Condizione Medica</label>
                        <textarea className="form-control" id='medcon' placeholder="Condizione medica" value={med_con} onChange={e=>setMedCon(e.target.value)}></textarea>
                        <br></br>
                        <input className="form-control" type="file"></input>

                    </form>
                    <br></br>
                    <br></br>
                    <div className="text-center">
                        <button className="btn w-25 p-3 border border-2 border-dark" onClick={handleSubmit}>Registra</button>
                    </div>
            </div>
            </>
     );
}
 
export default MyAnimals;