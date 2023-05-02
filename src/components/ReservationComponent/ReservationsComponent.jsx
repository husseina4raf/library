import React from 'react';
 import styles from "./Reservation.module.css"; 



const Reservations = () => {
    return (
        <div>
             <div className="d-flex justify-content-center">
        
         <form>
                   <div className='row'>
                      <div className="col-md-12 my-3">
                  
                   <div className="form-group " >
                   <label htmlFor="exampleInputEmail1"></label>
                   <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ID' />
                  
                   </div>         
                   </div>

                   <div className="col-md-12 my-3">
                   <div className="form-group">
                   <label  htmlFor="exampleInputEmail1"></label>
                   <input type="password" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" placeholder='ReservationDate' />
                  
                   </div>
                  
                   <div className='col-md-12 my-3'>
                   <div className='form-group'>
                   <label htmlFor="exampleInputEmail1"></label>
                   <input type="phone" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" placeholder='ReturnDate' />
                  
                  
                   </div>
                  
                   <div className="col-md-12 my-3">
                   <div className="form-group">
                  
                   <label htmlFor="exampleInputEmail1"></label>
                   <input type="number" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" placeholder='ReservationStatus' />
                  
                </div >

                <div className="col-md-12 my-3" >    
                <div className="col-md-12 my-3">
                <div className="form-group">

                <label htmlFor="exampleInputEmail1"></label>
                <input type="number" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" placeholder='Due Date' />



                </div>

                </div>

                </div>
                  
                  
                  
                </div>
               
                                    
               
                                  </div>
               
                                 
                                  </div>
                                  <div>
                                    
                                       
                                  </div>
                               </div> 
           </form>
                 </div>
         </div>

       
    );
};

export default Reservations;