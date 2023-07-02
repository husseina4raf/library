import styles from "./Register.module.css"; 
import logo from "../../../src/assets/images/modernlogo.png"
import { useFormik } from "formik";
import { basicSchema } from "../schema";
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';

import axios from 'axios';


const Register = () => {
   
  const [done, setDone] = useState('');
  const [error, setErorr] = useState('');


    const onSubmit=(values,actions)=>{
        console.log(values);
        console.log(actions);
        console.log(values);
        console.log("Submited");
        axios.post(`http://localhost:3000/users/signup`,{
          
           fullName:values.firstName+values.lastName,
            email: values.email,
            phone:values.phone,
            password:values.password,
            roles: ["User"]
          
      }).then(res=>{
              setDone("Success");
            setTimeout(()=>{
              setDone("")
             }, 3000)
                 
      }).catch(err=>{
        setErorr(err.response.data.message.message);
        setTimeout(()=>{
          setErorr("")
         }, 3000)
              })
              
    }
    const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone:'',
          password:'',
          confirmpassword:''
        },
        validationSchema:basicSchema,
        onSubmit
      });

    return ( 
        <>
        <img src={logo} className={styles.logo} alt="Modren-logo"></img>
        <div className="container my-4">

            <h2 className="mt-3">Sign Up</h2>
             <p className="FF ">Already have account? <NavLink className={styles.achnor} to="/login">Sign In</NavLink></p>
          <form  type="submit" onSubmit={handleSubmit} >
             <div className="row">
                <div className="col-md-6">
                  <div className="form-group ">
                     <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                     <input 
                        onChange={handleChange}
                        value={values.firstName}
                        onBlur={handleBlur}
                      className={errors.firstName && touched.firstName ?"form-control input-error":"form-control"}
                      name="firstName"
                     type="text"  id="exampleInputname1" aria-describedby="nameHelp" placeholder="Enter First Name" required />
                          
                          {errors.firstName && touched.firstName && <p className="errors">{errors.firstName}</p>}
                 </div>
                </div>
                <div className="col-md-6">
                <div className="form-group ">
                     <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                     <input 
                       onChange={handleChange}
                       value={values.lastName}
                       onBlur={handleBlur}
                       name="lastName"
                     type="text" 
                     className={errors.lastName && touched.lastName ?"form-control input-error":"form-control"}
                     placeholder="Enter Last Name" required
                     />
                     {errors.lastName && touched.lastName && <p className="errors">{errors.lastName}</p>}
                      
                 </div>
                </div> 
                <div className="col-md-12 my-3">
 
                <div className="form-group my-3 " >
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input 
                  
                  onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    name="email"
                type="email" 
                className={errors.email && touched.email ?"form-control input-error":"form-control"}
                
                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                />
                   {errors.email && touched.email && <p className="errors">{errors.email}</p>}          
                     </div>
                <div className="form-group my-3 " >
                <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                <input 
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                  name="phone"
                type="text" 
                className={errors.phone && touched.phone ?"form-control input-error":"form-control"}
                 
                id="exampleInputPassword1" placeholder="Password"
                />
                 {errors.phone && touched.phone && <p className="errors">{errors.phone}</p>}
                    </div>
                </div>

           
                <div className="col-md-6 my-3">
                  <div className="form-group ">
                     <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                     <input 
                       onChange={handleChange}
                       value={values.password}
                       onBlur={handleBlur}
                       name="password"
                     
                     type="password"  id="exampleInputpassword1"
                     className={errors.password && touched.password ?"form-control input-error":"form-control"}
                     
                     aria-describedby="nameHelp" placeholder="Enter Password"
                     />
                     {errors.password && touched.password && <p className="errors">{errors.password}</p>}
         
                 </div>
                </div>
                <div className="col-md-6 my-3">
                <div className="form-group ">
                     <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label>
                     <input 
                        onChange={handleChange}
                        value={values.confirmpassword}
                        onBlur={handleBlur}
                        name="confirmpassword"
                     type="password" 
                     className={errors.confirmpassword && touched.confirmpassword ?"form-control input-error":"form-control"}
                     
                     placeholder="Enter Confirm Password"
                     />
                     {errors.confirmpassword && touched.confirmpassword && <p className="errors">Passwords are not matchs</p>}
               
                 </div>
                </div> 
                <div>
                {done && <Alert className={styles.alert2} variant="filled" severity="success">
                                                               {done}
                                                          </Alert>}
  {error && <Alert className={styles.alert2} variant="filled" severity="error">
    {error}
       </Alert>}
               
             <div className="text-center mt-3 " >
                        <button className={styles.SinBtn}>Sign Up</button>
                    </div>
             
                </div>
             </div> 
             </form>
        </div>
        </>
     );
}
 
export default Register;