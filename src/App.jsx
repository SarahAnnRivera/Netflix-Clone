import { useEffect } from 'react'
import Home from './Pages/Home/Home.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Player from './Pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase.js'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("AUTH USER:", user);
    if (user) {
  navigate("/", { replace: true });
} else {
  navigate("/login", { replace: true });
}
  });

  return () => unsubscribe();
}, [navigate]);


  return(
    <div>
       <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/login' element={ <Login />}/>
        <Route path='/player/:id' element={ <Player />}/>
      </Routes>
     

    </div>
  )
}

export default App