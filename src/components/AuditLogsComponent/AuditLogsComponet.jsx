import React, { useEffect } from 'react';
import styles from "./AuditLogs.module.css"; 
import axios from 'axios';


const AuditLogsComponet = () => {


     // useEffect(()=>{
     //      axios.get('http://localhost:3000/books/Computer').then(res=>{
     //         compSetState(res.data);
     //        //  console.log(computerBooks);
     //      })

     useEffect(()=>{
          axios.get('http://localhost:3000/logger/').then(res=>{
               console.log(res.data);
          })
     } )



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
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Type' />

                  </div>

                  

                  
                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Body' />

                  </div>
                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"></label>
             <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder='Entity'/>

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

export default AuditLogsComponet;