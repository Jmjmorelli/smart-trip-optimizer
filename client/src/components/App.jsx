import Home from './Home';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Navbar from './navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Navbar/>
        <Routes>
          <Route path="/" element ={<Landing/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          {/* <Route path="/navbar" element ={<Navbar/>} /> */}
          <Route path="/home" element ={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
