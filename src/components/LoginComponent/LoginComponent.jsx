import styles from "./Login.module.css"; 
import { memo, useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../schema";
import logo from "../../../src/assets/images/modernlogo.png"
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";

// import { style } from "@mui/system";

const Login = () => {
  const navigate=useNavigate();
  const onSubmit=(values,actions)=>{
    console.log(values);

    axios.post('http://localhost:3000/auth/login',{
      email:values.email,
      password:values.password
    }).then(res=>{
        const {access_token}=res.data;
        localStorage.setItem('token',access_token);
        var decoded = jwt_decode(access_token);
        console.log(decoded);
        var {roles,sub}=decoded;
        localStorage.setItem('role',roles);
        localStorage.setItem('userId',sub);
        navigate('/home');

        console.log(roles);

    }).catch(err=>{
        console.log(err);
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
            <div className="text-center">
        <img src={logo}  alt="" ></img>
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
              className={errors.firstName && touched.firstName ?"form-control input-error":"form-control"}
                type="email" aria-describedby="emailHelp" placeholder="Enter email"/>
   
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
                     type="password" aria-describedby="nameHelp" placeholder="Enter Password"/>
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
 
export default memo(Login);