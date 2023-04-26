import React from 'react';
import styles from "./AddBook.module.css"; 


const AddBookComponent = () => {
    return (
        <div>
        <div className="d-flex justify-content-center">
    
<form>
          <div className="row my-5">
             <div className="col-md-12">

             <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">ID</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Book Title</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> Subject </label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> Edition Number </label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">No_Of_Pages</label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
                  {/* <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Author'/>

                  </div> */}
    
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

export default AddBookComponent;