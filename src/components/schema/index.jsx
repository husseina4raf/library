import * as yup from "yup";



export const basicSchema=yup.object().shape({
  firstName:yup.string().min(3).max(15).required("Required"),
  lastName:yup.string().min(3).max(15).required("Required"),
  email:yup.string().email("Please Enter Valid Email").required("Required"),
  phone:yup.number().integer().positive().required("Required"),
  password:yup.string().min(6, 'Password must be at least 6 charaters' ).max(25).required("Password is Required"),
  confirmpassword:yup.string().oneOf([yup.ref('password'), null], 'Password must match').required("Confirm password is Required")  
});

export const LoginSchema=yup.object().shape({
 
  email:yup.string().email("Please Enter Valid Email").required("Required"),
  password:yup.string().min(6, 'Password not correct' ).max(25).required("Password is Required"),
 
})


export const AddUserSchema =yup.object().shape({
  fullName:yup.string().min(3).max(15).required("Required"),
  email:yup.string().email("Please Enter Valid Email").required("Required"),
  phone:yup.number().integer().positive().required("Required"),
  password:yup.string().min(6, 'Password must be at least 6 charaters' ).max(25).required("Password is Required"),
});

export const AddAuthorSchema =yup.object().shape({
  authorName:yup.string().min(3).max(15).required("Required"),
});

export const AddBoookSchema =yup.object().shape({
  bookTitle:yup.string().min(3).max(15).required("Required"),
  copyWriteYear:yup.number().integer().positive().required("Required"),
  subject:yup.string().min(3).max(15).required("Required"),
  editionNumber:yup.number().integer().positive().required("Required"),
  numberOfPages:yup.number().integer().positive().required("Required"),


});


export const AddPublisherSchema =yup.object().shape({
  publisherName:yup.string().min(3).max(15).required("Required"),
});


export const AddDistributorsSchema =yup.object().shape({
  distributorName:yup.string().min(3).max(15).required("Required"),
});