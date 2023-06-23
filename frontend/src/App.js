import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Compoent/Layout/Layout';
import Signup from './Compoent/SignUp/Signup';
import Clothe from './Compoent/Clothe/Clothe';
import Signin from './Compoent/SignIn/Signin';
function App() {
  return (
    <>
      <Navigate />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/clothe" element={<Clothe />} />

      </Routes >
    </>
  );
}

export default App;
