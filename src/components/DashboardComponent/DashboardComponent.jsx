import React from 'react';
import { NavLink ,Outlet,Routes,Route} from 'react-router-dom';
import styles from './Dashboard.module.css'
import AddAdminComponent from '../AddAdminComponent/AddAdminComponent';
import AddAuthorComponent from '../AddAuthorComponent/AddAuthorComponent';
import AddUserCompoonent from '../AddUserCmponent/AddUserCompoonent';
import AddBookComponent from '../AddBookCompnent/AddBookComponent';
import AuditLogsComponet from '../AuditLogsComponent/AuditLogsComponet';
import BookStockComponent from '../BookStockComponent/BookStockComponent';
const DashboardComponent = () => {
    return (
        <>
         
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
             <NavLink className={styles.dashboradItem} to='addaudit'>
            <i class="fa-solid fa-file-shield"></i>
            <p>Audit Logs</p>
            </NavLink>


            <NavLink className={styles.dashboradItem} to='bookstock'>
            <i class="fa-solid fa-user-plus"></i>
            <p>Book Stock</p>
            </NavLink> 
            
        </div>
         < Outlet />

         <Routes>
        <Route   className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  } path="addadmin" element={<AddAdminComponent/>} />
        <Route path="adduser" element={<AddUserCompoonent/>} />
        <Route path="addauthor" element={<AddAuthorComponent/>} />
        <Route path="addbook" element={<AddBookComponent/>} />
        <Route path="addaudit" element={<AuditLogsComponet/>} />
        <Route path="bookstock" element={<BookStockComponent/>} />

       
      </Routes>
            
        </>
    );
};

export default DashboardComponent; 