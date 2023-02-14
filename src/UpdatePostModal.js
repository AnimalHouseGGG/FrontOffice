import { useState } from "react";

const UpdatePostModal = ({mode,id,message,img}) => {

    const [newMessage, setnewMessage] =useState(message);
    const handleUpdate= (id,text,img) => (e) =>{
        e.preventDefault();
        console.log(text);
        var url='https://site212216.tw.cs.unibo.it/message/update';
        const body={
            id: id,
            text: text,
            img:img
        }
        const reqData={
            method: 'POST',
            headers: { "Content-Type": "application/json",
            "authority": localStorage['clientToken']
        },
            body: JSON.stringify(body)
        }
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("updated")).then( ()=> window.location.reload());  
    }


    return ( 
        
        <div className="m-2"> 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#updateModal"+id}>
                Aggiorna {mode==="comment" ? "commento" : "post" }
            </button>
            <div id={"updateModal"+id} class="modal" tabindex="-1">
                <div class="card modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Aggiorna</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form id={"updateComment" +id} className={"addComment-"+id} onSubmit={handleUpdate(id,newMessage,img)}>
                            <textarea style={{width: '100%' }} value={newMessage} placeholder='Type a new comment under this post' onChange={ e => setnewMessage(e.target.value)}></textarea>
                        </form>   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                            <button type="submit" form={"updateComment" +id} class="btn btn-primary">Aggiorna</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UpdatePostModal;