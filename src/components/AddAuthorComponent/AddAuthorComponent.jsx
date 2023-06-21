import styles from './AddAuthor.module.css';

import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect ,useState} from 'react';
 import axios from 'axios';
import { Button,Modal,Input } from 'react-bootstrap';
  import { useFormik } from "formik";
import { Delete, Edit } from "@mui/icons-material";
import { object } from "yup";
const AddAuthorComponent = () => {
  const [item,setItem]=useState([]);

    const onSubmit=(values,actions)=>{
            
        
            axios.post('http://localhost:3000/authors/',{
              
            authorName:values.authorName
            }).then(res=>{

              axios.get("http://localhost:3000/authors").then(res=>{
                setAuthors(res.data)
              }).catch(err=>{
                console.log(err);
              })
         console.log(res);
            }).catch(err=>{
         console.log(err);
            })
        }
         const [authors,setAuthors]=useState([]);
         useEffect(()=>{
          axios.get("http://localhost:3000/authors").then(res=>{
            setAuthors(res.data)
          }).catch(err=>{
            console.log(err);
          })
         
         },[])

         

        const deleteAuthor=(id)=>{
          axios.delete(`http://localhost:3000/authors/${id}`).then(res=>{
            axios.get("http://localhost:3000/authors").then(res=>{
              setAuthors(res.data)
         }).catch(err=>{
           console.log(err);
         })
        
          }).catch(err=>{
            console.log(err);
          })
         }
        
        const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
            initialValues: {
              authorName:'',   
              
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
      axios.get(`http://localhost:3000/authors/${id}`).then(res=>{
        const{authorName}=res.data   
        console.log(authorName);
      setValues({authorName})     
      }).catch(err=>{
        console.log(err);
      })

      setShowUpdate(true);
      console.log(id);
    }
    const handleCloseUpdate=()=>{
      setShowUpdate(false);
      setValues({authorName:''})
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/authors/${updateState}`,values).then(res=>{
        axios.get("http://localhost:3000/authors/").then(res=>{
          console.log("aaaaaaa");
          setAuthors(res.data)
          setShowUpdate(false)
          setValues({authorName:''})
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
    const records = authors.slice(firstIndex,lastIndex);
    const npage = Math.ceil(authors.length / recordsPerPage );
    const numbers = [...Array(npage + 1).keys()].slice(1);

    
    const [search, setSearch] = useState('');
    console.log(search);

  return (
    <>
 
       <div class="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
  
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
<div id={styles.gg} class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" ><h2><b>Authors Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="secondary" onClick={handleShow}>
  Add New Authors
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th>Author Name </th>
<th>Actions</th>
   </tr>
      </thead>
  
      <tbody>
   

{records
.filter((item) =>{
  return search.toLowerCase() === ''
  ? item
  :item.authorName.toLowerCase().includes(search);
})
.map((item)=>(
        // updateState === item.id ? <Edit item= {item} books={authors} setbooks={setAuthors} /> : 
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.authorName}</td>
        

        <td>
        <button  onClick={()=>{deleteAuthor(item.id)}} className="btn btn-danger">Delete</button>
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
 
               name='authorName'
                onChange={handleChange}
                value={values.authorName}
                onBlur={handleBlur}
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Author Name"/>
  </div>
  
  
    <button  type="submit" class="btn btn-outline-dark ">Add </button>
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

{/* Updateeee Modal */}

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
     <form  type="submit" onSubmit={handleEdit} >
  <div class="form-group">
 <input 
  
               name='authorName'
                onChange={handleChange}
                value={values.authorName}
                onBlur={handleBlur}
 type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Author Name"/>
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


 
export default AddAuthorComponent;