import CommonForm from '@/components/common/form';
import { registerationForm } from '@/config';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from "../../store/authSlice";
import { useToast } from '@/hooks/use-toast';

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: 'Registration Successful',
          description: 'You can now login with your credentials.',
          variant: 'success'
        });
        // Redirect to login page after successful registration
        navigation('/auth/login');
        setFormData(initialState);
      } else {
        toast({
          variant: "destructive",
          title: 'Registration Failed',
          description: data?.payload?.message || 'Something went wrong',
        });
      }
    })
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