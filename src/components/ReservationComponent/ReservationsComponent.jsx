import React, { useEffect, useState } from 'react';
 import styles from "./Reservation.module.css"; 
 import { Button,Modal,Input } from 'react-bootstrap';
 import { useFormik } from "formik";
 import moment from 'moment/moment';
 import Alert from '@mui/material/Alert';
import axios from 'axios';



const Reservations = () => {
    const [reservation,setReservation]=useState([]);
    const [Users,setUsers]=useState([]);
    const [error, setErorr] = useState('');
    const [shelf,setShelf]=useState([]);
    const [book,setBook]=useState([]);
    const [theArray, setTheArray] = useState([]);
    const onSubmit=(values,actions)=>{
      console.log(values);
  

   
  }
  const [params,setParams]=useState({});



    useEffect(()=>{

        axios.get("http://localhost:3000/reservations/getReservations").then(res=>{
            console.log(res.data);

            setReservation(res.data)
        }).catch(err=>{
            console.log(err);
        })


        axios.get("http://localhost:3000/users").then(res=>{
          setUsers(res.data)
     }).catch(err=>{
       console.log(err);
     })
        axios.get("http://localhost:3000/book-stocks/").then(res=>{
          setShelf(res.data)
     }).catch(err=>{
       console.log(err);
     })

        axios.get("http://localhost:3000/books/").then(res=>{
          setBook(res.data)
     }).catch(err=>{
       console.log(err);
     })

     



    },[]);

    useEffect(()=>{
      
      for(var i=0;i<reservation.length;i++){
        axios.get(`http://localhost:3000/books/stock/${reservation[i].id}`).then(res=>{
         
          setTheArray(oldarr=>[...oldarr,res.data])
           console.log(theArray);
         }).catch(err=>{
           console.log(err);
         })
      }


    },[reservation])

  const [bookstocks,setBookStocks]=useState([]);
 
    const  getBookStock=  (id)=> 
        axios.get(`http://localhost:3000/books/stock/${id}`).then(res=>{
           console.log(res.data);
          }).catch(err=>{
            console.log(err);
          })

  
    
     const [updateState, setUpdateState] = useState(-1)

          
    const [show, setShow] = useState(false);
    const [showUpdate,setShowUpdate]=useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
      initialValues: {
        reservationDate:'', 
        dueDate:'' ,
        returnDate:'',
        reservationStatus:'',
        userId:'',
        bookStockId:''
        
      },
      validationSchema:'',
      enableReinitialize:true,
      onSubmit
    });
    const updateDialog=(id)=>{
      console.log(id);
      setUpdateState(id);
    axios.get(`http://localhost:3000/reservations/${id}`).then(res=>{
      const{reservationDate,dueDate,returnDate,reservationStatus,userId,bookStockId}=res.data[0] 
      setValues({reservationDate,dueDate,returnDate,reservationStatus,userId,bookStockId});

      // console.log(reservationDate,moment.utc(reservationDate).format('dd-MM-yyyy HH:mm:ss'));
    }).catch(err=>{
      console.log(err);
    })

    setShowUpdate(true);
    console.log(id);
  }
  const handleCloseUpdate=()=>{
    setShowUpdate(false);
    // setValues({publisherName:''})
    axios.get("http://localhost:3000/reservations/getReservations").then(res=>{
      console.log(res.data);
      setReservation(res.data)
  }).catch(err=>{
      console.log(err);
  })  
  }

  const handleEdit=(e)=>{
    const {bookStockId,dueDate,reservationDate,reservationStatus,returnDate,userId}=values;
    e.preventDefault();
    console.log(values);
    axios.put(`http://localhost:3000/reservations/${updateState}`,{
      reservationDate,
      dueDate,
      reservationStatus,
      returnDate,
      userId:userId.id,
      bookStockId:bookStockId.id,
    
    }).then(res=>{
      axios.get("http://localhost:3000/reservations/getReservations").then(res=>{
        setReservation(res.data)
        setShowUpdate(false)
        // setValues({publishersName:''})
   }).catch(err=>{
     console.log(err);
   })
    }).catch(err=>{
      console.log(err);
    })
 
  }


  const deleteReservations=(id)=>{
    axios.delete(`http://localhost:3000/reservations/${id}`).then(res=>{
      axios.get("http://localhost:3000/reservations/getReservations").then(res=>{
        setReservation(res.data)
       
   }).catch(err=>{
     console.log(err);
   })
  
    }).catch(err=>{
      console.log(err);
    })
   }

   const [resStatus,setresStatus]=useState(["pending","Active","Rejected","done","Accepted","Late"]);
    
   const filterValue=(e)=>{
    //  console.log("hello");
     let prop=e.target.name
    // params[prop]=e.target.value
    // const {name,value}=e.target
    console.log(params);
    setParams({...params, [e.target.name]:e.target.value})  

    }


    useEffect(()=>{
      axios.get(`http://localhost:3000/reservations/getReservations`,{params}).then(res=>{
        console.log(res.data);
        setReservation(res.data)
     }).catch(err=>{
        console.log(err);
     })
    },[params])


