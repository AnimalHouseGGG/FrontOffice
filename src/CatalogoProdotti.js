import { Link } from "react-router-dom";

const CatalogoProdotti = ({items,addToCart}) => {
    //console.log(addToCart);
     return (
        <div className="container items-list">
         {items.map( item => (
             <div className="card itemcard text-center m-3" style={{width: '18rem'}} key={item._id}>
             <img className="card-img" src={item.img} alt="product"></img>
             <div className="card-body">
               <h5 className="card-title">{item.name.replaceAll("-", " ")}</h5>
               <p className="card-text">Categoria: {item.category}</p>
               <p className="card-text">Prezzo: {item.price}€</p>
               <Link className="btn btn-primary btn-card" to={"/item/"+item._id} state={{item}}> Details </Link>
             </div>
           </div>
         ))}
        </div> 
      );
}
 
export default CatalogoProdotti;