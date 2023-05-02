import React from 'react';
import styles from "./Profile.module.css"; 


const ProfileComponet = () => {


    
    return (

        <div>
            <div className="d-flex justify-content-center">
        
<form>
              <div className="row my-4">
                 <div className="col-md-12">
 
                 <div className="form-group my-3">
                 <label htmlFor="exampleInputEmail1">User ID</label>
                 <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
                      </div>
        


                 </div>

           
                 <div className="col-md-12 my-3">
                   <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Password</label>
                      <input type="password" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" />
                 
                  </div>

                  <div className='col-md-12 my-3'>
                     <div className='form-group'>
                     <label htmlFor="exampleInputEmail1">Role</label>
                      <input type="phone" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" />


                     </div>

                     
                    

                  </div>

                 
                 </div>
                 <div>
                    
                      <div className="text-center mt-7 ">
                         <button className={styles.SubmitBtn}>  Submit </button>
                     </div> 
                 </div>
              </div> 
              </form>
        </div>
        </div>
    );
};

export default ProfileComponet;