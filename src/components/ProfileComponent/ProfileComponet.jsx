import React from 'react';
import styles from "./Profile.module.css"; 
import axios from 'axios';
import {useEffect ,useState} from 'react';



const ProfileComponet = () => {
    
    const [Profile,setProfile]=useState({});
         useEffect(()=>{
          axios.get("http://localhost:3000/profile").then(res=>{
            console.log(res.data);
            setProfile(res.data)
          }).catch(err=>{
            console.log(err);
          })
         },[])
    return (

        <div>
            <div className="d-flex justify-content-center">
        
<form>
              <div className="row my-4">
                 <div className="col-md-12">
 
                 <div className="form-group my-3">
                 <label htmlFor="exampleInputEmail1">User Email</label>
                 <input

                 type="text" value={Profile.username} disabled  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
   
                      </div>
        


                 </div>


                  <div className='col-md-12 my-3'>
                     <div className='form-group'>
                     <label htmlFor="exampleInputEmail1">Role</label>
                      <input type="text" disabled value={Profile.roles} className="form-control" id="exampleInputpassword1" aria-describedby="nameHelp" />


                     </div>

                     
                    

                  </div>

                 
                 </div>
                 <div>
                    
                      {/* <div className="text-center mt-7 ">
                         <button className={styles.SubmitBtn}>  Submit </button>
                     </div>  */}
                 </div>
            
              </form>
        </div>
        </div>
    );
};

export default ProfileComponet;