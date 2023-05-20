
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect ,useState} from 'react';
 import axios from 'axios';
import { Button,Modal,Input } from 'react-bootstrap';
  import { useFormik } from "formik";
import { Edit } from "@mui/icons-material";
const AddPublisherComponent = () => {

    const onSubmit=(values,actions)=>{
            console.log(values);
        
            axios.post('http://localhost:3000/publishers/',{
              
            publisherName:values.publisherName
            }).then(res=>{
              axios.get("http://localhost:3000/publishers").then(res=>{
                setpublishers(res.data)
              }).catch(err=>{
                console.log(err);
              })
         console.log(res);
            }).catch(err=>{
         console.log(err);
            })
         
        }
         const [publishers,setpublishers]=useState([]);
         useEffect(()=>{
          axios.get("http://localhost:3000/publishers").then(res=>{
            setpublishers(res.data)
          }).catch(err=>{
            console.log(err);
          })
         },[])

        const deletepublisher=(id)=>{
          axios.delete(`http://localhost:3000/publishers/${id}`).then(res=>{
            axios.get("http://localhost:3000/publishers").then(res=>{
              setpublishers(res.data)
         }).catch(err=>{
           console.log(err);
         })
        
          }).catch(err=>{
            console.log(err);
          })
         }

        
        
        const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
            initialValues: {
         publishersName:'',   
              
            },
            validationSchema:'',
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
      axios.get(`http://localhost:3000/publishers/${id}`).then(res=>{
        const{publisherName}=res.data   
        console.log(publisherName);
      setValues({publisherName})     
      }).catch(err=>{
        console.log(err);
      })

      setShowUpdate(true);
      console.log(id);
    }
    const handleCloseUpdate=()=>{
      setShowUpdate(false);
      setValues({publisherName:''})
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/publishers/${updateState}`,values).then(res=>{
        axios.get("http://localhost:3000/publishers/").then(res=>{
          console.log("aaaaaaa");
          setpublishers(res.data)
          setShowUpdate(false)
          setValues({publishersName:''})
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
    const records = publishers.slice(firstIndex,lastIndex);
    const npage = Math.ceil(publishers.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">

</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"red"}}><h2><b>Publishers Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="primary" onClick={handleShow}>
  Add New Publishers
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th>publishers Name </th>
<th>Actions</th>
   </tr>
      </thead>
  
      <tbody>
      {records.map((item)=>(
        // updateState === item.id ? <Edit item= {item} books={publishers} setbooks={setpublishers} /> : 
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.publisherName}</td>
        

        <td>
          <button onClick={()=>{deletepublisher(item.id)}} className="danger">Delete</button>
          <button  onClick={()=>{updateDialog(item.id)}}  className="danger">Update</button>
          

          </td>
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
 
               name='publisherName'
                onChange={handleChange}
                value={values.publisherName}
                onBlur={handleBlur}
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="publishers Name"/>
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
     <Modal.Body>
     <form  type="submit" onSubmit={handleSubmit}>
  <div class="form-group">
 <input 
 
               name='publisherName'
                onChange={handleChange}
                value={values.publisherName}
                onBlur={handleBlur}
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="publishers Name"/>
  </div>
  
  
    <button type="submit" onClick={handleEdit} class="btn btn-success mt-4">Update </button>
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
 
export default AddPublisherComponent;



