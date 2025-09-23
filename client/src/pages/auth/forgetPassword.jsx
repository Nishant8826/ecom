import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CommonForm from "@/components/common/form"
import { forgetPasswordForm, resetPasswordForm } from "@/config"
import { MoveLeft } from "lucide-react"


const ForgetPasswordModal = ({ open, onClose, setLoginOpen }) => {
    const [otpForm, setOtpForm] = useState({ email: '' })
    const [resetForm, setResetForm] = useState({ newPassword: '', cnfPassword: '' })
    const [showNewPass, setShowNewPass] = useState(false);

    const onSubmitOtp = (e) => {
        e.preventDefault()
        setInterval(() => {
            setShowNewPass(true);
        }, 1000);
    }

    const onSubmitPassword = (e) => {
        e.preventDefault()
    }

    const handleSignupBtn = () => {
        onClose(false);
        setLoginOpen(true)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 text-black">
                <DialogHeader className="text-center space-y-2">
                    <DialogTitle className="flex flex-row items-center gap-5 text-xl font-semibold text-black">
                        <MoveLeft onClick={() => handleSignupBtn()} className="hover:text-gray-700 hover:cursor-pointer" />
                        Reset your password
                    </DialogTitle>
                </DialogHeader>

                {
                    showNewPass ? (
                        <div className="space-y-6 mt-4">
                            <CommonForm formControls={resetPasswordForm} buttonText={"Reset Password"} formData={resetForm} setFormData={setResetForm} onSubmit={onSubmitPassword} />
                        </div>
                    ) :
                        (
                            <div className="space-y-6 mt-4">
                                <CommonForm formControls={forgetPasswordForm} buttonText={"Send OTP"} formData={otpForm} setFormData={setOtpForm} onSubmit={onSubmitOtp} />
                            </div>
                        )
                }

            </DialogContent>

        </Dialog>
    )
}

export default ForgetPasswordModal
