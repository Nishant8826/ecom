import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/authSlice"
import { AuthSkeleton } from "./authSkeleton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const initialState = {
    email: "",
    password: ""
}

const LoginModal = ({ open, onClose, setSignupOpen, setForgetPassword }) => {
    const [formData, setFormData] = useState(initialState);
    const [errorData, setErrorData] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false, });
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { toast } = useToast()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await dispatch(loginUser(formData))
            if (data?.payload?.success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome back!",
                    variant: "success"
                })
                onClose(false)
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: data?.payload?.message || "Something went wrong"
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSignupBtn = () => {
        onClose(false);
        setSignupOpen(true)
        setForgetPassword(false);
    }

    const handleForgetPasswordBtn = () => {
        onClose(false);
        setSignupOpen(false)
        setForgetPassword(true);
    }

    const validateForm = (formData) => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Enter a valid email address";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };


    useEffect(() => {
        const errors = validateForm(formData);
        setErrorData(errors);
    }, [formData]);

    const isFormValid = Object.values(errorData).every((err) => err === "") && formData.email.trim() !== "" && formData.password.trim() !== "";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 text-black">
                {
                    loading ? (
                        <>
                            <DialogTitle></DialogTitle>
                            <AuthSkeleton />
                        </>
                    ) : (
                        <>
                            <DialogHeader className="text-center space-y-2">
                                <DialogTitle className="text-xl font-semibold text-black">
                                    Login to your account
                                </DialogTitle>
                                <p className="text-sm text-gray-400">
                                    Enter your credentials to continue
                                </p>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                                <form onSubmit={onSubmit}>
                                    <div className='flex flex-col gap-3'>
                                        <div className='grid w-full gap-1.5'>
                                            <Label className='mb-1'>Email</Label>
                                            <Input className='rounded-[5px] border-gray-200 placeholder:text-gray-400' name='email' type='email' placeholder='Enter email' value={formData.email} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} onBlur={() => setTouched((prev) => ({ ...prev, email: true }))} />
                                            {touched.email && errorData.email && (
                                                <p className="text-red-500 text-xs">{errorData.email}</p>
                                            )}
                                        </div>
                                        <div className='grid w-full gap-1.5'>
                                            <Label className='mb-1'>Password</Label>
                                            <Input className='rounded-[5px] border-gray-200 placeholder:text-gray-400' name='password' type='password' placeholder='Enter password' value={formData.password} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} onBlur={() => setTouched((prev) => ({ ...prev, password: true }))} />
                                            {touched.password && errorData.password && (
                                                <p className="text-red-500 text-xs">{errorData.password}</p>
                                            )}
                                        </div>
                                        <Button className='mt-2 w-full bg-black text-white rounded-[5px] hover:bg-black/80' type='submit' disabled={!isFormValid}>Login</Button>
                                    </div>
                                </form>
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => handleForgetPasswordBtn()} className="hover:text-indigo-400 text-sm text-gray-400 relative cursor-pointer text-md font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all after:duration-500 hover:after:w-full" >
                                        Forgot password?
                                    </button>
                                </div>
                                <p className="border border-b"></p>
                                <div className="flex justify-center text-sm text-gray-400">
                                    <span>Don't Have an account? </span>
                                    <button type="button" onClick={() => handleSignupBtn()} className="hover:text-indigo-400 text-sm text-gray-400 relative cursor-pointer text-md font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all after:duration-500 hover:after:w-full ml-1" >
                                        Create account
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
            </DialogContent>

        </Dialog >
    )
}

export default LoginModal
