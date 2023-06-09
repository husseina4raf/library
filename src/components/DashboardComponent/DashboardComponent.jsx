import React from 'react';
import { NavLink ,Outlet,Routes,Route} from 'react-router-dom';
import styles from './Dashboard.module.css'
import AddAuthorComponent from '../AddAuthorComponent/AddAuthorComponent';
import AddUserCompoonent from '../AddUserCmponent/AddUserCompoonent';
import AddBookComponent from '../AddBookCompnent/AddBookComponent';
import AuditLogsComponet from '../AuditLogsComponent/AuditLogsComponet';
import BookStockComponent from '../BookStockComponent/BookStockComponent';
import AddPublisherComponent from '../AddPublisherComponent/AddPublisherComponent';
import AddDistributorComponent from '../AddDistributorComponent/AddDistributorComponent';
import ReportsComponent from '../ReportsComponent/ReportsComponent';
import axios from 'axios';

const DashboardComponent = () => {
 
    const adminRole=localStorage.getItem('role');
    const algorithmDetect =(e)=>{
         
        console.log(e.target.value);       
        localStorage.setItem('algoAi',e.target.value)
   
     }

    return (
        <>
        { adminRole!== "Admin" &&
   <select  onChange={algorithmDetect} className={styles.btnBorrow}> 
      <option selected={(localStorage.getItem('algoAi')=="k-nn")?true:false} value="k-nn">k-nn</option>
      <option selected={(localStorage.getItem('algoAi')=="decision-tree")?true:false} value="decision-tree">decision-tree</option>
      <option selected={(localStorage.getItem('algoAi')=="content-based")?true:false} value="content-based">content-based</option>
   </select>
}
         
        <div className={styles.dashboradItemWrapper}> 
         
       

            <NavLink className={styles.dashboradItem} to='adduser' >
            <i className="fa-solid fa-user-plus"></i>
            <p>Add User</p>
            </NavLink>
             
             
            
            <NavLink className={styles.dashboradItem} to='addbook' >
            <i class="fa-solid fa-book-medical"></i>
            <p>Add Book</p>
            </NavLink>
            
            <NavLink className={styles.dashboradItem} to='addauthor'>
            <i class="fa-solid fa-user-plus"></i>
            <p>Add Author</p>
            </NavLink>

            <NavLink className={styles.dashboradItem} to='addpublisher'>
            <i class="fa-solid fa-user-plus"></i>
            <p>Add Publishers</p>
            </NavLink>


            <NavLink className={styles.dashboradItem} to='adddistributor'>
            <i class="fa-solid fa-user-plus"></i>
            <p>Add Distributors</p>
            </NavLink>
            { adminRole!=="Admin" &&
             <NavLink className={styles.dashboradItem} to='addaudit'>
            <i class="fa-solid fa-file-shield"></i>
            <p>Audit Logs</p>
            </NavLink>

             }

            <NavLink className={styles.dashboradItem} to='bookstock'>
            <i class="fa-solid fa-user-plus"></i>
            <p>Book Stock</p>
            </NavLink> 

            <NavLink className={styles.dashboradItem} to='reports' >
            <i className="fa-solid fa-user-plus"></i>
            <p>Reports</p>
            </NavLink>
            
        </div>
         < Outlet />

         <Routes>

        <Route path="adduser" element={<AddUserCompoonent/>} />
        <Route path="addauthor" element={<AddAuthorComponent/>} />
        <Route path="addbook" element={<AddBookComponent/>} />
        <Route path="addaudit" element={<AuditLogsComponet/>} />
        <Route path="bookstock" element={<BookStockComponent/>} />
        <Route path="addpublisher" element={<AddPublisherComponent/>} />
        <Route path="adddistributor" element={<AddDistributorComponent/>} />
        <Route path="reports/*" element={<ReportsComponent/>} />





       
      </Routes>
            
        </>
    );
};

export default DashboardComponent; 