import axios from "axios";
import { useState,useEffect } from "react";
import getDayOfYear from "date-fns/esm/getDayOfYear";
import setHours from "date-fns/setHours"
import setSeconds from "date-fns/setSeconds"


const Bookings =  () => {

    const [myBookings, setMyBookings]=useState([]);
    
    const myuser=JSON.parse(localStorage['user']);
    const url="https://site212216.tw.cs.unibo.it/booking/"+myuser.username;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const headers={
            authority: localStorage['accessToken']
        }
    

    useEffect( () => { 
        async function fetchData() {
            try {
                const res = await axios.get(url); 
                setMyBookings(res.data);
                //localStorage['user']=JSON.stringify(res.data[0]);
                
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [url]);

    const handleDelete=(id) => (e)=>{
        e.preventDefault();
        let url="https://site212216.tw.cs.unibo.it/booking/";
        const body={
            id:id
        }
        console.log(headers);
        axios.delete(url, {data: body, headers:headers}).then(()=>window.location.reload())
    }
    
    return ( 
        <div className="card m-5 p-5">
            <h3 className="mb-5"><strong>Prenotazioni di: {myuser.username}</strong></h3>
            {myBookings && myBookings.map( booking=>(
                <div key={booking._id}>
                <p>Prenotazione #{booking._id}</p>
                <div><strong>{booking.service_name}</strong></div>
                {( getDayOfYear(new Date(booking.date_start))!==getDayOfYear(new Date(booking.date_end)) 
                     )
                
                && 
                    <div>
                        <div>Da: {new Date(booking.date_start).toLocaleDateString("it-IT",options)}</div>
                        <div>A: {new Date(booking.date_end).toLocaleDateString("it-IT",options)}</div>
                        <div>Con lo staff: {booking.staff}</div>
                    </div>
                    }

                {
                    ( (getDayOfYear(new Date(booking.date_start))===getDayOfYear(new Date(booking.date_end))) ) &&
                    <div>
                        <div>Da: {setSeconds(setHours(new Date(booking.date_start), new Date(booking.date_start).getHours()-1),0).toLocaleString("it-IT")}</div>
                        <div>a: {setSeconds(setHours(new Date(booking.date_end), new Date(booking.date_end).getHours()-1),0).toLocaleString("it-IT")}</div>
                        <div>Con lo staff: {booking.staff}</div>
                    </div>
                }


            <div>Totale: {booking.total}€</div>
            <hr></hr>
            {
                new Date(booking.date_start).getTime()>new Date().getTime() &&
            <button className="btn btn-warning" onClick={handleDelete(booking._id)}>Delete booking</button>
            }
            <br></br>
            </div>
        ))}

        {!myBookings.length && 
            <div className="card m-5">
                <div className="card-body">
                    <strong>Non hai ancora prenotato nessun servizio!</strong>
                </div>
            </div>}
        </div>
     );
}
 
export default Bookings;