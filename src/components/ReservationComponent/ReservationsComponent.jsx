import React, { useEffect, useState } from 'react';
 import styles from "./Reservation.module.css"; 
import axios from 'axios';



const Reservations = () => {
    const [reservation,setReservation]=useState([]);

    useEffect(()=>{

        axios.get("http://localhost:3000/reservations/").then(res=>{
            console.log(res.data);
            setReservation(res.data)
        }).catch(err=>{
            console.log(err);
        })


    },[]);

    const actionReservation=(id,status)=>{
        axios.put(`http://localhost:3000/reservations/${id}`,{
            "reservationStatus": status,
        }).then(res=>{
            if(res.status==200){
                axios.get("http://localhost:3000/reservations/").then(res=>{
                    console.log(res.data);
                    setReservation(res.data)
                }).catch(err=>{
                    console.log(err);
                })
            }
        })
    }
    return (
        <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">
<div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search Book" aria-label="Search"/>
  
  </form>
</div>    
</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Reservations Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th> Reservarion Date </th>
<th> Due Date </th>
<th> Status </th>
<th>Actions</th>
   </tr>
      </thead>
      <tbody>
        {reservation.map((item)=>(
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{item.reservationDate}</td>
               <td>{item.dueDate}</td>
               <td>{item.reservationStatus}</td>
               {item.reservationStatus==="pending" &&
               <td><button onClick={()=>{actionReservation(item.id,"done")}}>Accept</button> <button onClick={()=>{actionReservation(item.id,"Rejected")}}>Reject</button></td>
        }
               </tr>
        ))}
     <tr>

     </tr>
  
 </tbody>
  </table>
     </div>   
 </div>  
   

      </div>    
      </div>  

       
    );
};

export default Reservations;