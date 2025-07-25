import React, { useState } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import './Registration.css';
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate=useNavigate();
      const [getFormData,setFormData]=useState("");
    const formik=useFormik({
      initialValues:{
        name:'',
        username:'',
        email:'',
        address:'',
        password:''
      },
      onSubmit:((item,{resetForm})=>{
        axios.post("http://localhost:3001/register",item)
        .then(res=>{
          console.log(res.data);
          setFormData(item);
          // resetForm 
          resetForm({values:''})
          alert("Registration successfull.")
          navigate("/login")
        })
        .catch(error=>{
          console.log(error.message);
        })
        
      })
    })
    console.log(getFormData);
  return (
    <div className="login-page">
      <PageTitle title="Login" />
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <h1 className='reg'>Registration</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input type="text" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} placeholder="Enter your username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" id="address" onChange={formik.handleChange} value={formik.values.address} placeholder="Enter your full address" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Enter your password" required />
        </div>
        <button className="submit-btn" type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default Login;
