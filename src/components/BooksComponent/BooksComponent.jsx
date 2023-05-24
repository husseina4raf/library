import React, { useEffect, useState ,useContext} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Books.module.css';
import { useFormik } from "formik";
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { UserConsumer, UserContext } from '../../context';
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
const BooksComponent = () => {

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
  

  
const {userBook,updateBookname}=useContext(UserContext)
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
          // setTasBook(res.data.books);
                 
      }).catch(err=>{
        console.log(err);
      })
 
        axios.get("http://localhost:3000/books/").then(res=>{
                console.log(res.data);
                updateBookname(res.data)
        }).catch(err=>{
          console.log(err);
        })

      },[])
     const sortedBooks=(param)=>{
      axios.get(`http://localhost:3000/books/showby/${param}`).then(res=>{
        updateBookname(res.data);
      })
       console.log(param);
     }

    
    //  const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
    //   initialValues: {
    //    bookName:'',   
        
    //   },
    //   validationSchema:'',
    //   enableReinitialize:true,
    // });

     const [currentPage, setCurrentPage]= useState(1)
     const recordsPerPage = 20;
     const lastIndex = currentPage * recordsPerPage;
     const firstIndex = lastIndex - recordsPerPage;
     const records = userBook.slice(firstIndex,lastIndex);
     const npage = Math.ceil(userBook.length / recordsPerPage);
     const numbers = [...Array(npage+1).keys()].slice(1);
  console.log(UserConsumer);


    return (

    <>
<UserConsumer>
{({ userBook ,updateBookname}) =>(<div className="container">

            <Dropdown as={styles.ButtonGroup}>

              <Button variant="success">Split Button</Button>

              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

              <Dropdown.Menu>

                <Dropdown.Item onClick={() => { sortedBooks("copyyear"); } }>Copy Year</Dropdown.Item>
                <Dropdown.Item onClick={() => { sortedBooks("genre"); } }>Genre</Dropdown.Item>
                <Dropdown.Item onClick={() => { sortedBooks("atoz"); } }>A~Z</Dropdown.Item>
                <Dropdown.Item onClick={() => { sortedBooks("ztoa"); } }>Z~A</Dropdown.Item>


              </Dropdown.Menu>

            </Dropdown>
            {/* <form>
              <input
                type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search By Name" name="message"
                value={userBook}
                  
                />
                

            </form> */}
            {/* {updateBookname(books)} */}
            <h6 className='my-3'>Books Based On Your Taste</h6>
             
            <div className="row my-5">
              {records.map((item) => (
                <div className="col-md-3">
                  <div className={styles.bookCard} key={item.id}>


                    <h5>{item.bookTitle}</h5>
                    <img className='img-fluid' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book Cover" />
                    <button onClick={()=>{openModal(item.id)}} className={styles.btnBorrow} >Borrow</button>
                  </div>
                </div>
              ))}
            </div>

          
          <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a className='page-link'
                    onClick={prePage}> Prev </a>

                </li>
                {numbers.map((n, i) => {
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a className='page-link'
                      onClick={() => changeCPage(n)}>{n}</a>
                  </li>;


                })}
                <li className='page-item'>
                  <a className='page-link'
                    onClick={nextPage}> Next </a>

                </li>


              </ul>
          
            </nav>
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
    )}
      </UserConsumer>      
      </>
      

      
    )

    function prePage(){
      if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
      }
      
    }
    function changeCPage(id){
      setCurrentPage(id)
      
    }
    function nextPage(){
      if(currentPage !== npage){
        setCurrentPage(currentPage + 1)
      }
    
    }
};

export default BooksComponent; 