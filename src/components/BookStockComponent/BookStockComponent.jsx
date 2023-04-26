import React from 'react';
import styles from "./BookStock.module.css"; 


const BookStockComponent = () => {
    return (
        <div>
        <div className="d-flex justify-content-center">
    
<form>
          <div className="row my-5">
             <div className="col-md-12">

             <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ID' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='BookStock' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Shelf' />

                  </div>

                  {/* <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Copywrite_year' />

                  </div> */}
                  {/* <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='No_Of_Pages' />

                  </div>
                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Author'/>

                  </div>
    
             </div>       
             <div className="col-md-12 my-3">
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1"></label>
                  <input type="password" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" placeholder='Publisher' />
             
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

export default BookStockComponent;