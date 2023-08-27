// // import axios from "axios";

// // class AuthService {
// //   login(username, password) {
// //     return axios
// //       .post(API_URL + "signin", {
// //         username,
// //         password
// //       })
// //       .then(response => {
// //         console.log('response',response);
// //         if (response.data.accessToken) {
// //           localStorage.setItem("user", JSON.stringify(response.data));
// //         }
// //         return response.data;
// //       });
// //   }

// //   logout() {
// //     localStorage.removeItem("user");
// //   }

// //   register(username, email, password) {
// //     return axios.post(API_URL + "signup", {
// //       username,
// //       email,
// //       password
// //     });
// //   }

// //   getCurrentUser() {
// //     return JSON.parse(localStorage.getItem('user'));;
// //   }
// // }

// // export default new AuthService();

// import axios from "./axios-client";
// import axios from "axios";


// const API_URL = "axios://localhost:8088/fargoloans/api/auth";
// class AuthService{
//    login = (data) => {
//       return axios.post(API_URL+'/signin', data, {
//           transformResponse: [(result) => {
//               const parsed = JSON.parse(result);
//               localStorage.setItem('authUser', JSON.stringify(parsed));
//               return parsed;
//           }]
//       });
//   }

//    register = (data) => {
//       return axios.post('/register', data);
//   }

//    profile = () => {
//       return axios.get('/user');
//   }

//    logout = () => {
//       return axios.get('/logout', null, {
//           transformResponse: [(result) => {
//               localStorage.removeItem('authUser');
//               return JSON.parse(result);
//           }]
//       });
//   }
// };

// // const methods = { 
// //     login,
// //     register,
// //     profile,
// //     logout,
// //     getAuthUser
// // }

// // export default methods;
// export default new AuthService();


import axios from "axios";

const API_URL = "http://localhost:8088/fargoloans/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
