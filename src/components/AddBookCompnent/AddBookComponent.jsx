// import React, { useEffect, useState } from 'react';
// import styles from "./AddBook.module.css"; 
// import axios from 'axios';
// import { useFormik } from "formik";



// const AddBookComponent = () => {
//    const [publishers,setPublishers]=useState([])
//    useEffect(()=>{
         
//      axios.get('http://localhost:3000/publishers/').then(res=>{
//              const {data}=res;
//              setPublishers(data)
//      }).catch(err=>{
//           console.log(err);
//      })
        
//    },[])


//    const [authors,setauthors]=useState([])
//    useEffect(()=>{
         
//      axios.get('http://localhost:3000/authors/').then(res=>{
//              const {data}=res;
//              setauthors(data)
//      }).catch(err=>{
//           console.log(err);
//      })
        
//    },[])

//    const [genres,setgenres]=useState([])
//    useEffect(()=>{
         
//      axios.get('http://localhost:3000/genres/').then(res=>{
//              const {data}=res;
//              setgenres(data)
//      }).catch(err=>{
//           console.log(err);
//      })
        
//    },[])


   
//      const onSubmit=(values,actions)=>{
//           console.log(values);
      
//           axios.post('http://localhost:3000/books/',{
//                bookTitle:values.bookTitle,
//                copyWriteYear:values.copyWriteYear,
//                subject:values.subject,
//                editionNumber:values.editionNumber,
//                numberOfPages:values.numberOfPages,
//                publisherIds:[values.publisherIds],
//                authorIds:[values.authorIds],
//                genreIds:[values.genreIds],


//           }).then(res=>{
//               console.log(res);
//           }).catch(err=>{
//               console.log(err);
//           })
//       }


//       const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
//           initialValues: {
//                bookTitle:'',   
//                copyWriteYear: '',
//                subject:'',
//                editionNumber:''
//           },
//           // validationSchema:AddUserSchema,
//           onSubmit
//         });










//     return (
//         <div>
//         <div className="d-flex justify-content-center">
    
// <form type="submit" onSubmit={handleSubmit}>
//           <div className="row my-5">
//              <div className="col-md-12">


//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1">Book Title</label>
//              <input
//              name="bookTitle"
//              onChange={handleChange}
//              value={values.bookTitle}
//              onBlur={handleBlur}
//              type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

//                   </div>

//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1"> Subject </label>
//              <input
//                name="subject"
//                onChange={handleChange}
//                value={values.subject}
//                onBlur={handleBlur}
              
//              type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

//                   </div>

//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1"> Edition Number </label>
//              <input
//                name="editionNumber"
//                onChange={handleChange}
//                value={values.editionNumber}
//                onBlur={handleBlur} 
             
//              type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

//                   </div>
//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1">Copy Write Year</label>
//              <input
//                name="copyWriteYear"
//                onChange={handleChange}
//                value={values.copyWriteYear}
//                onBlur={handleBlur} 
             
//              type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

//                   </div>

//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1">Number Of Pages</label>
//              <input
//                name="numberOfPages"
//                onChange={handleChange}
//                value={values.numberOfPages}
//                onBlur={handleBlur} 
             
//              type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

//                   </div>
             
//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1"> Publisher </label>
//             <select
//                       name='publisherIds'
//                       onChange={handleChange}
//                          value={values.publisherIds}
//                          onBlur={handleBlur}
//                       >
//                       <option value="" label="Publisher Name">
//                          publisher Name
//                         </option>
//                         {publishers.map((item)=>(
//                          <option  value={item.id}>{item.publisherName}</option>
//                     ))}
                        
//                       </select>
//                   </div>

//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1"> author </label>
             
//             <select
//                       name='authorIds'
//                       onChange={handleChange}
//                          value={values.authorIds}
//                          onBlur={handleBlur}
//                       >
//                       <option value="" label="Author Name">
//                       author Name
//                         </option>
//                         {authors.map((item)=>(
//                          <option  value={item.id}>{item.authorName}</option>
//                     ))}
                        
//                       </select>
//                   </div>


//                   <div className="form-group my-3">
//              <label htmlFor="exampleInputEmail1" > Genre </label>
//             <select
//                       name='genreIds'
//                       onChange={handleChange}
//                          value={values.genreIds}
//                          onBlur={handleBlur}
//                       >
//                       <option value="" label="Genre Name">
//                       genre Name
//                         </option>
//                         {genres.map((item)=>(
//                          <option  value={item.id}>{item.genreName}</option>
//                     ))}
                        
//                       </select>
//                   </div>
//              </div>       
             
//              <div>
                
//                   <div className="text-center mt-7 ">
//                      <button className={styles.SubmitBt}>  Submit </button>
//                  </div> 
//              </div>
//           </div> 
//           </form>
//     </div>
//     </div>
//     );
// };

// export default AddBookComponent;



















import "bootstrap/dist/css/bootstrap.min.css";
import  { useEffect,useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
 import { useFormik } from "formik";
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
               const {data}=res;
               setbooks(data)
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

      const {values,handleBlur,handleChange,handleSubmit,errors,touched} = useFormik({
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
          // validationSchema:AddUserSchema,
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
{/* <div className="search">
  <form class="form-inline">
   <input class="form-control mr-sm-2" type="search" placeholder="Search Book" aria-label="Search"/>
  
  </form>
</div>     */}
</div>  
<div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}><h2><b>Books Details</b></h2></div>
<div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
<Button variant="primary" onClick={handleShow}>
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
      {books.map((item)=>(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.bookTitle}</td>
        <td>{item.subject}</td>
        <td>{item.copyWriteYear}</td>
        <td>{item.editionNumber}</td>
        <td>{item.numberOfPages}</td>

        <td><button onClick={()=>{deleteBooks(item.id)}} className="danger">Delete</button></td>
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

     <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Book Title</label>
             <input
             name="bookTitle"
             onChange={handleChange}
             value={values.bookTitle}
             onBlur={handleBlur}
             type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> Subject </label>
             <input
               name="subject"
               onChange={handleChange}
               value={values.subject}
               onBlur={handleBlur}
              
             type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> Edition Number </label>
             <input
               name="editionNumber"
               onChange={handleChange}
               value={values.editionNumber}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Copy Write Year</label>
             <input
               name="copyWriteYear"
               onChange={handleChange}
               value={values.copyWriteYear}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1">Number Of Pages</label>
             <input
               name="numberOfPages"
               onChange={handleChange}
               value={values.numberOfPages}
               onBlur={handleBlur} 
             
             type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>
             
                  <div className="form-group my-3">
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

                  <div className="form-group my-3">
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


                  <div className="form-group my-3">
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