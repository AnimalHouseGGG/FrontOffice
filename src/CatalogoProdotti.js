const CatalogoProdotti = ({items}) => {

     return (
        <div className="items-list" style={{ display: 'flex'}}>
         {items.map( item => (
             <div className="card text-center" style={{width: 288}}>
             <img className="card-img-top" src={item.img} alt="product"></img>
             <div className="card-body">
               <h5 className="card-title">{item.name}</h5>
               <p className="card-text">Categoria: {item.category}</p>
               <a href={"/items/" + item._id} class="btn btn-primary">Details</a>
             </div>
           </div>
         ))}
        </div> 
      );
}
 
export default CatalogoProdotti;