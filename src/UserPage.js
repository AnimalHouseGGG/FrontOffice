//import { useState } from 'react';
import Login from './Login';
import useToken from './useToken';

const UserPage = () => {

    const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

    return ( 
        <div className="container">UserPage</div>
     );
}
 
export default UserPage;