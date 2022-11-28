import UpdatePostModal from "./UpdatePostModal";
import useFetch from "./useFetch";

const Comments = ({postId}) => {

    const {error, isPending, data: comments} =useFetch('https://site212216.tw.cs.unibo.it/message/'+postId);
    
    const currUser= localStorage['user'] ? JSON.parse(localStorage['user']) : {};
    
    const handleDelete= (id) => (e) =>{
        e.preventDefault();
        var url='https://site212216.tw.cs.unibo.it/message/';
        url=url+id;
        const reqData={
            method: 'DELETE',
            headers: { "Content-Type": "application/json",
            "authority": localStorage['accessToken']
        },

        }
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("eliminato")).then( ()=> window.location.reload());
    }

    function getTime(time, addHour) {
        let [h, m] = time.split(':');
        let date = new Date();
         date.setHours(h, m, 0)
         date.toString();
        let res = `${date.getHours()+addHour}:${date.getMinutes()}`
        return res
      }
    

    return ( 
        <div className="comments">
            { error && <div>{ error }</div> }
            {isPending && <div>Loading...</div>  }
            {
                comments && comments.map(comment=>(
                    currUser && comment.author===currUser.username ? 
                    <div>
                        <div id={comment._id}>
                        - {comment.text}
                        
                        </div>
                        <small>Written by: {comment.author} on {String(comment.created).slice(0,10).concat(" at ").concat(getTime(String(comment.created).slice(11,16),1))}</small><br></br>
                        
                        <button className="btn btn-warning" type="button" onClick={handleDelete(comment._id)}>Elimina commento</button>
                        <UpdatePostModal mode="comment" id={comment._id} message={comment.text} img={""}/>
                    </div>
                    : 
                    <div>
                        <div id={comment._id}>
                        - {comment.text}
                        
                        </div>
                        <small>Written by: {comment.author} on {String(comment.created).slice(0,10).concat(" at ").concat(getTime(String(comment.created).slice(11,16),1))}</small><br></br>
                        
                        
                    </div>
                ))
            }
        </div>
     );
}
 
export default Comments;