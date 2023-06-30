import React, {useEffect, useState} from 'react';
import styles from './MyBooks.module.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';

const MyBooksComponent = () => {
    const [books,setBooks]=useState([
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
        // {
        //     id:4,
        //   name:"book1",
        //   imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        // },
        // {
        //     id:5,
        //   name:"book1",
        //   imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        // },
        // {
        //     id:6,
        //   name:"book1",
        //   imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        // },
        // {
        //     id:7,
        //   name:"book1",
        //   imgURL:"https://edit.org/images/cat/book-covers-big-2019101610.jpg",  

        // }
    ]);

     useEffect(()=>{
      axios.get(`http://localhost:3000/books/id/${localStorage.getItem('userId')}`).then(res=>{
        setBooks(res.data)
      })
     },[])

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
        axios.get(`http://localhost:3000/books/id/${localStorage.getItem("userId")}`).then(res=>{
          console.log(res.data);
        }).catch(err=>{
          console.log(err);
        })
      },[])
      
    return (
        <div className="container my-4">
            <h3 className='my-3'>My Borrowed Books</h3>
            <br></br>
        <Carousel
        centerMode={true}
        itemClass="carousel-item-padding-40-px"
        responsive={responsive}>
    
       {books.map((item)=>(
        <div className={styles.bookCard} key={item.id}>
            <h5 className='heading__book'>{item.bookTitle}</h5>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
           
        </div>
       ))}
        
      </Carousel> 


      </div>
    )
};

export default MyBooksComponent;