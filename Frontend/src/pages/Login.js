// Login.js
import React, { useState, useContext } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import { useNavigate, useLocation } from 'react-router'; //
import './Login.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../AuthContex';  //

const Login = () => {
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //
  const { login } = useContext(AuthContext);  // get login function from context

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (item, { resetForm }) => {
      axios.post("http://localhost:3001/login", item)
        .then(res => {
          if (res.data === "success") {
            login(formik.values.username);
            resetForm({ values: '' });

            // ✅ check if redirected from Add to Cart
            if (location.state && location.state.redirectTo) {
              navigate(location.state.redirectTo, { 
                state: { 
                  ...location.state.cartItem, // keep existing name, price
                  userName: formik.values.username // ✅ overwrite userName with logged-in username
                } 
              });
            } else {
              navigate('/');
            }
          } else {
            setAction(res.data);
          }
        })
        .catch(err => {
          setAction("Error logging in");
        });
    }
  });

  return (
    <div className="login-page">
      <PageTitle title="Login" />
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <h1 className='reg'>Login</h1>
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <p>If you are not registered</p>
          <button
            className='regButton'
            type="button"
            onClick={() => navigate("/registration")}
          >
            Go
          </button>
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
      <br />
      <p className='action'>{action}</p>
    </div>
  );
};

export default Login;
