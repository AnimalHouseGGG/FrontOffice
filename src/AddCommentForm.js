import { useState } from "react";
import LoginUtils from "./LoginUtils";
import * as bootstrap from "bootstrap";


const AddCommentForm = ({postId}) => {

    const [newComment, setnewComment]=useState('');

    const handleSubmit= (id) => (e) =>{
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
            text: newComment,
            author: author,
            created: new Date(),
            postId: id,
            mode: 'commento'
        }
        const reqData={
            method: 'POST',
            headers: { "Content-Type": "application/json",
                    "authority": localStorage['clientToken'] },
            body: JSON.stringify(body)

        }
        fetch(url, reqData).then(res=>res.json()).then((res)=>console.log(res)).then( ()=> {window.location.reload()});
        }
        else{
            var toastEl=document.getElementById("notlogged");
            var toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
    }


    

    return (
        <div className="container"> 
            {LoginUtils.isLoggedIn() ?
            <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target={"#addModal"+postId}>
                Aggiungi un commento
            </button>
            :
            <div></div>
            }
            <div id={"addModal"+postId} className="modal" tabindex="-1">
                <div className="card modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Aggiungi un nuovo commento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form id={"newComment" +postId} className={"addComment-"+postId} onSubmit={handleSubmit(postId)}>
                            <textarea style={{width: '100%' }} value={newComment} placeholder='Type a new comment under this post' onChange={ e => setnewComment(e.target.value)}></textarea>
                        </form>   
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                            <button type="submit" form={"newComment" +postId} className="btn btn-primary">Aggiungi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     );
}
 
export default AddCommentForm;