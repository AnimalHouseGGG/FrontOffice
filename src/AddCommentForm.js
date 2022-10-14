import { useState } from "react";


const AddCommentForm = ({postId}) => {

    const [newComment, setnewComment]=useState('');

    const handleSubmit= (id) => (e) =>{
        e.preventDefault();
        const url='https://site212216.tw.cs.unibo.it/message';
        const body={
            text: newComment,
            author: 'io',
            created: String(Date()).slice(0,24),
            postId: id,
            mode: 'commento'
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
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#addModal"+postId}>
                Add comment
            </button>
            <div id={"addModal"+postId} class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new comment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form id={"newComment" +postId} className={"addComment-"+postId} onSubmit={handleSubmit(postId)}>
                            <textarea style={{width: '100%' }} value={newComment} placeholder='Type a new comment under this post' onChange={ e => setnewComment(e.target.value)}></textarea>
                        </form>   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" form={"newComment" +postId} class="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     );
}
 
export default AddCommentForm;