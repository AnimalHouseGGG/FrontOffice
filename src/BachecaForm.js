import { useState } from "react";

const BachecaForm = () => {

    const [comment, setComment]= useState('');

    const handleSubmit=function(e){
        e.preventDefault();
        const url='https://site212216.tw.cs.unibo.it/message';
        const body={
            text: comment,
            author: 'io',
            created: String(Date()).slice(0,24),
            mode: 'post'
        }
        const reqData={
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)

        }
        
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("aggiunto")).then( ()=> window.location.reload());
    }
    

    return ( 
        <div className="container"> 
            <div className="bachecaForm">

<form id="newPost" onSubmit={handleSubmit}>
<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Write a new post</label>
  <textarea class="form-control" rows="3" value={comment} 
    required
    placeholder='Start typing to write a post...'
    onChange={(e) => setComment(e.target.value)}
    form="comment"> </textarea>
</div>
<button type="submit" form="newPost" class="btn btn-primary">Post</button>
</form>

</div>
        </div>
     );
}
 
export default BachecaForm;