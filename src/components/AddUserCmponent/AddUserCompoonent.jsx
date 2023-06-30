import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import styles from './AddUser.module.css'
import { AddUserSchema } from "../schema";
import Alert from '@mui/material/Alert';




 import { useFormik } from "formik";
 import axios from 'axios';

 
 const AddUserCompoonent = () => {
  const superAdminRole=localStorage.getItem('role');

  
  const adminRole=localStorage.getItem('role');
  const [error, setErorr] = useState('');


   const onSubmit=(values,actions)=>{
           console.log(values);
      
           axios.post('http://localhost:3000/users/signup',{
             fullName:values.fullName,
             email:values.email,
             phone:values.phone,
             password:values.password,
             roles:[values.role]
           }).then(res=>{
handleClose()
            setErorr("User Added");
            setTimeout(()=>{
              setErorr("")
             }, 3000)

              axios.get("http://localhost:3000/users").then(res=>{
                setUsers(res.data)
                setValues({fullName:'',email:'',password:'',phone:'',roles:''  })


              }).catch(err=>{
                console.log(err);
              })
         console.log(res);
            }).catch(err=>{
         console.log(err);
            })
       }
        const [users,setUsers]=useState([]);
         useEffect(()=>{
          axios.get("http://localhost:3000/users").then(res=>{
               setUsers(res.data)
          }).catch(err=>{
            console.log(err);
          })
         },[])
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
      const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
           initialValues: {
             fullName:'',   
             email: '',
             phone:'',
             password:'',
             roles:''
           },
           validationSchema:AddUserSchema,
           enableReinitialize:true,
           onSubmit
         });
   
 
         const [updateState, setUpdateState] = useState(-1)

    const [show, setShow] = useState(false);
    const [showUpdate,setShowUpdate]=useState(false);

 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      const updateDialog=(id)=>{
        setUpdateState(id);
      axios.get(`http://localhost:3000/users/${id}`).then(res=>{
           console.log(res.data);
        const{
          fullName,
          email,
          phone,
          password,
          roles }=res.data   
      setValues({fullName,email,phone,password,roles})     
      }).catch(err=>{
        console.log(err);
      })

      setShowUpdate(true);
      console.log(id);
    }
    const handleCloseUpdate=()=>{
      setShowUpdate(false);
      setValues({fullName:'',email:'',password:'',phone:'',roles:''  })
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/users/${updateState}`,values).then(res=>{
        axios.get("http://localhost:3000/users/").then(res=>{
          setUsers(res.data)
          setShowUpdate(false)
          setValues({fullname:'',email:'',password:'',phone:'',role:'' })
     }).catch(err=>{
       console.log(err);
     })
      }).catch(err=>{
        console.log(err);
      })
     }
     
    const [currentPage, setCurrentPage]= useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex,lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const [search, setSearch] = useState('');

  return (
    <>
 
       <div className="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded position-relative"> 
{error && <Alert className={styles.alert} variant="filled" severity="success">
                                                               {error}
                                                          </Alert>}
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred ">
      
    <div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search " aria-label="Search"
   onChange={(e)=> setSearch(e.target.value)}
   

   />
  
  </form>
</div> 
</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" id={styles.gg}><h2><b>Users Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="secondary" onClick={handleShow} id={styles.dd}>
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
    {records
    .filter((item) =>{
      return search.toLowerCase() === '' ? item :item.fullName.toLowerCase().includes(search)
    })
    .map((item)=>(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.fullName}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.roles}</td>
        

        <td >
        <button  onClick={()=>{deleteUser(item.id)}} className="btn btn-danger">Delete</button>
          <button  onClick={()=>{updateDialog(item.id)}}  className="btn btn-outline-dark ">Update</button>
          
          </td>
      </tr>
   ))}
 </tbody>
  </table>
     </div>   
 </div>  
 
 {/* <!--- Model Box ---> */}
 <div className="model_box">
      <Modal className={styles.MM}
 show={show}
 onHide={handleClose}
 backdrop="static"
 keyboard={false}
      >
 <Modal.Header closeButton>
   <Modal.Title>Add Record</Modal.Title>
 </Modal.Header>
     <Modal.Body className={styles.Modal}> 
     <form type="submit" onSubmit={handleSubmit} >
      <div className="container">
  <div class="form-group" >
 <input 
                   name="fullName"
                  onChange={handleChange}
                  value={values.fullName}
                 onBlur={handleBlur}
                 className={errors.fullName && touched.fullName ?"form-control input-error":"form-control"}

                 
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name" />
                             {errors.fullName && touched.fullName && <p className="errors">{errors.fullName}</p>}

  </div>
  <div class="form-group">
 <input  name="email"
                  onChange={handleChange}
                  value={values.email}
                 onBlur={handleBlur}

                 className={errors.email && touched.email ?"form-control input-error":"form-control"}

 type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" />
                             {errors.email && touched.email && <p className="errors">{errors.email}</p>}

  </div>
  <div class="form-group">
 <input
  name="password"
  onChange={handleChange}
  value={values.password}
 onBlur={handleBlur}
 className={errors.password && touched.password ?"form-control input-error":"form-control"}

  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password" />
                             {errors.password && touched.password && <p className="errors">{errors.password}</p>}

  </div>
  <div class="form-group">
 <input
  name="phone"
  onChange={handleChange}
  value={values.phone}
 onBlur={handleBlur}
 className={errors.phone && touched.phone ?"form-control input-error":"form-control"}

   type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="phone" />
                               {errors.phone && touched.phone && <p className="errors">{errors.phone}</p>}

  </div>
  <div className="form-group">
  <div className="form-group text-start">
     <label htmlFor="exampleInputEmail1">Role :</label>
     <select
     className="form-control w-25 d-inline-block"
     name='role'
     onChange={handleChange}
        value={values.role}
        onBlur={handleBlur}
     > 
     
     
           <option value="" label="SelectRole">
        Select Role
       </option>
       {adminRole!== "Admin" &&
        <option  value="SuperAdmin">Super Admin</option>
        }
       <option   value="Admin">Admin</option>
       <option value="User">User</option>
     </select>
                 
</div>
</div>
</div>
  
  <div className="from-control ">
<button  type="submit" class="btn btn-outline-dark w-25 ">Add </button>

  </div>
  
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
  

<div className="model_box">
      <Modal
 show={showUpdate}
 onHide={handleCloseUpdate}
 backdrop="static"
 keyboard={false}
      >
 <Modal.Header closeButton>
   <Modal.Title>Update</Modal.Title>
 </Modal.Header>
     
    
 {adminRole!== "Admin" &&
  <Modal.Body>
      <form >
  <div class="form-group">
 <input
                   name="fullName"
                  onChange={handleChange}
                  value={values.fullName}
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
          className="form-control w-25 d-inline-block"

     name='roles'
     onChange={handleChange}
        value={values.roles}
        onBlur={handleBlur}
     >
           <option  label="SelectRole">
        Select Role
       </option>
       
       <option 
       selected={(values.roles == "SuperAdmin" )?"selected":''}   value="SuperAdmin">Super Admin
       </option>
       
       <option selected={(values.roles == "Admin" )?"selected":''} value="Admin">Admin</option>
       <option selected={(values.roles == "User" )?"selected":''} value="User">User</option>
     </select>
                 
</div>
</div>
  
  
  
  
  
    <button type="submit" onClick={handleEdit} class="btn btn-outline-dark mt-4">Update </button>
  </form> 
     </Modal.Body>}
 
 <Modal.Footer>
   <Button variant="secondary" onClick={handleCloseUpdate}>
     Close
   </Button>
   
 </Modal.Footer>
      </Modal>
  
{/* Model Box Finsihs */}
</div> 

      </div>    
    
      </div>  
      <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <a  className='page-link'
          onClick={prePage}> Prev </a>
      
        </li>
        {
          numbers.map((n, i)=>{
            <li className={`page-item ${currentPage === n ? 'active' : '' }` } key={i}>
              <a  className='page-link' 
              onClick={ ()=> changeCPage(n)}>{n}</a>
            </li>
            
      
          })
        }
         <li className='page-item'>
          <a className='page-link'
          onClick={nextPage}> Next </a>
      
        </li>
      
      
      </ul>
      </nav> 
      </>
  );
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
    
  }
  function changeCPage(id){
    setCurrentPage(id)
    
  }
  function nextPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  
  }
}
 
export default AddUserCompoonent;