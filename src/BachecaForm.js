import { useState } from "react";
import LoginUtils from "./LoginUtils";
import * as bootstrap from "bootstrap";

const BachecaForm = () => {

    const [comment, setComment]= useState('');

    const handleSubmit=function(e){
        e.preventDefault();
        if(LoginUtils.isLoggedIn()){

            //get date
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            
            //get author
            const tmp=localStorage["user"];
            const user=JSON.parse(tmp);
            const author=user.username;

            const url='https://site212216.tw.cs.unibo.it/message';
            const body={
            text: comment,
            author: author,
            created: new Date(),
            mode: 'post'
        }
        const reqData={
            method: 'POST',
            headers: { "Content-Type": "application/json",
            "authority": localStorage['accessToken']
        },
            body: JSON.stringify(body)

        }
        console.log(reqData);
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("aggiunto")).then( ()=> window.location.reload());
        }
        
        else{
            var toastEl=document.getElementById("notlogged");
            var toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
    }
    

    return ( 
        <div className="container"> 
            <div className="bachecaForm">

<form id="newPost" onSubmit={handleSubmit}>
<div className="mb-3 mt-3">
  <textarea style={{backgroundColor: '#f8d09f'}} className="form-control" rows="3" value={comment} 
    required
    placeholder='Start typing to write a post...'
    onChange={(e) => setComment(e.target.value)}
    form="comment"> </textarea>
</div>
<button type="submit" form="newPost" className="btn btn-primary">Post</button>
</form>

</div>
        </div>
     );
}
 
export default BachecaForm;