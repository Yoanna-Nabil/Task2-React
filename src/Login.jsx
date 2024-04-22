import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'


export default function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('')

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, "Enter valid Email"),
    password: Yup.string().required("Password is required").min(8).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "must contains at least 1 uppercase , 1 lowercase, 1 symbol and 1 number"),
  })

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: login,
    validationSchema
  })

  function login(){
    setMsg("You logged successfully");
  }

  function clearMsg(){
    setMsg(' ')
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
 
  return <>
    <div className="w-75 m-auto my-5">
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="email" className='my-1'>Email:</label>
        <input  onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input  onChange={handleChange} onBlur={handleBlur} value={values.password} type={showPassword ? 'text' : 'password'} className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}

        {msg ? <div className="alert alert-success">{msg}</div>: null}

          
          <button type='submit' className='btn bg-info px-3 text-white ms-auto d-block'>Login</button>
          <button className='btn bg-info px-3 text-white ms-auto d-block mt-2' type="button" onClick={handleTogglePassword}>
             {showPassword ? 'Hide' : 'Show'} Password
         </button>
        


      </form>
    </div>
  </>
}
