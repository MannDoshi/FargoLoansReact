import { useState } from 'react';

import './App.css';
import Navbar from './components/Navbar';

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

const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthProvider>
      {/* <div className='container center'> */}
      <Navbar></Navbar>
      {/* </div> */}
    
      <Routes >
    
    </Routes>
    </AuthProvider>
  );
}

export default App;
