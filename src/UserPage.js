//import { useState } from 'react';
import Login from './Login';
import useToken from './useToken';
//import useUser from './useUser';

const UserPage = () => {

    const { token, setToken } = useToken();
    //const { user, setUser} = useUser();

  if(!token) {
    return <Login setToken={setToken}/>
  }

    return ( 
        <div className="container">UserPage</div>
     );
}
 
export default UserPage;