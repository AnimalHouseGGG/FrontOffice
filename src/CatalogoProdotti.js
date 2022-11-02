import { Link } from "react-router-dom";

const CatalogoProdotti = ({items}) => {

     return (
        <div className="items-list" style={{ display: 'flex'}}>
         {items.map( item => (
             <div className="card text-center" style={{width: 288}} key={item._id}>
             <img className="card-img-top" src={item.img} alt="product"></img>
             <div className="card-body">
               <h5 className="card-title">{item.name}</h5>
               <p className="card-text">Categoria: {item.category}</p>
               <Link className="btn btn-primary" to={"/item/"+item._id} state={{item}}> Details </Link>
             </div>
           </div>
         ))}
        </div> 
      );
}
 
export default CatalogoProdotti;