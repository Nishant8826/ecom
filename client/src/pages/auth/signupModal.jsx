import CommonForm from '@/components/common/form';
import { registerationForm } from '@/config';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from "../../store/authSlice";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoginModal from './loginModal';

const initialState = {
    userName: '',
    email: '',
    password: ''
}

const SignupModal = ({ open, onClose, setLoginOpen, setForgetPassword }) => {
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

    const handleLoginBtn = () => {
        onClose(false);
        setLoginOpen(true);
        setForgetPassword(false);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 text-black">
                <DialogHeader className="text-center space-y-2">
                    <DialogTitle className="text-xl font-semibold text-black">
                        Create your account
                    </DialogTitle>
                    <p className="text-sm text-gray-400">
                        Enter your details to continue
                    </p>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <CommonForm formControls={registerationForm} buttonText={'Sign Up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />

                    <div className="flex justify-center text-sm text-gray-400">
                        <span>Already have an account? </span>
                        <button type="button" onClick={() => handleLoginBtn()} className="hover:text-indigo-400 transition ml-1 text-gray-600 font-semibold" >
                            Login
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )

}


export default SignupModal