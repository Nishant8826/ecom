import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CommonForm from "@/components/common/form"
import { loginForm } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/authSlice"
import { LogIn } from "lucide-react"
import SignupModal from "./signupModal"

const initialState = {
    email: "",
    password: ""
}

const LoginModal = ({ open, onClose, setSignupOpen, setForgetPassword }) => {
    const [formData, setFormData] = useState(initialState);
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

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 text-black">
                <DialogHeader className="text-center space-y-2">
                    <DialogTitle className="text-xl font-semibold text-black">
                        Login to your account
                    </DialogTitle>
                    <p className="text-sm text-gray-400">
                        Enter your credentials to continue
                    </p>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {
                        loading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        ) : (
                            <>
                                <CommonForm formControls={loginForm} buttonText={"Login"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => handleForgetPasswordBtn()} className="hover:text-indigo-400 text-sm text-gray-400 relative cursor-pointer text-md font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all after:duration-500 hover:after:w-full" >
                                        Forgot password?
                                    </button>
                                </div>
                                <p className="border border-b"></p>
                                <div className="flex justify-center text-sm text-gray-400">
                                    <span>Don't Have an account? </span>
                                    <button type="button" onClick={() => handleSignupBtn()} className="hover:text-indigo-400 text-sm text-gray-400 relative cursor-pointer text-md font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-400 after:transition-all after:duration-500 hover:after:w-full" >
                                        Create account
                                    </button>
                                </div>
                            </>
                        )
                    }

                </div>
            </DialogContent>

        </Dialog >
    )
}

export default LoginModal