//     const filterValue=(e)=>{
//       if(e.target.name ==="reservationDate" || e.target.name=== "dueDate"){
// const data=e.target.value;
// const formatt=data;
// console.log(formatt);
// axios.get(`http://localhost:3000/reservations/getReservations?${e.target.name}=${formatt}`).then(res=>{
//   console.log(res.data);
//   setReservation(res.data)
// }).catch(err=>{
//   console.log(err);
// })
// }else{
//   // console.log(e.target.name);
//   // console.log(e.target.value);

//   axios.get(`http://localhost:3000/reservations/getReservations?${e.target.name}=${e.target.value}`).then(res=>{
//    console.log(res.data);
//    setReservation(res.data)
// }).catch(err=>{
//    console.log(err);
// })
// }
    
    

//     }
    return (
        <>
        <div class="container-fluid ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"id={styles.res}> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">

</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" id={styles.LL}><h2><b>Reservations Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered" id={styles.TT}>
      <thead>
   <tr>
<th>ID</th>
<th>Reservation Date
<div className="col-md-12 my-3">
             

             <div className="form-group">
               <input
                 onChange={filterValue}
               
                 name="reservationDate"
               type="date" class="form-control js-daterangepicker"/>
             </div>
           </div>

   </th>
<th> Due Date
<div className="col-md-12 my-3">
             

             <div className="form-group">
               <input
                 onChange={filterValue}
               
                 name="dueDate"
               type="date" class="form-control js-daterangepicker"/>
             </div>
           </div>
   </th>

<th> Return Date 
<div className="col-md-12 my-3">
             

             <div className="form-group">
               <input
                 onChange={filterValue}
               
                 name="returnDate"
               type="date" class="form-control js-daterangepicker"/>
             </div>
           </div>

</th>
<th> Status

           <div className="col-md-12">
             

             <div className="form-group w-75">


                <select
                className="form-control "

                     name='reservationStatus'
                     onChange={filterValue}
                      
                     >
                         <option value='' >Filter</option>
                         <option  value="Rejected">Rejected</option>
                         <option  value="pending">pending</option>
                         <option  value="Active">Active</option>
                         <option  value="Done">done</option>
                         <option  value="Late">Late</option>
                         <option  value="Accepted">Accepted</option>
                       
                       
                       
                     </select>


             </div>
           </div>
   </th>
<th>User Name

<div className="col-md-12">
             

             <div className="form-group w-75">


                <select
                className="form-control "

                     name='userId'
                     onChange={filterValue}
                      
                     >
                       <option value='' >Filter</option>
                         {Users.map(u=>(
                          <option value={u.id} >{u.fullName}</option>
                         ))}
                       
                       
                       
                     </select>


             </div>
           </div>


</th>

<th>Shelf

<div className="col-md-12">
             

             <div className="form-group w-75">


                <select
                className="form-control "

                     name='bookStockId'
                     onChange={filterValue}
                      
                     >
                       <option value='' >Filter</option>
                         {shelf.map(u=>(
                          <option value={u.id} >{u.shelf}</option>
                         ))}
                       
                       
                       
                     </select>


             </div>
           </div>


</th>

<th>Book Title 

<div className="col-md-12">
             

             <div className="form-group w-75">


                <select
                className="form-control "

                     name='bookStockId'
                     onChange={filterValue}
                      
                     >
                       <option value='' >Filter</option>
                         {book.map(u=>(
                          <option value={u.id} >{u.bookTitle}</option>
                         ))}
                       
                       
                       
                     </select>


             </div>
           </div>


</th>

<th>BookStock</th>

<th>Actions</th>
   </tr>
      </thead>
      <tbody>
   
        {reservation.map((item,index)=>(
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{ moment.utc(item.reservationDate).format("MM-DD-YYYY") }</td>
               <td>{ moment.utc(item.dueDate).format("MM-DD-YYYY") }</td>
                <td>{ item.returnDate !== null ? moment.utc(item.returnDate).format("MM-DD-YYYY") : "N/A"  }</td> 
               <td>{item.reservationStatus}</td>
               <td>{item.userId?.fullName}</td>
               <td>{item.bookStockId?.shelf}</td>
               <td>{item.bookStockId && item.bookStockId.book ? item.bookStockId.book.bookTitle : 'N/A'}</td>
               <td>{theArray[index]}</td>
              
               <td >
        <button  onClick={()=>{deleteReservations(item.id)}} className="btn btn-danger">Delete</button>
        </td>
        <td >

          <button  onClick={()=>{updateDialog(item.id)}}  className="btn btn-outline-dark ">Update</button>
          
          </td>
        
               </tr>
        )).reverse()}
     <tr>

     </tr>
  
 </tbody>
  </table>
     </div>   
 </div>  
 <div className="model_box">
      <Modal
 show={showUpdate}
 onHide={handleCloseUpdate}
 backdrop="static"
 keyboard={false}
      >
 <Modal.Header closeButton>
   <Modal.Title>Update</Modal.Title>
 </Modal.Header>
     <Modal.Body>
     <form>

<div className="col-md-12 my-3">
         <div className="form-group">
            <label htmlFor="exampleInputEmail1">Reservation Date</label>
            <input
              onChange={handleChange}
              value={moment.utc(values.reservationDate).format('yyyy-MM-DD')}            
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
              value={moment.utc(values.dueDate).format('yyyy-MM-DD')}
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
              value={moment.utc(values.returnDate).format('yyyy-MM-DD')}
              name="returnDate"
           //  className={errors.password && touched.password ?"form-control input-error":"form-control"}
           type="datetime-local" class="form-control js-daterangepicker"/>
        </div>
       </div>

       <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1" > Status </label>
            <select
                 className="form-control w-25 d-inline-block"

                      name='reservationStatus'
                      onChange={handleChange}
                         value={values.reservationStatus}
                         onBlur={handleBlur}
                      >
                        {resStatus.map((item)=>(
                          <option  selected={(values.reservationStatus == item)?"selected":''} value={item}>{item}  </option>
                           
                          ))}
                        
                      </select>
                  </div>

   <button  type="submit" class="btn btn-outline-dark w-25 " onClick={handleEdit}>Submit</button>

</form>
     </Modal.Body>
 
 <Modal.Footer>
   <Button variant="secondary" onClick={handleClose}>
     Close
   </Button>
   
 </Modal.Footer>
      </Modal>
  
{/* Model Box Finsihs */}
</div> 


      </div>    
      </div>  

{/* <nav>
<ul className='pagination'>
  <li className='page-item'>
    <a  className='page-link'
    onClick={prePage}> Prev </a>

  </li>
  {
    numbers.map((n, i)=>{
      <li className={`page-item ${currentPage === n ? 'active' : '' }` } key={i}>
        <a  className='page-link' 
        onClick={ ()=> changeCPage(n)}>{n}</a>
      </li>
      

    })
  }
   <li className='page-item'>
    <a className='page-link'
    onClick={nextPage}> Next </a>

  </li>


</ul>
</nav> */}
</>

       
    );

    // function prePage(){
    //     if(currentPage !== 1){
    //       setCurrentPage(currentPage - 1)
    //     }
        
    //   }
    //   function changeCPage(id){
    //     setCurrentPage(id)
        
    //   }
    //   function nextPage(){
    //     if(currentPage !== npage){
    //       setCurrentPage(currentPage + 1)
    //     }
      
    //   }
};

export default Reservations;