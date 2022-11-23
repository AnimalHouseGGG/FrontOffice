import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import getDayOfYear from "date-fns/esm/getDayOfYear";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceDetails = () => {
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
            authority: localStorage['accessToken']
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
    let duration;
    useEffect( ()=>{
        if(duration)
        setEndDate("");
    }, [duration]);

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

    const calculateTimeDiff=(start, end)=>{
        var diff = Math.abs(start.getTime() - end.getTime()) / (3600000*24);
        diff=end.getDate()-start.getDate()+1;
        return diff;
    }

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) +1);
      }
 
    const handleSubmit= ()=>{
        //if(duration)setEndDate("");
        if(endDate!==null){
        let staff=document.getElementById("staff").value;
        let start=setHours(new Date(dateTime), dateTime.getHours()+1)
        var end; var total;
        if(duration) {
            var tmp=addHoursToDate(start, duration)
            if(tmp.getHours()>19 || tmp.toDateString()!==start.toDateString()) {alert("Non puoi prenotare servizi che terminano dopo le 18:00");return}
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
            total: Math.ceil(total),
        }
        let containsBookedTimes=false;
        let containsBookedDays=false;
        if(duration){
            for(let h in booking){
                if(booking[h].getHours()===(end.getHours()-2)) containsBookedTimes=true;
            }
        }
        else{
            console.log(bookingDaysForCheckFormat);
            containsBookedDays=dateOverlap(start, end, bookingDaysForCheckFormat);
        }
        if(end===undefined) alert("invalid")
        else if(containsBookedTimes) alert('Non puoi prenotare perché l\'orario selezionato si incrocia con un\'altra prenotazione');
        else if(containsBookedDays) alert('Non puoi prenotare perché le date richieste si incrociano con altre prenotazioni');
        else {
            console.log(body);
            axios.post("https://site212216.tw.cs.unibo.it/booking", body, headers).then(res=>console.log(res)).then(()=>window.location.replace('/myBookings'))
        }
        } 
        else if( endDate===null){
            alert("insert end date")
        }
        else alert("insert start date")
    }


    
    return ( 

        <div className="container">
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
            {duration && <div>Prezzo: {service.price}</div>}
            {!duration && <div>Prezzo: {service.price}/d</div>}
            <hr></hr>
            <div>{service.disponibility}</div>
            <div>Orario: 8.00-18.00</div>
            <hr></hr>
            {duration && <div>Durata: {duration} h</div>}
            <hr></hr>

            <select id="staff" onChange={e=>setSelectedStaff(e.target.value)}>
                    {service.staff.map( staff=> <option value={staff}>{staff}</option>)}
                </select>
                <div>
    
    {duration && <form>
      

      <div className="section">
        <h3 className="section-title">Date time input</h3>
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
            maxTime={setHours(setMinutes(new Date(), 0), (18-duration))}
            
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
    {!duration && <form>
      

      <div className="section">
        <h3 className="section-title">Date time input</h3>
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
        <button onClick={handleSubmit}>BOOK</button>
  </div>
        </div>


     );
}
 
export default ServiceDetails;