// import axios from "axios";

// class AuthService {
//   login(username, password) {
//     return axios
//       .post(API_URL + "signin", {
//         username,
//         password
//       })
//       .then(response => {
//         console.log('response',response);
//         if (response.data.accessToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }
//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(username, email, password) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password
//     });
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
// }

// export default new AuthService();

import http from "../utils/http-client";

const API_URL = "http://localhost:8088/fargoloans/api/auth";
class AuthService{
   login = (data) => {
      return http.post(API_URL+'/signin', data, {
          transformResponse: [(result) => {
              const parsed = JSON.parse(result);
              localStorage.setItem('authUser', JSON.stringify(parsed));
              return parsed;
          }]
      });
  }

   register = (data) => {
      return http.post('/register', data);
  }

   profile = () => {
      return http.get('/user');
  }

   logout = () => {
      return http.get('/logout', null, {
          transformResponse: [(result) => {
              localStorage.removeItem('authUser');
              return JSON.parse(result);
          }]
      });
  }

   getAuthUser = () => {
      return JSON.parse(localStorage.getItem('authUser'));
  }  
  
};

// const methods = { 
//     login,
//     register,
//     profile,
//     logout,
//     getAuthUser
// }

// export default methods;
export default new AuthService();