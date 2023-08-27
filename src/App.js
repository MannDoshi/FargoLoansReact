import './App.css';

import AuthProvider from "./provider/authProvider";
import Routes from "./routes/index";



// function App() {
//   return (
//     <AuthProvider>
//       <Routes >
        
//       </Routes>
//     </AuthProvider>
//   );
// }



function App() {
  return (
    <AuthProvider>
    <h1>Fargo Loans</h1>
      <Routes >
    
    </Routes>
    </AuthProvider>
  );
}

export default App;
