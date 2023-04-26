import React from 'react';
import styles from "./AddAuthor.module.css"; 
import axios from 'axios';
import { useFormik } from "formik";



const AddAuthorComponent = () => {

const onSubmit=(values,actions)=>{
    console.log(values);

    axios.post('http://localhost:3000/authors/',{
      
    authorName:values.authorName
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
}

const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues: {
        authorName:'',   
      
    },
    validationSchema:'',
    onSubmit
  });


    return (
        <div>
        <div className="d-flex justify-content-center">
    
<form type= 'submit' onSubmit={handleSubmit} >
          <div className="row">
             <div className="col-md-12s">

             <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Author Name</label>
             <input 
             type="text"
             name='authorName'
             className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              onChange={handleChange}
              value={values.authorName}
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
    );
};

export default AddAuthorComponent;