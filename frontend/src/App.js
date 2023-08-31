import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home.jsx"
import Properties from './pages/properties/Properties.jsx';
import Room from './pages/room/Room';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Listing from './pages/list/Listing';
import MyProperty from './pages/myproperty/MyProperty';
import MyReservation from './pages/myreservation/MyReservation';
import Checkout from './pages/checkout/Checkout';
import Success from './pages/sucess/Success';
import EditPage from './pages/editPage/EditPage';
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/properties' element={<Properties/>}/>
        <Route path='/properties/:id' element={<Room/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/listing' element={<Listing/>}/>
        <Route path='/myproperty' element={<MyProperty/>}/>
        <Route path='/myreservation' element={<MyReservation/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/checkout/:id' element={<Checkout/>}/>
        <Route path='/edit/:id' element={<EditPage/>}/>
        <Route path='/payment' element={<PaymentSuccess/>}/>
        
        
      </Routes>

    </BrowserRouter>
);
}

export default App;
