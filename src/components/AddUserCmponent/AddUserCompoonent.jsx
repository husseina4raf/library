import React from 'react';
import styles from "./AddUser.module.css"; 
import { useFormik } from "formik";
import axios from 'axios';
import { AddUserSchema } from "../schema";

const AddUserCompoonent = () => {

     const onSubmit=(values,actions)=>{
          console.log(values);
      
          axios.post('http://localhost:3000/users/signup',{
            fullName:values.fullname,
            email:values.email,
            phone:values.phone,
            password:values.password,
            roles:[values.role]
          }).then(res=>{
              console.log(res);
          }).catch(err=>{
              console.log(err);
          })
      }

     const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
          initialValues: {
            fullname:'',   
            email: '',
            phone:'',
            password:'',
            role:''
          },
          // validationSchema:AddUserSchema,
          onSubmit
        });
      
    return (
        <div>
            <div className='d-flex justify-content-center my-4'>
        
             <form type="submit" onSubmit={handleSubmit}>
              <div className="row">
                 <div className="col-md-12">

                      <div className="form-group my-3">
                 <label htmlFor="exampleInputEmail1">Full Name</label>
                 <input type="text" 
                  name="fullname"
                  onChange={handleChange}
                  value={values.fullname}
                  onBlur={handleBlur}
                 className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
                      </div>

                      <div className="form-group my-3">
                 <label htmlFor="exampleInputEmail1">Email</label>
                 <input
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                 type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
                      </div>

                      <div className="form-group my-3">
                 <label htmlFor="exampleInputEmail1">Phone</label>
                 <input
                 
                 name="phone"
                 onChange={handleChange}
                 value={values.phone}
                 onBlur={handleBlur}
                 
                 type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
                      </div>
        


                 </div>

           
                 <div className="col-md-12 my-3">
                   <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Password</label>
                      <input
                         name="password"
                         onChange={handleChange}
                         value={values.password}
                         onBlur={handleBlur}
                      type="password" className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" />
                 
                  </div>
                 
                 </div>
                 <div className="col-md-12 my-3">
                   <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Role</label>
                      <select
                      name='role'
                      onChange={handleChange}
                         value={values.role}
                         onBlur={handleBlur}
                      >
                            <option value="" label="SelectRole">
                         Select Role
                        </option>
                        <option  value="SuperAdmin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                 
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

export default AddUserCompoonent;