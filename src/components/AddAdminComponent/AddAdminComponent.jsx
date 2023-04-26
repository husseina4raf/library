
import React from 'react';
import styles from "./AddAdmin.module.css"; 

const AddAdminComponent = () => {
    return (
        <div>
        <div className='d-flex justify-content-center my-4'>
    
<form>
          <div className="row">
             <div className="col-md-12">

             <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Id</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Full Name</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Email</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Created At</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Phone</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                  </div>
    


             </div>

       
             <div className="col-md-12 my-3">
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input type="password" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" />
             
              </div>
             
             </div>
             <div>
                
                  <div className="text-center mt-7 ">
                     <button className={styles.SubmitBt}>  Submit </button>
                 </div> 
             </div>
          </div> 
          </form>
    </div>
    </div>
    );
};

export default AddAdminComponent;
