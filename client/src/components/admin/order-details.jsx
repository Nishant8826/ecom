import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DialogContent, DialogTitle } from '../ui/dialog'
import CommonForm from '../common/form'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { formatDateTime } from '@/utils/formatDate'
import { fetchAllOrdersByAdmin, updateOrderByAdmin } from '@/services/api'
import { setOrderDetails, setOrderList } from '@/store/adminOrderSlice'
import { statusStyles } from '@/utils/orderStatusStyles'
import { useToast } from '@/hooks/use-toast'


const AdminOrderDetails = () => {
    const { user } = useSelector(state => state.auth);
    const { orderDetails } = useSelector(state => state.adminOrder);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState('');
    const { toast } = useToast();

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            const resp = await updateOrderByAdmin(orderDetails?._id, formData?.status);
            dispatch(setOrderDetails(resp.data));
            toast({ title: 'order status updated successfully!' })
            const list = await fetchAllOrdersByAdmin();
            dispatch(setOrderList(list.data));
        } catch (error) {
            console.log('Error while handleUpdateStatus : ', error);
        }
    }

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogTitle></DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{formatDateTime(orderDetails?.orderDate)}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label><Badge variant={null} className={`py-1 px-3 cursor-pointer ${statusStyles[orderDetails?.orderStatus] || statusStyles.default}`}>{orderDetails?.orderStatus}</Badge></Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.map((item) => (
                                    <li key={item?._id} className="flex items-center justify-between">
                                        <span>{item?.title}</span>
                                        {/* <span>{item?.quantity}</span> */}
                                        <span>${item?.price}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
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