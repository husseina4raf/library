
import styles from './AddBook.module.css';

import "bootstrap/dist/css/bootstrap.min.css";
import  { useEffect,useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
 import { useFormik } from "formik";
 import { AddBoookSchema } from "../schema";
 import axios from 'axios';

 
 const AddUserCompoonent = () => {



     const [publishers,setPublishers]=useState([])
     useEffect(()=>{
           
       axios.get('http://localhost:3000/publishers/').then(res=>{
               const {data}=res;
               setPublishers(data)
       }).catch(err=>{
            console.log(err);
       })
          
     },[])
  

     const [books,setbooks]=useState([])
     useEffect(()=>{
           
       axios.get('http://localhost:3000/books/').then(res=>{
             setbooks(res.data)
       }).catch(err=>{
            console.log(err);
       })
          
     },[])
  
  
     const [authors,setauthors]=useState([])
     useEffect(()=>{
           
       axios.get('http://localhost:3000/authors/').then(res=>{
               const {data}=res;
               setauthors(data)
       }).catch(err=>{
            console.log(err);
       })
          
     },[])
  
     const [genres,setgenres]=useState([])
     useEffect(()=>{
           
       axios.get('http://localhost:3000/genres/').then(res=>{
               const {data}=res;
               setgenres(data)
       }).catch(err=>{
            console.log(err);
       })
          
     },[])

     const onSubmit=(values,actions)=>{
          console.log(values);
      
          axios.post('http://localhost:3000/books/',{
               bookTitle:values.bookTitle,
               copyWriteYear:values.copyWriteYear,
               subject:values.subject,
               editionNumber:values.editionNumber,
               numberOfPages:values.numberOfPages,
               publisherIds:[values.publisherIds],
               authorIds:[values.authorIds],
               genreIds:[values.genreIds],


          }).then(res=>{
              console.log(res);
          }).catch(err=>{
              console.log(err);
          })
      }
      const deleteBooks=(id)=>{
        axios.delete(`http://localhost:3000/books/${id}`).then(res=>{
          axios.get("http://localhost:3000/books").then(res=>{
            setbooks(res.data)
       }).catch(err=>{
         console.log(err);
       })
      
        }).catch(err=>{
          console.log(err);
        })
       }


      const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
          initialValues: {
               bookTitle:'',   
               copyWriteYear: '',
               subject:'',
               editionNumber:'',
               numberOfPages:'',
               publisherIds:'',
               authorIds:'',
               genreIds:''

          },
           validationSchema:AddBoookSchema,
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
    axios.get(`http://localhost:3000/books/${id}`).then(res=>{
      const{
        bookTitle,   
        copyWriteYear,
        subject,
        editionNumber,
        numberOfPages,
        publishers,
        authors,
        genres,
         }=res.data[0]  
    setValues({bookTitle,   
      copyWriteYear,
      subject,
      editionNumber,
      numberOfPages,
      publisherIds:[publishers[0].id],
      authorIds:[authors[0].id],
      genreIds:[genres[0].id]
      ,})     
    }).catch(err=>{
      console.log(err);
    })

    setShowUpdate(true);
    console.log(id);
  }
    const handleCloseUpdate=()=>{
      setShowUpdate(false);
      setValues({authorIds:'',bookTitle:'',copyWriteYear:'',editionNumber:'',genreIds:'',numberOfPages:'',publisherIds:'',subject:''})
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/books/${updateState}`,values).then(res=>{
        axios.get("http://localhost:3000/books/").then(res=>{
          console.log("aaaaaaa");
          setbooks(res.data)
          setShowUpdate(false)
          setValues({authorIds:'',bookTitle:'',copyWriteYear:'',editionNumber:'',genreIds:'',numberOfPages:'',publisherIds:'',subject:'' })
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
    const records = books.slice(firstIndex,lastIndex);
    const npage = Math.ceil(books.length / recordsPerPage );
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
<div id={styles.gg} class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" ><h2><b>Books Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="secondary" onClick={handleShow}>
  Add New Books
</Button>
      </div>
    </div>  
     <div class="row">
  <div class="table-responsive " >
   <table class="table table-striped table-hover table-bordered">
      <thead>
   <tr>
<th>ID</th>
<th> Book Title </th>
<th> Subject </th>
<th> Copy Write Year </th>
<th> editionNumber </th>
<th> Number Of Pages </th>
<th>Actions</th>
   </tr>
      </thead>
      <tbody>
      {records
      .filter((item) =>{
        return search.toLowerCase() === ''
        ? item
        :item.bookTitle.toLowerCase().includes(search);
      })
      .map((item)=>(
        // updateState === item.id ? <Edit item= {item} books={books} setbooks={setbooks} /> : 
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.bookTitle}</td>
        <td>{item.subject}</td>
        <td>{item.copyWriteYear}</td>
        <td>{item.editionNumber}</td>
        <td>{item.numberOfPages}</td>

        <td>
        <button  onClick={()=>{deleteBooks(item.id)}} className="btn btn-danger">Delete</button>
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

     <form type="submit" onSubmit={handleSubmit}>
     <div className="row my-5">
             <div className="col-md-12">

     <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Book Title</label>
             <input
             name="bookTitle"
             onChange={handleChange}
             value={values.bookTitle}
             onBlur={handleBlur}
             className={errors.bookTitle && touched.bookTitle ?"form-control input-error":"form-control"}

             type="text"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.bookTitle && touched.bookTitle && <p className="errors">{errors.bookTitle}</p>}

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Subject </label>
             <input
               name="subject"
               onChange={handleChange}
               value={values.subject}
               onBlur={handleBlur}
               className={errors.subject && touched.subject ?"form-control input-error":"form-control"}

              
             type="text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.subject && touched.subject && <p className="errors">{errors.subject}</p>}

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Edition Number </label>
             <input
               name="editionNumber"
               onChange={handleChange}
               value={values.editionNumber}
               onBlur={handleBlur} 
               className={errors.editionNumber && touched.editionNumber ?"form-control input-error":"form-control"}

             
             type="number"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.editionNumber && touched.editionNumber && <p className="errors">{errors.editionNumber}</p>}

                  </div>
                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Copy Write Year</label>
             <input
               name="copyWriteYear"
               onChange={handleChange}
               value={values.copyWriteYear}
               onBlur={handleBlur} 
               className={errors.copyWriteYear && touched.copyWriteYear ?"form-control input-error":"form-control"}

             
             type="number"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.copyWriteYear && touched.copyWriteYear && <p className="errors">{errors.copyWriteYear}</p>}

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Number Of Pages</label>
             <input
               name="numberOfPages"
               onChange={handleChange}
               value={values.numberOfPages}
               onBlur={handleBlur} 
               className={errors.numberOfPages && touched.numberOfPages ?"form-control input-error":"form-control"}

             type="number"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.numberOfPages && touched.numberOfPages && <p className="errors">{errors.numberOfPages}</p>}

                  </div>
             
                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Publisher </label>
            <select
                      name='publisherIds'
                      onChange={handleChange}
                         value={values.publisherIds}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Publisher Name">
                         publisher Name
                        </option>
                        {publishers.map((item)=>(
                         <option  value={item.id}>{item.publisherName}</option>
                    ))}
                        
                      </select>
                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> author </label>
             
            <select
                      name='authorIds'
                      onChange={handleChange}
                         value={values.authorIds}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Author Name">
                      author Name
                        </option>
                        {authors.map((item)=>(
                         <option  value={item.id}>{item.authorName}</option>
                    ))}
                        
                      </select>
                  </div>


                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1" > Genre </label>
            <select
                      name='genreIds'
                      onChange={handleChange}
                         value={values.genreIds}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Genre Name">
                      genre Name
                        </option>
                        {genres.map((item)=>(
                         <option  value={item.id}>{item.genreName}</option>
                    ))}
                        
                      </select>
                  </div>
                  </div>
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

     <form >
     <div className="row my-5">
             <div className="col-md-12">

     <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Book Title</label>
             <input
             name="bookTitle"
             onChange={handleChange}
             value={values.bookTitle}
             onBlur={handleBlur}
             type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Subject </label>
             <input
               name="subject"
               onChange={handleChange}
               value={values.subject}
               onBlur={handleBlur}
              
             type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Edition Number </label>
             <input
               name="editionNumber"
               onChange={handleChange}
               value={values.editionNumber}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Copy Write Year</label>
             <input
               name="copyWriteYear"
               onChange={handleChange}
               value={values.copyWriteYear}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Number Of Pages</label>
             <input
               name="numberOfPages"
               onChange={handleChange}
               value={values.numberOfPages}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
             
                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> Publisher </label>
            <select
                      name='publisherIds'
                      onChange={handleChange}
                         value={values.publisherIds}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Publisher Name">
                         publisher Name
                        </option>
                        {publishers.map((item)=>(
                         <option selected={(values.publisherIds == item.id)?"selected":''}  value={item.id}>{item.publisherName}</option>
                    ))}
                        
                      </select>
                  </div>

                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1"> author </label>
             
            <select
                      name='authorIds'
                      onChange={handleChange}
                         value={values.authorIds}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Author Name">
                      author Name
                        </option>
                        {authors.map((item)=>(
                         <option selected={(values.authorIds == item.id)?"selected":''}  value={item.id}>{item.authorName}</option>
                    ))}
                        
                      </select>
                  </div>


                  <div className="form-group ">
             <label htmlFor="exampleInputEmail1" > Genre </label>
            <select
                      name='genreIds'
                      onChange={handleChange}
                         value={values.genreIds}
                         onBlur={handleBlur}
                      >
                      <option   label="Genre Name">
                      genre Name
                        </option>
                        {genres.map((item)=>(
                          <option  selected={(values.genreIds == item.id)?"selected":''} value={item.id}>{item.genreName}  </option>
                           
                          ))}
                        
                      </select>
                  </div>
                  
                  </div>
                  </div>
  
  
  
    <button  onClick={handleEdit} class="btn btn-success mt-4">Update </button>
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
 
export default AddUserCompoonent;