
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect ,useState} from 'react';
 import axios from 'axios';
import { Button,Modal,Input } from 'react-bootstrap';
  import { useFormik } from "formik";
const AddDistributorComponent = () => {

    const onSubmit=(values,actions)=>{
            console.log(values);
        
            axios.post('http://localhost:3000/distributors/',{
              
            distributorName:values.distributorName
            }).then(res=>{
         console.log(res);
            }).catch(err=>{
         console.log(err);
            })
        }
         const [distributors,setdistributors]=useState([]);
         useEffect(()=>{
          axios.get("http://localhost:3000/distributors").then(res=>{
            setdistributors(res.data)
          }).catch(err=>{
            console.log(err);
          })
         },[])

        const deletedistributor=(id)=>{
          axios.delete(`http://localhost:3000/distributors/${id}`).then(res=>{
            axios.get("http://localhost:3000/distributors").then(res=>{
              setdistributors(res.data)
         }).catch(err=>{
           console.log(err);
         })
        
          }).catch(err=>{
            console.log(err);
          })
         }
        
        const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
            initialValues: {
         distributorName:'',   
              
            },
            validationSchema:'',
            onSubmit
          });
        
 
    const [show, setShow] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">
<div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search Student" aria-label="Search"/>
  
  </form>
</div>    
</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"red"}}><h2><b>distributors Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="primary" onClick={handleShow}>
  Add New distributors
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th>distributor Name </th>
<th>Actions</th>
   </tr>
      </thead>
  
      <tbody>
      {distributors.map((item)=>(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.distributorName}</td>
       
        <td><button onClick={()=>{deletedistributor(item.id)}} className="danger">Delete</button></td>
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
     <form  type="submit" onSubmit={handleSubmit}>
  <div class="form-group">
 <input 
 
               name='distributorName'
                onChange={handleChange}
                value={values.distributorName}
                onBlur={handleBlur}
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="distributor Name"/>
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
 
export default AddDistributorComponent;
