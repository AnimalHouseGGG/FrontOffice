import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginUtils from "./LoginUtils"
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import getDayOfYear from "date-fns/esm/getDayOfYear";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';  
import * as bootstrap from "bootstrap";



const ServiceDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const service=state.service;
    localStorage['service']=JSON.stringify(service);
    const [selectedStaff, setSelectedStaff]=useState(service.staff[0]);
    
    const [dateTime, setDateTime] = useState(setHours(setMinutes(new Date().setDate(new Date().getDate()+1), 0), 8));
    
    const [endDate, setEndDate] = useState(null);
    
    const onChange = (dates) => {
        const [start, end] = dates;
        setDateTime(start);
        setEndDate(end);
        //console.log(start);
            console.log(end);
    };

    const [booking,setBooking]=useState([])
    const [bookingDays, setBookingDays]=useState([])
    const [bookingDaysForCheckFormat,setBookingDaysForCheckFormat]=useState([])

    const headers={
        headers: {
            authority: localStorage['clientToken']
        }
    }
    var taken=[]
    const changeFormat=(e)=>{
        e.start=setMinutes(new Date(e.start), 0);
        e.end=setMinutes(new Date(e.end), 0);
        return e;
    }
    useEffect( () => {
        axios.post("https://site212216.tw.cs.unibo.it/bookingByArgs", {service: service._id, staff: selectedStaff}, headers ).then(
            res=>{
                for(let booking in res.data){
                    taken.push( {start: res.data[booking].date_start, end: res.data[booking].date_end } )
                }
                console.log(taken);
                // eslint-disable-next-line
                taken=taken.map( e=> (
                    e=changeFormat(e)
                    )) 
                var arrayBooking=[];
                var arrayBookingDays=[];
                setBookingDaysForCheckFormat(taken);
                for(let i in taken){
                    if(taken[i].start.toDateString() === dateTime.toDateString() )
                    {
                        let x=taken[i].start.getHours()-1;
                        let z=taken[i].end.getHours()-1;
                        while(x<z){
                            arrayBooking.push(setHours(setMinutes(new Date(dateTime), 0), x++));
                        }
                    }
                }
                for(let i in taken){
                    let x=getDayOfYear(taken[i].start);
                    let z=getDayOfYear(taken[i].end);
                    let j=0;
                    while(x<=z){
                        arrayBookingDays.push(addDays(taken[i].start, j++));
                        x++;
                    }
                }
                setBooking(arrayBooking);
                setBookingDays(arrayBookingDays);
            }
        )
    }, [selectedStaff, dateTime]);

    //let duration=4;
    //let duration;
    useEffect( ()=>{
        if(service.duration)
        setEndDate("");
    }, [service.duration]);

    function addHoursToDate(date, hours) {
        return new Date(new Date(date).setHours(new Date(date).getHours() + (hours)));
      }

    
    

    function dateOverlap(start, end, bookingList){
        start = new Date(start).getTime()
        end = new Date(end).getTime()
        console.log(bookingList);
        for(let b in bookingList){
            let bStart = new Date(bookingList[b]['start']).getTime()
            let bEnd = new Date(bookingList[b]['end']).getTime()
      
            
            if(start >= bStart && start <= bEnd){ //a tra c e d
                return true
            }
            if(start >= bStart && start <= bEnd){//b tra c e d
                return true
            }
            if(bStart >= start && bStart <= end){//c tra a e b
                return true
            }
            if(bEnd >= start && bEnd <= end){//d tra a e b
                return true
            }
        }
        return false
      }

    

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) +1);
      }
 
    const handleSubmit= ()=>{
        if(LoginUtils.isLoggedIn()){
            if(endDate!==null){
            let staff=document.getElementById("staff").value;
            let start=setHours(new Date(dateTime), dateTime.getHours()+1)
            var end; var total;
            if(service.duration) {
                var tmp=addHoursToDate(start, service.duration)
                if(tmp.getHours()>19 || tmp.toDateString()!==start.toDateString()) {
                    var toastEl=document.getElementById("service1");
                    var toast = new bootstrap.Toast(toastEl);
                    toast.show();
                    return
                }
                else{end=setHours(new Date(tmp), tmp.getHours())}
                total=service.price;
            } else{
                end=setHours(endDate,19);
                console.log(dateDiffInDays(start,end));
                total=service.price*dateDiffInDays(start,end);
            }
            
            const body={
                user: localStorage.userId,
                staff: staff,
                service: service._id,
                date_start: start,
                date_end: end,
                service_name: service.name,
                place: service.place,
                user_name: JSON.parse(localStorage.user).username,
                avaiable_staff: service.staff,
                total: Math.ceil(total),
            }
            let containsBookedTimes=false;
            let containsBookedDays=false;
            if(service.duration){
                for(let h in booking){
                    if(booking[h].getHours()===(end.getHours()-2)) containsBookedTimes=true;
                }
            }
            else{
                console.log(bookingDaysForCheckFormat);
                containsBookedDays=dateOverlap(start, end, bookingDaysForCheckFormat);
            }
            if(end===undefined) {
                var toastEl=document.getElementById("service2");
                var toast = new bootstrap.Toast(toastEl);
                toast.show();
            }
            else if(containsBookedTimes) {
                var toastEl=document.getElementById("service3");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
            }
            else if(containsBookedDays) {
                var toastEl=document.getElementById("service4");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
            }
            else {
                console.log(body);
                axios.post("https://site212216.tw.cs.unibo.it/booking", body, headers).then(res=>console.log(res)).then(()=>navigate('/myBookings'))
            }
            } 
            else if( endDate===null){
                var toastEl=document.getElementById("service5");
                var toast = new bootstrap.Toast(toastEl);
                toast.show();
            }
            else {
                var toastEl=document.getElementById("service6");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
            }
        }else{
            var toastEl=document.getElementById("notlogged");
              var toast = new bootstrap.Toast(toastEl);
              toast.show();
        }
    }


    
    return ( 

        <div className="card m-5 p-3">
            <div> <img src={service.img} alt="immagine servizio"></img></div> 
            <hr></hr>
            <div>{service.name}</div>
            <hr></hr>
            <div>Sede: {service.place}</div>
            <hr></hr>
            <div>Categoria: {service.category}</div>
            <hr></hr>
            <div>{service.description}</div>
            <hr></hr>
            {service.duration && <div>Prezzo: {service.price}€</div>}
            {!service.duration && <div>Prezzo: {service.price}€ al giorno</div>}
            <hr></hr>
            <div>{service.disponibility}</div>
            <div>Orario: 8.00-18.00</div>
            <hr></hr>
            {service.duration && <div>Durata: {service.duration} h<hr></hr></div>}
            

            <p>Con lo staff:</p>
            <select id="staff" onChange={e=>setSelectedStaff(e.target.value)} style={{maxWidth: '200px', margin: '5px'}}>
                    {service.staff.map( staff=> <option value={staff}>{staff}</option>)}
                </select>
                <hr></hr>
                <div>
    
    {service.duration && <form>
      

      <div className="section">
        <h3 className="section-title mb-2">Seleziona una data e un orario</h3>
        <div className="section-content">
          <DatePicker
            selected={dateTime}
            onChange={date => setDateTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="time"
            dateFormat="d MMMM yyyy - h:mm"
            minTime={setHours(setMinutes(new Date(), 0), 8)}
            maxTime={setHours(setMinutes(new Date(), 0), (18-service.duration))}
            
            excludeTimes={
                booking
            }
            minDate={new Date().setDate(new Date().getDate()+1)}
          />
        </div>
      </div> 
      <hr></hr>

      <div className="section">
      </div>
    </form>}
    {!service.duration && <form>
      

      <div className="section">
        <h3 className="section-title mb-2">Seleziona una data di inizio e di fine</h3>
        <div className="section-content">
            <DatePicker
        selected={dateTime}
        onChange={onChange}
        startDate={dateTime}
        endDate={endDate}
        excludeDates={bookingDays}
        selectsRange
        minDate={new Date().setDate(new Date().getDate()+1)}
        inline
        />
        </div>
      </div>
      <hr></hr>
    </form>}
        <button className="btn btn-warning" onClick={handleSubmit}>Prenota</button>
  </div>
        </div>


     );
}
 
export default ServiceDetails;