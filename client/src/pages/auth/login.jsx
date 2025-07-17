import CommonForm from '@/components/common/form';
import { loginForm } from '@/components/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
          variant: 'success'
        });
        // navigation('/shop/home');
      } else {
        toast({
          variant: "destructive",
          title: 'Login Failed',
          description: data?.payload?.message || 'Something went wrong',
        });
      }
    });
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