import React, { useEffect, useState } from 'react';
 import styles from "./Reservation.module.css"; 
 import { Button,Modal,Input } from 'react-bootstrap';
 import { useFormik } from "formik";
 import moment from 'moment/moment';

import axios from 'axios';



const Reservations = () => {
    const [reservation,setReservation]=useState([]);

    const onSubmit=(values,actions)=>{
      console.log(values);
  
      axios.post('http://localhost:3000/publishers/',{
        
      publisherName:values.publisherName
      }).then(res=>{
        axios.get("http://localhost:3000/publishers").then(res=>{
          // setpublishers(res.data)
        }).catch(err=>{
          console.log(err);
        })
   console.log(res);
      }).catch(err=>{
   console.log(err);
      })
   
  }
 


    useEffect(()=>{

        axios.get("http://localhost:3000/reservations/").then(res=>{
            console.log(res.data);
            setReservation(res.data)
        }).catch(err=>{
            console.log(err);
        })


    },[]);

 
    
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
      bookStockId:bookStockId.id
    
    }).then(res=>{
      axios.get("http://localhost:3000/reservations/").then(res=>{
        console.log("aaaaaaa");
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
   const [resStatus,setresStatus]=useState(["pending","Active","Rejected","done"]);

    const [currentPage, setCurrentPage]= useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = reservation.slice(firstIndex,lastIndex);
    const npage = Math.ceil(reservation.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);
    return (
        <>
        <div class="container ">
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
<th> Reservarion Date </th>
<th> Due Date </th>
<th> Return Date </th>
<th> Status </th>
<th>Actions</th>
   </tr>
      </thead>
      <tbody>
        {records.map((item)=>(
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{ moment.utc(item.reservationDate).format("DD-MM-YYYY") }</td>
               <td>{ moment.utc(item.dueDate).format("DD-MM-YYYY") }</td>
                <td>{ moment.utc(item.returnDate).format("DD-MM-YYYY") }</td> 
               <td>{item.reservationStatus}</td>
            
               <td>    <button  onClick={()=>{updateDialog(item.id)}}  className="btn btn-outline-dark">Update</button>
               </td>
        
               </tr>
        ))}
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
              value={moment.utc(values.reservationDate).format('yyyy-MM-DDThh:mm:ss')}            
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
              value={moment.utc(values.dueDate).format('yyyy-MM-DDThh:mm:ss')}
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
              value={moment.utc(values.returnDate).format('yyyy-MM-DDThh:mm:ss')}
              name="returnDate"
           //  className={errors.password && touched.password ?"form-control input-error":"form-control"}
           type="datetime-local" class="form-control js-daterangepicker"/>
        </div>
       </div>

       <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1" > Status </label>
            <select
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


       <button onClick={handleEdit}>Submit</button>
  
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

<nav>
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
</nav>
</>

       
    );

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

export default Reservations;