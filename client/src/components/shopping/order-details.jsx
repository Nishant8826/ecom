import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DialogContent, DialogTitle } from '../ui/dialog'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/utils/formatDate'
import { statusStyles } from '@/utils/orderStatusStyles'

const ShoppingOrderDetails = ({ orderDetail }) => {
    const { user } = useSelector(state => state.auth);

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogTitle></DialogTitle>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{orderDetail?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Date</p>
                        <Label>{formatDateTime(orderDetail?.orderDate)}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>${orderDetail?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Method</p>
                        <Label>{orderDetail?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetail?.paymentStatus}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label><Badge variant={null} className={`py-1 px-3 cursor-pointer ${statusStyles[orderDetail?.orderStatus] || statusStyles.default}`}>{orderDetail?.orderStatus}</Badge></Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {
                                orderDetail?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
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
                            <span>{orderDetail?.addressInfo?.address}</span>
                            <span>{orderDetail?.addressInfo?.city}</span>
                            <span>{orderDetail?.addressInfo?.pincode}</span>
                            <span>{orderDetail?.addressInfo?.phone}</span>
                            <span>{orderDetail?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetails