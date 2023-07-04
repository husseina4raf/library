import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import axios from 'axios';

const OverdueBooksComponent = () => {
    const [reservation,setReservation]=useState([]);


    
    useEffect(()=>{

        axios.get(`http://localhost:3000/reservations/report/overdue`).then(res=>{
            console.log(res.data);
            setReservation(res.data)
        }).catch(err=>{
            console.log(err);
        })


    },[]);


    // const [currentPage, setCurrentPage]= useState(1)
    // const recordsPerPage = 5;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const records = reservation.slice(firstIndex,lastIndex);
    // const npage = Math.ceil(reservation.length / recordsPerPage );
    // const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <>
        <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">

</div>  
{/* <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Reservations Details</b></h2></div> */}
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th> Reservation Date </th>
<th> Due Date </th>
<th> Return Date </th>
<th> Reservation Status </th>

   </tr>
      </thead>
      <tbody>
        {reservation.map((item)=>(
            <tr key={item.id}>
               <td>{item.id}</td>
               <td>{ moment.utc(item.reservationDate).format("DD-MM-YYYY") }</td>
               <td>{ moment.utc(item.dueDate).format("DD-MM-YYYY") }</td>
                <td>{ item.returnDate !== null ? moment.utc(item.returnDate).format("MM-DD-YYYY") : "" }</td> 
               <td>{item.reservationStatus}</td>
        
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

export default OverdueBooksComponent;