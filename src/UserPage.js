import Login from "./Login";
import LoginUtils from "./LoginUtils";
import User from "./User";

const UserPage = () => {
  
  if(LoginUtils.isLoggedIn()){
    return ( 
      <div className='content'><User/>
    </div>
   );
  }
  else{
    return(
      <div>
        <Login></Login>
      </div>
      
    )
  }
    
}
 
export default UserPage;