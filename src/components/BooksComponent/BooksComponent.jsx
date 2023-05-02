import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Books.module.css';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const BooksComponent = () => {
  

     

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
 
        axios.get("http://localhost:3000/books/").then(res=>{
                console.log(res.data);
                setBooks(res.data)
        }).catch(err=>{
          console.log(err);
        })

      },[])
     const sortedBooks=(param)=>{
      axios.get(`http://localhost:3000/books/showby/${param}`).then(res=>{
        setBooks(res.data);
      })
       console.log(param);
     }
    return (

    




        <div className="container">
                   
          <Dropdown as={styles.ButtonGroup}>
            
      <Button variant="success">Split Button</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>

        <Dropdown.Item onClick={()=>{sortedBooks("copyyear")}}>Copy Year</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortedBooks("genre")}}>Genre</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortedBooks("atoz")}}>A~Z</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortedBooks("ztoa")}}>Z~A</Dropdown.Item>
      

       </Dropdown.Menu>

    </Dropdown>
     
            <h6 className='my-3'>Books Based On Your Taste</h6>
       
        <div className="row my-5">
          {books.map((item)=>(
            <div className="col-md-3">
              <div className={styles.bookCard} key={item.id}>


            <h5>{item.bookTitle}</h5>
            <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
            <button className={styles.btnBorrow} >Borrow</button>
        </div>
            </div>
          ))}
        </div>

      </div>
      

      
    )
};

export default BooksComponent; 