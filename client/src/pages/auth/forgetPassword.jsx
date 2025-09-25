import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoveLeft } from "lucide-react"
import { motion } from "motion/react"
import { resetPassword, sendForgetPswrdOtp, verifyOtpForPswrd } from "@/services/api"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const ForgetPasswordModal = ({ open, onClose, setLoginOpen }) => {
    const [otpForm, setOtpForm] = useState({ email: "" })
    const [verifyForm, setVerifyForm] = useState({ otp: "" })
    const [resetForm, setResetForm] = useState({ newPassword: "", cnfPassword: "" })
    const [step, setStep] = useState("email") // "email" | "otp" | "reset"
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const sendOtp = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const resp = await sendForgetPswrdOtp({ email: otpForm.email });
            toast({ title: resp?.message })
            setStep("otp")
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            })
        } finally {
            setLoading(false);
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await verifyOtpForPswrd({ email: otpForm?.email, otp: verifyForm?.otp, type: 'FORGOT_PASSWORD' })
            toast({ title: "OTP verified successfully!" })
            setStep("reset")
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message || "Invalid OTP",
            })
        } finally {
            setLoading(false)
        }
    }

    const onResetPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await resetPassword({ email: otpForm?.email, newPassword: resetForm?.newPassword, cnfPassword: resetForm?.cnfPassword });
            toast({ title: "Password reset successfully!" })
            onClose(false)
            setLoginOpen(true)
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message || "Password reset failed",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSignupBtn = () => {
        onClose(false);
        setLoginOpen(true)
    }


    const renderSkeleton = () => (
        <div className="space-y-4 mt-6">
            <Skeleton className="h-5 w-32 rounded-lg border-2" />
            <Skeleton className="h-8 w-full rounded-lg border-2" />
            {step == 'reset' && <>
                <Skeleton className="h-5 w-32 rounded-lg border-2" />
                <Skeleton className="h-8 w-full rounded-lg border-2" />
            </>
            }
            <Skeleton className="h-8 w-full mx-auto rounded-lg border-2" />
        </div>
    )


    const renderEmailForm = () => (
        <form onSubmit={sendOtp} className="space-y-6 mt-4">
            <div className="flex flex-col gap-3">
                <div className="grid w-full gap-2">
                    <Label>Email</Label>
                    <Input className="rounded-[5px] border-gray-200 placeholder:text-gray-400" name="email" type="email" placeholder="Enter email" value={otpForm.email} onChange={(e) => setOtpForm({ ...otpForm, [e.target.name]: e.target.value })}
                    />
                </div>
                <Button className="mt-2 w-full bg-black text-white rounded-[5px] hover:bg-black/80" type="submit">
                    Send OTP
                </Button>
            </div>
        </form>
    )


    const renderOtpForm = () => (
        <form onSubmit={verifyOtp} className="space-y-6 mt-4">
            <div className="flex flex-col gap-3">
                <div className="grid w-full gap-2">
                    <Label>Enter OTP</Label>
                    <Input className="rounded-[5px] border-gray-200 placeholder:text-gray-400" name="otp" type="text" placeholder="Enter 6-digit OTP" maxLength={6} value={verifyForm.otp} onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 6) {
                            setVerifyForm({ ...verifyForm, [e.target.name]: value });
                        }
                    }} />
                </div>
                <Button className="mt-2 w-full bg-black text-white rounded-[5px] hover:bg-black/80" type="submit">
                    Verify OTP
                </Button>
            </div>
        </form>
    )


    const renderResetForm = () => (
        <form onSubmit={onResetPassword} className="space-y-6 mt-4">
            <div className="flex flex-col gap-3">
                <div className="grid w-full gap-2">
                    <Label>New Password</Label>
                    <Input className="rounded-[5px] border-gray-200 placeholder:text-gray-400" name="newPassword" type="password" placeholder="Enter password" value={resetForm.newPassword} onChange={(e) => setResetForm({ ...resetForm, [e.target.name]: e.target.value })} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Confirm Password</Label>
                    <Input className="rounded-[5px] border-gray-200 placeholder:text-gray-400" name="cnfPassword" type="password" placeholder="Confirm password" value={resetForm.cnfPassword} onChange={(e) => setResetForm({ ...resetForm, [e.target.name]: e.target.value })} />
                </div>
                <Button className="mt-2 w-full bg-black text-white rounded-[5px] hover:bg-black/80" type="submit">
                    Reset Password
                </Button>
            </div>
        </form>
    )

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 text-black">
                {
                    step == 'email' && !loading && (<>
                        <DialogHeader className="text-center space-y-2">
                            <DialogTitle className="flex flex-row items-center gap-5 text-xl font-semibold text-black">
                                <motion.button whileHover={{ scale: 1.2, transition: { duration: 0.1 } }} transition={{ duration: 0.5 }}>
                                    <MoveLeft onClick={handleSignupBtn} className="hover:text-gray-700 hover:cursor-pointer" />
                                </motion.button>
                                Reset your password
                            </DialogTitle>
                        </DialogHeader>
                    </>)
                }

                {loading && renderSkeleton()}
                {!loading && step === "email" && renderEmailForm()}
                {!loading && step === "otp" && renderOtpForm()}
                {!loading && step === "reset" && renderResetForm()}
            </DialogContent>
        </Dialog>
    )
}

export default ForgetPasswordModal
