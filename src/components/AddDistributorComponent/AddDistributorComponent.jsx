import React from 'react';
import styles from "./AddDistributor.module.css"; 
import axios from 'axios';
import { useFormik } from "formik";
import { useEffect } from 'react';


const AddDistributorComponent = () => {

    const onSubmit=(values,actions)=>{
        console.log(values);
    
        axios.post('http://localhost:3000/distributors/',{
          
        DistributorName:values.DistributorName
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues: {
            DistributorName:'',   
          
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
             <label htmlFor="exampleInputEmail1">Distributor Name</label>
             <input 
             type="text"
             name='DistributorName'
             className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              onChange={handleChange}
              value={values.DistributorName}
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

export default AddDistributorComponent;