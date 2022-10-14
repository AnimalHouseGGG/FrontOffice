import BachecaForm from './BachecaForm';
import Posts from './Posts';
import useFetch from './useFetch';



const Bacheca = () => {

    const {error, isPending, data: posts}=useFetch('https://site212216.tw.cs.unibo.it/message');
    //const {error, isPending, data: posts}=useFetch('http://localhost:8000/posts');

    return ( 
        <div className="bacheca container">
            <BachecaForm/>
            <hr></hr>
            { error && <div>{ error }</div> }
            {isPending && <div>Loading...</div>  }
            { posts && <Posts posts={posts}/> }
        </div>
     );
}
 
export default Bacheca;