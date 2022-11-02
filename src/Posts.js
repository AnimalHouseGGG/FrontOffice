import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import UpdatePostModal from "./UpdatePostModal";

const Posts = ({posts}) => {
    const handleDelete= (id) => (e) =>{
        e.preventDefault();
        var url='https://site212216.tw.cs.unibo.it/message/';
        url=url+id;
        const user=localStorage['user']
        console.log(user);
        const reqData={
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            
        }
        fetch(url, reqData).then(res=>res.json()).then(()=>console.log("eliminato")).then( ()=> window.location.reload());
    }
    const currUser= localStorage['user'] ? JSON.parse(localStorage['user']) : {};

return ( 
    <div className="posts">
            {
                posts.map( post => (
                    currUser && post.author===currUser.username ?
                    <div  id={post._id}>
                        <div> <strong>{post.text}</strong> </div>
                            <small>Written by: {post.author} at {String(post.created).slice(0,10)}</small><br></br>
                            <button className="btn btn-danger" type="button" onClick={handleDelete(post._id)}>Elimina post</button>
                            <UpdatePostModal mode={"post"} id={post._id} message={post.text} img=""/>
                        <div>
                            <Comments postId={post._id}/>
                            <AddCommentForm postId={post._id}/>
                        </div>
                    
                    </div>
                    :
                    <div  id={post._id}>
                        <div> <strong>{post.text}</strong> </div>
                            <small>Written by: {post.author} at {String(post.created).slice(0,10)}</small><br></br>
                        <div>
                            <Comments postId={post._id}/>
                            <AddCommentForm postId={post._id}/>
                        </div>
                    
                    </div>          
                ))
            }
        </div>
     );
}
 
export default Posts;