import React from 'react';
import {useEffect ,useState} from 'react';
import axios from 'axios';
import logo from "../../../src/assets/images/modernlogo.png"
import styles from "./Nav.module.css"; 
import { NavLink, useNavigate } from 'react-router-dom';
import { UserConsumer } from '../../context';
import Modal from 'react-modal';
import Alert from '@mui/material/Alert';

import { useFormik } from 'formik';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
  },
};
function NavComponent() {

  const userRole=localStorage.getItem('role');
  const adminRole=localStorage.getItem('role');
  const superAdminRole=localStorage.getItem('role');


  const [input, setInput] = useState("");
  const [resultSearch, setResultSearch] = useState([])
  const [error, setErorr] = useState('');

  const navigate= useNavigate()
  // const faData =(value) =>{
  //   axios.get("http://localhost:3000/books/search/Art") .then(response =>response.json().then(json =>{
  //   console.log(json);
  //   }))
  // }

  // const handleChange = (value) =>{
  //   setInput(value);
  //   faData(value);
  // }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [bookId, setBookId] = useState("")
  function openModal(id) {
    setBookId(id);
    console.log(id);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setBookId('')
  }
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
    subtitle.style.color = '#f00';
  }
     
  const reservedBook=(data)=>{
    axios.post('http://localhost:3000/reservations/',{
    reservationDate:data.reservationDate,
    dueDate: data.dueDate,
    returnDate:data.returnDate,
    reservationStatus: "pending",
    userId:data.userId,
    bookStockId:bookId
    }).then(res=>{
        console.log(res);
        closeModal()

    }).catch(err=>{
      setErorr(err.response.data.message.message);
      setTimeout(()=>{
        setErorr("")
       }, 3000)    })
  }

  const onSubmit=(values,actions)=>{
    reservedBook(values);
  }
  const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues: {
      reservationDate:'', 
      dueDate:''  ,
      userId:localStorage.getItem('userId')
    },
    validationSchema:'',
    onSubmit
  });

  // const handleBookId = (val)=>{
  //   setIsOpen(true);
  //   setBookid(val)
  // }
  
  return (

    <UserConsumer>
      {({ updateBookname }) => (
          <nav>
              <div className={` ${styles.containerNav}`}>
                  <img className={styles.logo} src={logo}  alt="" ></img>
                  <div className={styles.searchWrapper} style={{position: "relative"}}>
                    {/* <i className="fa-sharp fa-solid fa-magnifying-glass"></i> */}
                    <input type="search" placeholder='search' 
                      onChange={event => {
                        console.log(event.target.value);
                        if(event.target.value === ''){setResultSearch([])}
                        axios.get(`http://localhost:3000/books/search/${event.target.value}`)
                        .then(res=> {
                          updateBookname(res.data);
                          setResultSearch(res.data);
                        })
                        .catch(err=> console.log(err))
                      }}
                    />
                    {resultSearch.length > 0 &&
                      <ul className='resultSearchNav'>
                        {resultSearch.map(ele => 
                          <li key={ele.id} title={ele.bookTitle}>
                            <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="image" />
                            <div className='title-booking'>
                              <h4>{ele.bookTitle}</h4>
                              <div>
                                <button onClick={()=>openModal(ele.id)}>Borrow</button>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    }
                  </div>

                  <button 
                    onClick={()=>{ 
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("adminId");
                        navigate('/login')
                        window.location.reload();
                      }
                    } 
                    className={styles.logoutBtn}>Logout</button>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}  
              >
                <button onClick={closeModal} className="btn-close"></button>
                <form type="submit" onSubmit={handleSubmit}>
                  
                  <div className="col-md-12 my-3">
                    <input
                        value={bookId}
                        name="bookStockId"
                        type="hidden"/>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Reservation Date</label>
                      <input
                        onChange={handleChange}
                        value={values.reservationDate}
                        name="reservationDate"
                      type="datetime-local" class="form-control js-daterangepicker"/>
                    </div>
                  </div>

                  <div className="col-md-12 my-3">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Due Date</label>
                      <input
                        onChange={handleChange}
                        value={values.dueDate}
                        name="dueDate"
                      type="datetime-local" class="form-control js-daterangepicker"/>
                    </div>
                  </div>
                  <div className="col-md-12 my-3">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Return Date</label>
                      <input
                        onChange={handleChange}
                        value={values.returnDate}
                        name="dueDate"
                      type="datetime-local" class="form-control js-daterangepicker"/>
                    </div>
                  </div>
  
                  <button className="btn btn-outline-dark">Submit</button>
                  {error && <Alert className={styles.alert} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
                </form>
              </Modal>

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