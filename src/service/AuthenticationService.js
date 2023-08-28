import axios from 'axios';
import authService from './auth.service';
/*To Make RESTAPI (Spring Boot App) calls we will be using axios.
 > npm install axios
*/

//const API_URL='http://localhost:8088/fargoloans/api/';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
class AuthenticationService{


    /*
        The async function declaration creates a binding of a new async function to a given name. 
    The await keyword is permitted within the function body, enabling asynchronous, promise-based behavior 
    to be written in a cleaner style and avoiding the need to explicitly configure promise chains.
    They are not coordinated with each other, meaning they could occur simultaneously or not 
    because they have their own separate agenda.   
    */ 

    static async registerEmployee(employee) {
        try {
          const response = await axios.post('http://localhost:8088/fargoloans/api/employee', employee); // Adjust the API endpoint
          console.log(response.data)
          // await authService.register( response.data, ,)
          return response.data;
        } catch (error) {
          console.error('Registration error', error);
          throw new Error('An error occurred during registration.');
        }
      }

    static async loginEmployee(employee){
        console.log("In Service")
        console.log(JSON.stringify(employee));
        return axios.post('http://localhost:8088/fargoloans/api/login',employee);
    }

    static async registerSuccessfulLogin(username, password) {      
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // console.log("First"+username);
    }

}

// Createa a Object
export default new AuthenticationService;