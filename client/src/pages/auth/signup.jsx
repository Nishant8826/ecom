import CommonForm from '@/components/common/form';
import { registerationForm } from '@/components/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const Signup = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the signup logic, e.g., sending formData to your backend
    console.log(formData);
    // Handle signup logic here
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl tracking-tight text-foreground font-bold'> Create new account</h1>
        <p>Already have an account <Link className='font-medium text-primary hover:underline' to={'/auth/login'}>Login</Link></p>
      </div>
        <CommonForm formControls={registerationForm} buttonText={'Sign Up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default Signup