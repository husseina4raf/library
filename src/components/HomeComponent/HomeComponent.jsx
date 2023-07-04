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
         reservationDate:moment().format('YYYY-MM-DD '),
        dueDate: "9999-12-31 ",
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
          
         
       {tasteBooks.map((item,index)=>(
      <div className={styles.bookCard} key={item.id}>
      <div className={styles.titleWrapper}>
      <h6 className='heading__book'>{item.title}</h6>
      </div>
      <img className='img-fluid' src={index === 0 ? "https://edit.org/images/cat/book-covers-big-2019101610.jpg" : 
                      
                                    "https://edit.org/images/cat/book-covers-big-2019101610.jpg" } 
    alt="book Cover" />
      <br></br>
            <br></br>

            
      <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
       </div>
       ))}
        
      </Carousel> 

      <h3 className='my-3'>- Most Popular Books</h3>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {mostBooks.map((item,index)=>(
        <div className={styles.bookCard} key={item.id}>
                    <div className={styles.titleWrapper}>

            <h6 className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src={index === 0 ? "https://i.ebayimg.com/images/g/utIAAOSw33NfM3l9/s-l1600.jpg" : 
                                      index === 1 ? "data:image/jpeg;base64,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" :
                                      index === 2 ? "https://m.media-amazon.com/images/I/81BqsETP-YL._AC_UF1000,1000_QL80_.jpg" :
                                      index === 3 ? "https://m.media-amazon.com/images/I/51i8yKnPs4L.jpg" :
                                    "https://edit.org/images/cat/book-covers-big-2019101610.jpg" }  
            alt="book Cover" />
            <br></br>
            <br></br>

            
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
                type="date" class="form-control js-daterangepicker"/>
              </div>
            </div>

            <div className="col-md-12 my-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Due Date</label>
                <input
                  onChange={handleChange}
                  value={values.dueDate}
                  name="dueDate"
                type="date" class="form-control js-daterangepicker"/>
              </div>
            </div>
            {/* <div className="col-md-12 my-3">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Return Date</label>
                <input
                  onChange={handleChange}
                  value={values.returnDate}
                  name="dueDate"
                type="datetime-local" class="form-control js-daterangepicker"/>
              </div>
            </div> */}

            <button className="btn btn-outline-dark ">Submit</button>
            {error && <Alert className={styles.alert} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
          </form>
        </Modal>
        
      </Carousel> 


<br></br>
      <h3 className='my-3'>- Computer </h3>
      <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {
       computerBooks.map((item,index)=>(
        <div className={styles.bookCard} key={item.id}>
          <div className={styles.titleWrapper}>
            <h6  className='heading__book'>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src={index === 3? "https://media.wiley.com/product_data/coverImage300/34/11195946/1119594634.jpg" : 
                                      index === 0 ? "data:image/jpeg;base64,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" :
                                      index === 2 ? "https://m.media-amazon.com/images/I/51flx1TSLpL._SL500_.jpg" :
                                      index === 1 ? "https://m.media-amazon.com/images/I/51i8yKnPs4L.jpg" :
                                    "https://edit.org/images/cat/book-covers-big-2019101610.jpg" }  
             alt="book Cover" />
            
            <br></br>
            <br></br>

            
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

            
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
        
        </div>
       ))}
        
      </Carousel> 
 
      
      {/* <Modal
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
               
        
      </Modal> */}

      </div>
    )
};


export default HomeComponent;