/* eslint-disable no-undef */
import  React , {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import { Button,Modal,Input } from 'react-bootstrap';
import { useFormik } from "formik";
import axios from 'axios';
import styles from "./BookStock.module.css"
function showBody(props){
    console.log(props);

  //  switch(props.shelf)  {
  //       case "Books" : 
  //        return (
  //         <Table size="small" aria-label="purchases">
  //         <TableHead>
  //           <TableRow className={styles.row}>
  //             <TableCell>Subject</TableCell>
  //             <TableCell>bookTitle</TableCell>
  //             <TableCell align="right">copyWriteYear</TableCell>
  //             <TableCell align="right">editionNumber</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //         <TableRow className={styles.row} key={props.id}>
  //                     <TableCell component="th" scope="row">
  //                       {props.body.subject} 
  //                     </TableCell>
  //                     <TableCell>{props.body.bookTitle}</TableCell>
  //                     <TableCell align="right">{props.body.copyWriteYear}</TableCell>
  //                     <TableCell align="right">
  //                       {props.body.editionNumber}
  //                     </TableCell>
  //                   </TableRow>
  //         </TableBody>
  //       </Table>

        
  //        )
  //        break;

  //        case "distributor": 
  //        console.log("heere");
  //        return (
  //         <Table size="small" aria-label="purchases">
  //         <TableHead>
  //           <TableRow className={styles.row}>
  //             <TableCell>distributorName</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //         <TableRow className={styles.row} key={props.id}>
  //                     <TableCell component="th" scope="row">
  //                       {props.body.distributorName} 
  //                     </TableCell>
  //                   </TableRow>
  //         </TableBody>
  //       </Table>

        
  //        )
  //        break;

         
         
         
        
  //  }


  return (
  <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow className={styles.row}>
              <TableCell>Subject</TableCell>
              <TableCell>bookTitle</TableCell>
              <TableCell align="right">copyWriteYear</TableCell>
              <TableCell align="right">distributorName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow className={styles.row} key={props.id}>
                      <TableCell component="th" scope="row">
                        {props.book.subject}
                      </TableCell>
                      <TableCell>   {props.book.bookTitle} </TableCell>
                      <TableCell align="right">
                        {props.book.copyWriteYear}
                      </TableCell>
                      <TableCell align="right">
                        {props.distributor.distributorName}
                      </TableCell>
                    </TableRow>
          </TableBody>
        </Table>
  
  )

}
    

   

function Row(props) {
  const { row , updateDialog , deleteBookStock } = props;
  

  const [open, setOpen] = React.useState(false);



  return (
    <React.Fragment>
      <TableRow className={styles.row} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.shelf}</TableCell>
        <TableCell align="right">

        <button  onClick={()=>{deleteBookStock(row.id)}} className="btn btn-danger" >Delete</button>
        <button  onClick={()=>{updateDialog(row.id)}}  className="btn btn-outline-dark ">Update</button>


        </TableCell>
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Book
              </Typography>
                {showBody(row)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function CollapsibleTable() {
    const [logsData,setlogsData]=useState([]);
    const [distributors,setDistributors]=useState([]);
    const [Books,setBooks]=useState([]);

     useEffect(()=>{
          axios.get('http://localhost:3000/book-stocks/').then(res=>{
               console.log(res.data);
               setlogsData(res.data);
          })
          

          axios.get('http://localhost:3000/distributors/').then(res=>{
               console.log(res.data);
               setDistributors(res.data);
          })
          axios.get('http://localhost:3000/books/').then(res=>{
               console.log(res.data);
               setBooks(res.data);
          })
     },[]);

    

     const onSubmit=(values,actions)=>{
      console.log(values);
  
      axios.post('http://localhost:3000/book-stocks/',{
           shelf:values.shelf,
           distributorId:values.distributorId,
           bookId:values.bookId,
           bookStock:0
      

      }).then(res=>{
        axios.get('http://localhost:3000/book-stocks/').then(res=>{
          console.log(res.data);
          setlogsData(res.data);
     })
     
        handleClose()
        setDone("Book Added");
        setTimeout(()=>{
          setDone("")
         }, 3000)              
        }).catch(err=>{
          setErorr(err.response.data.message.message);
          setTimeout(()=>{
            setErorr("")
           }, 5000)})
  }

     const [showUpdate,setShowUpdate]=useState(false);

     const handleShow = () => setShow(true);
     const {values,handleBlur,handleChange,handleSubmit,errors,touched,setValues} = useFormik({
      initialValues: {
           shelf:'',   
           distributorId: '',
           bookId:'',
           

      },
       validationSchema:'',
        enableReinitialize:true,
      
       onSubmit


    });

    const deleteBookStock=(id)=>{
      console.log(id);
      axios.delete(`http://localhost:3000/book-stocks/${id}`).then(res=>{
        axios.get("http://localhost:3000/book-stocks/").then(res=>{
          console.log(res.data);
          setlogsData(res.data)
  
     }).catch(err=>{
       console.log(err);
     })
    
      }).catch(err=>{
        console.log(err);
      })
     }
   

    const updateDialog=(id)=>{
      setUpdateState(id);
    axios.get(`http://localhost:3000/book-stocks/${id}`).then(res=>{
             console.log(res.data);
           setValues({bookId:res.data[0].book.id,shelf:res.data[0].shelf,distributorId:res.data[0].distributor.id})
             
        
    }).catch(err=>{
      console.log(err);
    })

    setShowUpdate(true);
    console.log(id);
  }

    const [updateState, setUpdateState] = useState(-1)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

    const handleCloseUpdate=()=>{
      setShowUpdate(false);
      setValues({bookId:'',shelf:'',distributorId:''})
    }

    const handleEdit=(e)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/book-stocks/${updateState}`,values).then(res=>{
        axios.get("http://localhost:3000/book-stocks/").then(res=>{
          console.log("aaaaaaa");
          setlogsData(res.data);

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
  const records = logsData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(logsData.length / recordsPerPage )
  const numbers = [...Array(npage + 1).keys()].slice(1)
 
  return (
    <>
<div className="w-100 d-flex justify-content-end " >
  <Button id={styles.st} variant="secondary" onClick={handleShow}>
  Add New Book Stock
</Button>
</div>

    <TableContainer  className={styles.TableContainer} >
      <Table className={styles.tableWrapper} aria-label="collapsible table">
        <TableHead>
          <TableRow className={styles.row} >
            <TableCell />
            <TableCell className={styles.tab} >ID</TableCell>
            <TableCell className={styles.tab} align="right">Shelf</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((logData) => (
            <Row  key={logData.id} row={logData} updateDialog={updateDialog}  deleteBookStock={deleteBookStock}  />
             
            
          ))}
          





        </TableBody>
      </Table>
     
    </TableContainer>






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
     <Modal.Body className={styles.Modal}>

     <form type="submit" onSubmit={handleSubmit}>
      <div className="container">
     

     <div className="form-group ">
             <label htmlFor="exampleInputEmail1">Shelf</label>
             <input
             name="shelf"
             onChange={handleChange}
             value={values.shelf}
             onBlur={handleBlur}
             className={errors.bookTitle && touched.bookTitle ?"form-control input-error":"form-control"}

             type="text"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />
                          {errors.bookTitle && touched.bookTitle && <p className="errors">{errors.bookTitle}</p>}

                  </div>

           

              

                  
             
                  <div className="form-group " id={styles.diss}>
             <label htmlFor="exampleInputEmail1"> Book Name </label>
            <select
                 className="form-control w-30 d-inline-block"

                      name='bookId'
                      onChange={handleChange}
                         value={values.bookId}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Book Name">
                      Book Name
                        </option>
                        {Books.map((item)=>(
                         <option  value={item.id}>{item.bookTitle}</option>
                    ))}
                        
                      </select>
                  </div>

                  <div className="form-group " id={styles.diss}>
             <label htmlFor="exampleInputEmail1"> Distributor Name </label>
             
            <select
                 className="form-control w-30 d-inline-block"

                      name='distributorId'
                      onChange={handleChange}
                         value={values.distributorId}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Distributors Name">
                      distributors Name
                        </option>
                        {distributors.map((item)=>(
                         <option  value={item.id}>{item.distributorName}</option>
                    ))}
                        
                      </select>
                  </div>


             
                  </div>
                  
  
  
  
                  <div className="from-control " id={styles.btg}>

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









{/*  */}


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
     <div className="row">
             <div className="col-md-12">

     <div className="form-group my-1">
             <label htmlFor="exampleInputEmail1">Shelf</label>
             <input
             name="shelf"
             onChange={handleChange}
             value={values.shelf}
             onBlur={handleBlur}
             type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' />

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> Book Name</label>
                        <select
                       className="form-control  d-inline-block"

                      name='bookId'
                      onChange={handleChange}
                         value={values.bookId}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Distributor Name">
                      Book Name
                        </option>
                        {Books.map((item)=>(
                         <option selected={(values.bookId == item.id)?"selected":''}  value={item.id}>{item.bookTitle}</option>
                    ))}
                        
                      </select>

                  </div>

                  <div className="form-group my-3">
             <label htmlFor="exampleInputEmail1"> distributor Name </label>
                       <select
                       className="form-control  d-inline-block"

                      name='distributorId'
                      onChange={handleChange}
                         value={values.distributorId}
                         onBlur={handleBlur}
                      >
                      <option value="" label="Distributor Name">
                      Distributor Name
                        </option>
                        {distributors.map((item)=>(
                         <option selected={(values.distributorId == item.id)?"selected":''}  value={item.id}>{item.distributorName}</option>
                    ))}
                        
                      </select>
                  </div>
                                 
                  </div>
                  </div>
  
  
  
    <button  onClick={handleEdit} class="btn btn-outline-dark m-4">Update </button>
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