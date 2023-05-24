import React, {useEffect, useState } from 'react';
import styles from './Home.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import moment from 'moment/moment';
import Modal from 'react-modal';
import { useFormik } from "formik";
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
Modal.setAppElement('#root');
const HomeComponent = () => {



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
  const [bookId,setBookId]=useState()
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
        console.log(err);
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
        console.log(err);
    })
    }

    const [computerBooks,compSetState]=useState([]);
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
       
        axios.post(`http://localhost:3000/ai-client-app/id/${localStorage.getItem("userId")}`).then(res=>{
           setTastBook(res.data.books);
                  
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

   


      },[])

    return (
        <div className="container my-4">
            <h6 className='my-3'>Books Based On Your Taste</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
          
         
       {tasteBooks.map((item)=>(
      <div className={styles.bookCard} key={item.id}>
      <div className={styles.titleWrapper}>
      <h6>{item.bookTitle}</h6>
      </div>
      <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
      <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
       </div>
       ))}
        
      </Carousel> 

      <h6 className='my-3'>Most Borrowed Books</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {books.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <h5>{item.name}</h5>
            <img className='img-fluid' src={item.imgURL} alt="book Cover" />
            <button className={styles.btnBorrow} >Borrow</button>
        </div>
       ))}
        
      </Carousel> 



      <h6 className='my-3'>Computer Science</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {
       computerBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
          <div className={styles.titleWrapper}>
            <h6>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>



        </div>
       ))}
        
      </Carousel> 


      <h6 className='my-3'>Language</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {langBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>

            
        </div>
       ))}
        
      </Carousel>   

      <h6 className='my-3'>Arch.</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {archBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
        </div>
       ))}
        
      </Carousel>   

      <h6 className='my-3'>Phys.</h6>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {PhysBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <div className={styles.titleWrapper}>
            <h6>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />

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
                    //  className={errors.password && touched.password ?"form-control input-error":"form-control"}
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
                    //  className={errors.password && touched.password ?"form-control input-error":"form-control"}
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
                    //  className={errors.password && touched.password ?"form-control input-error":"form-control"}
                    type="datetime-local" class="form-control js-daterangepicker"/>
                 </div>
                </div>
 
                <button>Submit</button>
           
         </form>
               
        
      </Modal>

      </div>
    )
};


export default HomeComponent;