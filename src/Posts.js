import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import UpdatePostModal from "./UpdatePostModal";

const Posts = ({posts}) => {
    const handleDelete= (id) => (e) =>{
        e.preventDefault();
        var url='https://site212216.tw.cs.unibo.it/message/';
        url=url+id;
        const reqData={
            method: 'DELETE',
            headers: { "Content-Type": "application/json" ,
                        "authority": localStorage['clientToken']
            },
            
        }
        console.log(reqData);
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("eliminato")).then( ()=> {window.location.reload()});
    }
    const currUser= localStorage['user'] ? JSON.parse(localStorage['user']) : {};

    function getTime(time, addHour) {
        let [h, m] = time.split(':');
        let date = new Date();
         date.setHours(h, m, 0)
         date.toString();
        let res = `${date.getHours()+addHour}:${date.getMinutes()}`
        return res
      }

return ( 
    <div className="posts">
            {
                posts.map( post => (
                    currUser && post.author===currUser.username ?
                    
                    <div class="card mb-2 mt-2 border border-2 border-dark">
                    <div class="card-body">
                      <h5 class="card-title mb-2">{post.text}</h5>
                      <p class="card-text text-secondary"><small>Written by: <span style={{color:'black'}}>{post.author}</span> on {String(post.created).slice(0,10).concat(" at ").concat(getTime(String(post.created).slice(11,16),1))}</small></p>
                      <button className="btn btn-danger" type="button" onClick={handleDelete(post._id)}>Elimina post</button>
                        <UpdatePostModal mode={"post"} id={post._id} message={post.text} img=""/>
                        <div>
                            <Comments postId={post._id}/>
                            <AddCommentForm postId={post._id}/>
                        </div>
                    </div>
                  </div>
                    :
                    <div class="card mb-2 mt-2 border border-2 border-dark">
                    <div class="card-body">
                      <h5 class="card-title mb-2">{post.text}</h5>
                      <p class="card-text text-secondary"><small>Written by: <span style={{color:'black'}}>{post.author}</span> on {String(post.created).slice(0,10).concat(" at ").concat(getTime(String(post.created).slice(11,16),1))}</small></p>

                        <div>
                            <Comments postId={post._id}/>
                            <AddCommentForm postId={post._id}/>
                        </div>
                    </div>
                    
                  </div>
                           
                ))
            }
        </div>
     );
}
 
export default Posts;