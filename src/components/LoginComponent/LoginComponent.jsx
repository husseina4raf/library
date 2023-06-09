import styles from "./Login.module.css"; 
// import { memo, useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../schema";
import logo from "../../../src/assets/images/modernlogo.png"
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useState } from "react";
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';



// import { style } from "@mui/system";

const Login = () => {
  const navigate=useNavigate();
    const [error, setErorr] = useState('');

  const onSubmit=(values,actions)=>{
    console.log(values);
    axios.post('http://localhost:3000/auth/login',{
      email:values.email,
      password:values.password
    }).then(res=>{
      console.log(res);
        const {access_token}=res.data;
        localStorage.setItem('token',access_token);
        var decoded = jwt_decode(access_token);
        console.log(decoded);
        var {roles,sub}=decoded;
        localStorage.setItem('role',roles);
        localStorage.setItem('userId',sub);
        localStorage.setItem('role',roles);
        localStorage.setItem('adminId',sub);
        document.location.assign('/home');

        console.log(roles);

    }).catch(err=>{
        setErorr(err.response.data.message.message);
        setTimeout(()=>{
          setErorr("")
         }, 3000)
    })
    
}
const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validationSchema:LoginSchema,
    onSubmit
  });

    return ( 
        
        <>
        
        <div className="container my-4">
            <div className="text-center d-flex justify-content-center position-relative">
        <img src={logo}  alt="" />
        {error && <Alert className={styles.alert} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
            </div>
            

          <form type="submit" onSubmit={handleSubmit} >
             <div className="row">
                <div className="col-md-12 my-3">
               
                <div class="form-group my-3">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              className={errors.email && touched.email ?"form-control input-error":"form-control"}
                type="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                          {errors.email && touched.email && <p className="errors">{errors.email}</p>}

   
                     </div>
        


                </div>

           
                <div className="col-md-12 my-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputEmail1">Password</label>
                     <input
                       onChange={handleChange}
                       value={values.password}
                       onBlur={handleBlur}
                       name="password"
                     className={errors.password && touched.password ?"form-control input-error":"form-control"}
                     type="password" aria-describedby="nameHelp" placeholder="Enter Password" />
                                          {errors.password && touched.password && <p className="errors">{errors.password}</p>}
                                          
                   
                 </div>
                </div>
                
                <div>
                    <div className={styles.actions}>
                        <NavLink className={styles.achnor} to="/register">Register</NavLink>
                        <NavLink className={styles.achnor} to="/forgetpassword">Forget Password</NavLink>
                    </div>
                    <div className="text-center mt-5">
                        <button className={styles.loginBtn}>Login</button>
                    </div>
                </div>
             </div> 
             </form>
        </div>


        
        </>
     );
}
 
export default Login;