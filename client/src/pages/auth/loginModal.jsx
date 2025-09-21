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

const LoginModal = ({ open, onClose, setSignupOpen }) => {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const { toast } = useToast()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData)).then((data) => {
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
        })
    }

    const handleSignupBtn = () => {
        onClose(false);
        setSignupOpen(true)
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
                    <CommonForm formControls={loginForm} buttonText={"Login"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />

                    <div className="flex justify-end text-sm text-gray-400">
                        <button type="button" className="hover:text-indigo-400 transition" >
                            Forgot password?
                        </button>
                    </div>
                    <p className="border border-b"></p>
                    <div className="flex justify-center text-sm text-gray-400">
                        <span>Don't Have an account? </span>
                        <button type="button" onClick={() => handleSignupBtn()} className="hover:text-indigo-400 transition ml-1 text-gray-600 font-semibold" >
                            Create account
                        </button>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}

export default LoginModal
