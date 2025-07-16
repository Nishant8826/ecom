import CommonForm from '@/components/common/form';
import { loginForm } from '@/components/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the login logic, e.g., sending formData to your backend
    console.log(formData);
    // Handle login logic here
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl tracking-tight text-foreground font-bold'> Login to your account</h1>
        <p>Don't have an account? <Link className='font-medium text-primary hover:underline' to={'/auth/signup'}>Sign Up</Link></p>
      </div>
      <CommonForm formControls={loginForm} buttonText={'Login'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default Login