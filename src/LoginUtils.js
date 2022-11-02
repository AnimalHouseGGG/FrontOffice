const ACCESS_TOKEN_STORAGE = 'accessToken';

const LoginUtils={
    isLoggedIn: function isLoggedIn(){
        try{//TODO manca checkValidity nell if
            if (!localStorage.hasOwnProperty(ACCESS_TOKEN_STORAGE) || typeof localStorage[ACCESS_TOKEN_STORAGE]===undefined || localStorage[ACCESS_TOKEN_STORAGE]==="undefined" ){
                return false;
            }else
                return true;
        } catch (e) {
            console.error(e);
            return false;
        }
      },
      
      logout: function logout(){
        localStorage.clear();
        window.location.reload()
      }
}


  export default LoginUtils;