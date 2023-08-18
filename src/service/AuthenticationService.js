import axios from 'axios';

/*To Make RESTAPI (Spring Boot App) calls we will be using axios.
 > npm install axios
*/

//const API_URL='http://localhost:8088/fargoloans/api/';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
class AuthenticationService{

loginCustomer(customer){
    console.log("In Service")
    console.log(JSON.stringify(customer));
    return axios.post('http://localhost:8088/fargoloans/api/login',customer);
}

registerSuccessfulLogin(username, password) {      
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
   // console.log("First"+username);
}

}

// Createa a Object
export default new AuthenticationService;