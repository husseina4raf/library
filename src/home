import React, {useEffect, useState } from 'react';
import styles from './Home.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import moment from 'moment/moment';
import Modal from 'react-modal';
import { useFormik } from "formik";
import $ from 'jquery';
import Alert from '@mui/material/Alert';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
// Modal.setAppElement('#root');
const HomeComponent = () => {
  const [error, setErorr] = useState('');

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
        

  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [bookId,setBookId]=useState('')
  function openModal(id) {
    setBookId(id);
  
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setBookId("");
  }
    const borrowBook=(bookStockId)=>{
      axios.post('http://localhost:3000/reservations/',{
         reservationDate:moment().format('YYYY-MM-DD h:mm:ss'),
        dueDate: "9999-12-31 23:59:59",
        reservationStatus: "pending",
        userId:localStorage.getItem('userId'),
        bookStockId
    }).then(res=>{
        console.log(res);
     

    }).catch(err=>{
        
        })
    }           
    const [books,]=useState([
        {
            id:1,
          name:"book1",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:2,
          name:"book2",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:3,
          name:"book3",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:99,
          name:"book99",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:4,
          name:"book1",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:5,
          name:"book1",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:6,
          name:"book1",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        },
        {
            id:7,
          name:"book1",
          imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        }
    ]);
    const reservedBook=(data)=>{
      console.log(bookId);
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

    const [computerBooks,compSetState]=useState([]);
    const [mostBooks,mostStat]=useState([]);

    const [langBooks,langSetState]=useState([]);
    const [archBooks,archSetState]=useState([]);
    const [PhysBooks,PhysState]=useState([]);
  const [tasteBooks,setTastBook]=useState([]);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  
      useEffect(()=>{
        console.log( localStorage.getItem('algoAi'));
        axios.post(`http://localhost:3000/ai-client-app/id/${localStorage.getItem("userId")}`,{
          algorithm: localStorage.getItem('algoAi')??'k-nn'
        }).then(res=>{
           setTastBook(res.data.books);
           console.log();
                  
       }).catch(err=>{
         console.log(err);
       })

        axios.get('http://localhost:3000/books/genre/Computer').then(res=>{
           compSetState(res.data);
          //  console.log(computerBooks);
        }).catch(err=>{
          console.log(err);
        })
           
        axios.get('http://localhost:3000/books/genre/Language').then(res=>{
          langSetState(res.data);
       }).catch(err=>{
         console.log(err);
       })

       axios.get('http://localhost:3000/books/genre/Arch.').then(res=>{
        archSetState(res.data);
     }).catch(err=>{
       console.log(err);
     })

     axios.get('http://localhost:3000/books/genre/Phys.').then(res=>{
      PhysState(res.data);
   }).catch(err=>{
     console.log(err);
   })

   axios.get('http://localhost:3000/books/home/MBB').then(res=>{
          mostStat(res.data);
       }).catch(err=>{
         console.log(err);
       })


      },[])


    return (

     

        <div className="container my-4">


<br></br>
            <h3 className='my-3'>Books Based On Your Taste</h3>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
          
         
       {tasteBooks.map((item)=>(
      <div className={styles.bookCard} key={item.id}>
      <div className={styles.titleWrapper}>
      <h6 className='heading__book'>{item.title}</h6>
      </div>
      <img className='img-fluid' src="https://m.media-amazon.com/images/I/61z0E89xowL._AC_UF1000,1000_QL80_.jpg" alt="book Cover" />
      <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>
      <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
       </div>
       ))}
        
      </Carousel> 

      <h3 className='my-3'>- Most Popular Books</h3>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {mostBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
                    <div className={styles.titleWrapper}>

            <h6 className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>
            <button className={styles.btnBorrow} onClick={()=>{openModal(item.id)}}>Borrow</button>
            
            
        </div>
       ))}
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
                  name="reservationDate"
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

            <button className="btn btn-outline-dark ">Submit</button>
            {error && <Alert className={styles.alert} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
          </form>
        </Modal>
        
      </Carousel> 


<br></br>
      <h3 className='my-3'>- Computer Science</h3>
      <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {
       computerBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
          <div className={styles.titleWrapper}>
            <h6  className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            
            <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>


        </div>
       ))}
        
      </Carousel> 

<br></br>
      <h3 className='my-3'>- Language</h3>
      <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {langBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6 className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            
            <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>

            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>

            
        </div>
       ))}
        
      </Carousel>   
<br></br>
      <h3 className='my-3'>- Arch.</h3>
      <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {archBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6 className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
        </div>
       ))}
        
      </Carousel>   
<br></br>
      <h3 className='my-3'>- Phys.</h3>
      <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {PhysBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6 className='heading__book' >{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <br></br>
            <br></br>

            <p> Number of Books : {item.editionNumber}</p>
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
        
        </div>
       ))}
        
      </Carousel> 
 
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}  
      >
        <button onClick={closeModal}>close</button>
         <form type="submit" onSubmit={handleSubmit}>

         <div className="col-md-12 my-3">
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
 
                <button cl>Submit</button>
           
         </form>
               
        
      </Modal>

      </div>
    )
};


export default HomeComponent;