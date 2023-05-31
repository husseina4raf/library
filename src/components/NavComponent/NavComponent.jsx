import React from 'react';
import {useEffect ,useState} from 'react';
import axios from 'axios';
import logo from "../../../src/assets/images/modernlogo.png"
import styles from "./Nav.module.css"; 
import { NavLink, useNavigate } from 'react-router-dom';
import { UserConsumer } from '../../context';
function NavComponent() {

    const userRole=localStorage.getItem('role');
    const adminRole=localStorage.getItem('role');
    const superAdminRole=localStorage.getItem('role');


    const [input, setInput] = useState("");
  const navigate= useNavigate()
        const faData =(value) =>{
           axios.get("http://localhost:3000/books/search/Art") .then(response =>response.json().then(json =>{
            console.log(json);
           }))
                 }

                 const handleChange = (value) =>{
                  setInput(value);
                  faData(value);

                 }
  


    return (
    
      <UserConsumer>
          {({ updateBookname }) => (
             <nav>
                <div className={` ${styles.containerNav}`}>
                   
                       <img className={styles.logo} src={logo}  alt="" ></img>
                      
                 

                       <div className={styles.searchWrapper}>
                    
                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                      <input type="search" placeholder='search' 
                  
                      onChange={event => {
                         console.log(event.target.value);
                         axios.get(`http://localhost:3000/books/search/${event.target.value}`).then(res=>{
                          console.log(res.data);
                          updateBookname(res.data);
                   }).catch(err=>{
                    axios.get(`http://localhost:3000/books/`).then(res=>{
                      console.log(res.data);
                      updateBookname(res.data);
               })
                   })
                      }}
                     ></input>
               </div>

                    
                     
                                        
                        
                     <button onClick={()=>{ 
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("adminId");
    navigate('/login')
    window.location.reload();
  }
    
    } className={styles.logoutBtn}>Logout</button>
 
                
                 </div>
                 
                 <div className={styles.navigationWrapper}>
                 <NavLink className={styles.navLink} to='/home'>
                       <div className={styles.navigationItem}>
                       <i className="fa-sharp fa-solid fa-house"></i>
                        Home
                       </div>
                       </NavLink>
                       <NavLink className={styles.navLink} to='myBooks'>
                       <div className={styles.navigationItem}>
                       <i className="fa-solid fa-book-open"></i>
                         My Books
                       </div>
                       </NavLink>
                       <NavLink className={styles.navLink} to='books'>
                       <div className={styles.navigationItem}>
                       <i className="fa-sharp fa-solid fa-book"></i>
                        Books
                       </div>
                       </NavLink>
                       { userRole!=="User" && 
                       <NavLink className={styles.navLink} to='reservation'>
                       <div className={styles.navigationItem}>
                       <i className="fa-solid fa-users-rectangle"></i>
                      Reservations
                       </div>
                       </NavLink>
                       }
                        {  adminRole!== "Admin" && superAdminRole!=="SuperAdmin" && 

                       <NavLink className={styles.navLink} to='reservationUser'>
                       <div className={styles.navigationItem}>
                       <i className="fa-solid fa-users-rectangle"></i>
                      Reservations
                       </div>
                       </NavLink>
                       }
                       <NavLink className={styles.navLink} to='profile'>
                       <div className={styles.navigationItem}>
                       <i className="fa-solid fa-user"></i>
                        Profile
                       </div>
                       </NavLink>
                       { userRole!=="User" && 
                       <NavLink  className={styles.navLink} to='dashboard'>
                       <div className={styles.navigationItem}>
                       <i className="fa-solid fa-table-columns"></i>
                         Dashboard
                       </div>
                       </NavLink>
                      }
                 </div>
                 
             </nav>
             )}
             </UserConsumer>
    );
}

export default NavComponent;