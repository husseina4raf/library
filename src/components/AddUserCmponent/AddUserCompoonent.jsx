import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
 import { useFormik } from "formik";
 import axios from 'axios';

 
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
 const deleteUser=(id)=>{
  axios.delete(`http://localhost:3000/users/${id}`).then(res=>{
    axios.get("http://localhost:3000/users").then(res=>{
      setUsers(res.data)
 }).catch(err=>{
   console.log(err);
 })

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
           validationSchema:'',
           onSubmit
         });
    const [users,setUsers]=useState([]);
         useEffect(()=>{
          axios.get("http://localhost:3000/users").then(res=>{
               setUsers(res.data)
          }).catch(err=>{
            console.log(err);
          })
         },[])
 
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">
{/* <div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search Author" aria-label="Search"/>
  
  </form>
</div>     */}
</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Users Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="primary" onClick={handleShow}>
  Add New Users
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th> Full Name </th>
<th> Email </th>
<th> Phone </th>
<th> Roles </th>
<th>Actions</th>
   </tr>
      </thead>
      <tbody>
   {users.map((item)=>(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.fullName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.roles}</td>
        <td><button onClick={()=>{deleteUser(item.id)}} className="danger">Delete</button></td>
      </tr>
   ))}
  
 </tbody>
  </table>
     </div>   
 </div>  
 
 {/* <!--- Model Box ---> */}
 <div className="model_box">
      <Modal
 show={show}
 onHide={handleClose}
 backdrop="static"
 keyboard={false}
      >
 <Modal.Header closeButton>
   <Modal.Title>Add Record</Modal.Title>
 </Modal.Header>
     <Modal.Body>
     <form type="submit" onSubmit={handleSubmit}>
  <div class="form-group">
 <input
                   name="fullname"
                  onChange={handleChange}
                  value={values.fullname}
                 onBlur={handleBlur}
                 
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name"/>
 
  </div>
  <div class="form-group">
 <input  name="email"
                  onChange={handleChange}
                  value={values.email}
                 onBlur={handleBlur}
 
 type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email"/>
  </div>
  <div class="form-group">
 <input
  name="password"
  onChange={handleChange}
  value={values.password}
 onBlur={handleBlur}
  type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password"/>
  </div>
  <div class="form-group">
 <input
  name="phone"
  onChange={handleChange}
  value={values.phone}
 onBlur={handleBlur}
   type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="phone"/>
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
  
  
  
  
  
    <button type="submit" class="btn btn-success mt-4">Add </button>
  </form>
     </Modal.Body>
 
 <Modal.Footer>
   <Button variant="secondary" onClick={handleClose}>
     Close
   </Button>
   
 </Modal.Footer>
      </Modal>
  
{/* Model Box Finsihs */}
</div>  
      </div>    
      </div>  
  );
}
 
export default AddUserCompoonent;