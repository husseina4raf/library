import styles from './AddDistributor.module.css'
import Alert from '@mui/material/Alert';
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect ,useState} from 'react';
 import axios from 'axios';
import { Button,Modal,Input } from 'react-bootstrap';
  import { useFormik } from "formik";
import { Edit } from "@mui/icons-material";
import { AddDistributorsSchema } from '../schema';
const AddDistributorComponent = () => {
  const [error, setErorr] = useState('');
  const [done, setDone] = useState('');

    const onSubmit=(values,actions)=>{
            console.log(values);
        
            axios.post('http://localhost:3000/distributors/',{
              
            distributorName:values.distributorName
            }).then(res=>{
              handleClose()

              setDone("Distributor Added");
              setTimeout(()=>{
                setDone("")
               }, 3000)
              }).catch(err=>{
                setErorr(err.response.data.message.message);
                setTimeout(()=>{
                  setErorr("")
                 }, 3000)
               
          axios.get("http://localhost:3000/distributors").then(res=>{
                setdistributors(res.data)
              }).catch(err=>{
                console.log(err);
              })
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

         
        
        const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
            initialValues: {
         distributorName:'',   
              
            },
            validationSchema:AddDistributorsSchema,
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
    axios.get(`http://localhost:3000/distributors/${id}`).then(res=>{
      const{distributorName}=res.data   
      console.log(distributorName);
    setValues({distributorName})     
    }).catch(err=>{
      console.log(err);
    })

    setShowUpdate(true);
    console.log(id);
  }
  const handleCloseUpdate=()=>{
    setShowUpdate(false);
    setValues({distributorName:''})
  }

  const handleEdit=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:3000/distributors/${updateState}`,values).then(res=>{
      axios.get("http://localhost:3000/distributors/").then(res=>{
        console.log("aaaaaaa");
        setdistributors(res.data)
        setShowUpdate(false)
        setValues({distributorName:''})
      }).then(res=>{
        handleClose()
        setDone("Distributor Updated");
        setTimeout(()=>{
          setDone("")
        }, 3000)
        
   }).catch(err=>{
     console.log(err);
   })
    }).catch(err=>{
      console.log(err);
    })
   }

  //  const [currentPage, setCurrentPage]= useState(1)
  //   const recordsPerPage = 5;
  //   const lastIndex = currentPage * recordsPerPage;
  //   const firstIndex = lastIndex - recordsPerPage;
  //   const records = distributors.slice(firstIndex,lastIndex);
  //   const npage = Math.ceil(distributors.length / recordsPerPage );
  //   const numbers = [...Array(npage + 1).keys()].slice(1);

    
    const [search, setSearch] = useState('');
    console.log(search);


  return (
    <>
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded position-relative"> 
          {done && <Alert className={styles.alert} variant="filled" severity="success">
                                                               {done}
                                                          </Alert>}

  
 <div class="row ">
    
    <div class="col-sm-3 mt-5 mb-4 text-gred">
    <div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search " aria-label="Search"
   onChange={(e)=> setSearch(e.target.value)}
   

   />
  
  </form>
</div> 
</div>  
<div id={styles.gg} class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" ><h2><b>Distributors Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="secondary" onClick={handleShow}>
  Add New Distributors
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th>Distributor Name </th>
<th>Actions</th>
   </tr>
      </thead>
  
      <tbody>
  
{distributors
.filter((item) =>{
  return search.toLowerCase() === ''
  ? item
  :item.distributorName.toLowerCase().includes(search);
})

.map((item)=>(
        // updateState === item.id ? <Edit item= {item} books={distributors} setbooks={setdistributors} /> : 
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.distributorName}</td>
        

        <td>
        <button  onClick={()=>{deletedistributor(item.id)}} className="btn btn-danger">Delete</button>
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
                className={errors.distributorName && touched.distributorName ?"form-control input-error":"form-control"}

 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Distributor Name"/>
                              {errors.distributorName && touched.distributorName && <p className="errors">{errors.distributorName}</p>}

  </div>
  
  <div className="forrm-control">
  <button  type="submit" class="btn btn-outline-dark w-25 ">Add </button>
  </div>
  {error && <Alert className={styles.alert2} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
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
  
  
    <button type="submit" onClick={handleEdit} class="btn btn-outline-dark mt-4">Update </button>
    {error && <Alert className={styles.alert2} variant="filled" severity="error">
                                                               {error}
                                                          </Alert>}
  </form>
     </Modal.Body>
 
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
      {/* <nav>
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
      </nav>  */}
      </>
  );
  // function prePage(){
  //   if(currentPage !== 1){
  //     setCurrentPage(currentPage - 1)
  //   }
    
  // }
  // function changeCPage(id){
  //   setCurrentPage(id)
    
  // }
  // function nextPage(){
  //   if(currentPage !== npage){
  //     setCurrentPage(currentPage + 1)
  //   }
  
  // }
}
 
export default AddDistributorComponent;
