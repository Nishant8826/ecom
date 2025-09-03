import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DialogContent, DialogTitle } from '../ui/dialog'
import CommonForm from '../common/form'


const initialFormData = {
    status: "",
};

const AdminOrderDetails = () => {
    const [formData, setFormData] = useState(initialFormData);


    const handleUpdateStatus = (e) => {
        e.preventDefault();
    }

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogTitle></DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>12344</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>12/01/2025</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>$1000</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>UPI</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>Success</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>In Process</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span>Title: </span>
                                <span>Quantity: </span>
                                <span>Price: $</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>Nishant</span>
                            <span>orderDetails?.addressInfo?.address</span>
                            <span>orderDetails?.addressInfo?.city</span>
                            <span>orderDetails?.addressInfo?.pincode</span>
                            <span>orderDetails?.addressInfo?.phone</span>
                            <span>orderDetails?.addressInfo?.notes</span>
                        </div>
                    </div>
                </div>

                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetails