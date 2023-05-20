import React from 'react';
import {useEffect ,useState} from 'react';
import axios from 'axios';
import logo from "../../../src/assets/images/modernlogo.png"
import styles from "./Nav.module.css"; 
import { NavLink, useNavigate } from 'react-router-dom';

function NavComponent() {

    const userRole=localStorage.getItem('role');
    const [input, setInput] = useState("");
  const navigate= useNavigate()
        const faData =(value) =>{
           axios.get("http://localhost:3000/books/search/Arch") .then(response =>response.json().then(json =>{
            console.log(json);
           }))
                 }

                 const handleChange = (value) =>{
                  setInput(value);
                  faData(value);

                 }
  


    return (
    
             
             <nav>
                <div className={` ${styles.containerNav}`}>
                   
                       <img className={styles.logo} src={logo}  alt="" ></img>
                      
                 

                       <div className={styles.searchWrapper}>
                    
                    <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                      <input type="search" placeholder='search' 
                      value={input}
                      onChange={(e) =>handleChange(e.target.value)}></input>
               </div>

                    
                     
                                        
                        
                     <button onClick={()=>{ localStorage.clear("token");
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
    );
}

export default NavComponent;