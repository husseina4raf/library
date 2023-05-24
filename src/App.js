import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeComponent from './components/HomeComponent/HomeComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import Register from './components/RegisterComponent/RegisterComponent';
import NavComponent from './components/NavComponent/NavComponent';
import BooksComponent from './components/BooksComponent/BooksComponent';
import ReservationsComponent from './components/ReservationComponent/ReservationsComponent';
import MyBooksComponent from './components/MyBooksComponent/MyBooksComponent';
import ProfileComponet from './components/ProfileComponent/ProfileComponet';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import ForgtPasswordComponent from './components/ForgetPasswordComponent/ForgtPasswordComponent';
import ReservationsUserComponent from './components/ReservationsUserComponent/reservationsUserComponent';
import { UserProvider } from './context';
function App() {
  return (
    <> 
     <UserProvider>
   {localStorage.getItem('token') && <NavComponent/> }
    <Routes>
     
    { !localStorage.getItem('token') &&  <Route path='/' element={<Register/>} /> }
        <Route path='/register' element={<Register/>} />
     {!localStorage.getItem('token') &&    <Route path='/login' element={<LoginComponent/>} />}
        <Route path='/home' element={< HomeComponent/>} /> 
        <Route path='/books' element={< BooksComponent/>} /> 
        <Route path='/reservation' element={<ReservationsComponent />} />  
        <Route path='/myBooks' element={<MyBooksComponent />} />  
        <Route path='/profile' element={<ProfileComponet />} />  
        <Route path='/dashboard/*' element={<DashboardComponent />} /> 
        <Route path='/forgetPassword' element={< ForgtPasswordComponent/>} /> 
        <Route path='/reservationUser' element={< ReservationsUserComponent/>} /> 



       
     </Routes>
     </UserProvider>
    </>
  );
}

export default App;

