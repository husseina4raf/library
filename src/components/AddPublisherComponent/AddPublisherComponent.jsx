import React from 'react';
import styles from "./AddPublisher.module.css"; 
import axios from 'axios';
import { useFormik } from "formik";

const AddPublisherComponent = () => {

    const onSubmit=(values,actions)=>{
        console.log(values);
    
        axios.post('http://localhost:3000/publishers/',{
          
        publisherName:values.publisherName
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues: {
            publisherName:'',   
          
        },
        validationSchema:'',
        onSubmit
      });


    return (
        <div>
               <div>
        <div className="d-flex justify-content-center">
    
<form type= 'submit' onSubmit={handleSubmit} >
          <div className="row">
             <div className="col-md-12s">

             <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Publisher Name</label>
             <input 
             type="text"
             name='publisherName'
             className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              onChange={handleChange}
              value={values.publisherName}
              onBlur={handleBlur} />

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
        </div>
    );
};

export default AddPublisherComponent;