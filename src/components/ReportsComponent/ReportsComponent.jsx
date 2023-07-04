import React from 'react';
import styles from './Reports.module.css'
import { NavLink ,Outlet,Routes,Route} from 'react-router-dom';
import UserActivityComponent from '../UserActivitComponent/UserActivityComponent';
import OverdueBooksComponent from '../OverdueBooksComponent/OverdueBooksComponent';
import MostBorrowedGenresComponent from '../MostBorrowedGenresComponent/MostBorrowedGenresComponent';
import MostBorrowedBooksComponent from '../MostBorrowedBooksComponent/MostBorrowedBooksComponent';
import ReportGeneratorComponent from '../ReportGeneratorComponent/ReportGeneratorComponent';



const ReportsComponent = () => {
    

    
    return (
        <>
        <div className={styles.dashboradItemWrapper}> 
            <NavLink className={styles.dashboradItem} to='overdue' >
            <p>Overdue Books</p>
            </NavLink>
            
            <NavLink className={styles.dashboradItem} to='useractivity'>
            <p>User Activity</p>
            </NavLink>

            <NavLink className={styles.dashboradItem} to='mborrowed'>
            <p> Most Borrowed Genres</p>
            </NavLink>

            <NavLink className={styles.dashboradItem} to='mborrowedbook'>
            <p> Most Borrowed Books</p>
            </NavLink>

            <NavLink className={styles.dashboradItem} to='generator'>
            <p> Report Generator</p>
            </NavLink>
            
        </div>
        <Outlet/>

         <Routes>

      <Route path="/overdue" element={<OverdueBooksComponent/>}/>
      <Route path="/useractivity" element={<UserActivityComponent/>}/>
      <Route path="mborrowed" element={<MostBorrowedGenresComponent/>}/>
      <Route path="mborrowedbook" element={<MostBorrowedBooksComponent/>}/>
      <Route path="generator" element={<ReportGeneratorComponent/>}/>

       
      </Routes>
      </>



    );
};

export default ReportsComponent;