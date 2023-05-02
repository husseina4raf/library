import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
const HomeComponent = () => {
   var d = new Date,
     dformat = [d.getMonth()+1,
                d.getDate(),
                d.getFullYear()].join('-')+' '+
               [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

    const borrowBook=(bookStockId)=>{
      axios.post('http://localhost:3000/reservations/',{
         reservationDate:dformat,
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

    const [computerBooks,compSetState]=useState([]);
    const [langBooks,langSetState]=useState([]);
    const [archBooks,archSetState]=useState([]);
    const [PhysBooks,PhysState]=useState([]);

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
        axios.get('http://localhost:3000/books/Computer').then(res=>{
           compSetState(res.data);
          //  console.log(computerBooks);
        }).catch(err=>{
          console.log(err);
        })
           
        axios.get('http://localhost:3000/books/Language').then(res=>{
          langSetState(res.data);
       }).catch(err=>{
         console.log(err);
       })

       axios.get('http://localhost:3000/books/').then(res=>{
        archSetState(res.data);
     }).catch(err=>{
       console.log(err);
     })

     axios.get('http://localhost:3000/books/Phys.').then(res=>{
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
    
       {books.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <h5>{item.name}</h5>
            <img className='img-fluid' src={item.imgURL} alt="book Cover" />
            <button className={styles.btnBorrow} >Borrow</button>
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
    
       { console.log(computerBooks)}
       {
       computerBooks.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
          <div className={styles.titleWrapper}>
            <h6>{item.bookTitle}</h6>
            </div>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <button onClick={()=>{borrowBook(item.id)}} className={styles.btnBorrow} >Borrow</button>
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
            <button onClick={()=>{borrowBook(item.id)}} className={styles.btnBorrow} >Borrow</button>
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
            <button onClick={()=>{borrowBook(item.id)}} className={styles.btnBorrow} >Borrow</button>
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
            <button onClick={()=>{borrowBook(item.id)}} className={styles.btnBorrow} >Borrow</button>
        </div>
       ))}
        
      </Carousel> 
 
      


      </div>
    )
};


export default HomeComponent;