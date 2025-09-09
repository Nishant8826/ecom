import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { Dialog } from '../ui/dialog'
import AdminOrderDetails from './order-details'
import { fetchAllOrdersByAdmin, fetchOrderDetailsByAdmin } from '@/services/api'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/utils/formatDate'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderDetails, setOrderList } from '@/store/adminOrderSlice'
import { statusStyles } from '@/utils/orderStatusStyles'

const AdminOrderView = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector(state => state.adminOrder)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const fetchAllOrders = async () => {
        const resp = await fetchAllOrdersByAdmin();
        dispatch(setOrderList(resp.data));
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleOrderDetails = async (id) => {
        setOpenDetailsDialog(true)
        const resp = await fetchOrderDetailsByAdmin(id);
        dispatch(setOrderDetails(resp.data))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ? (
                                orderList.map((orderItem) => (
                                    <TableRow key={orderItem?._id}>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{formatDateTime(orderItem?.orderDate)}</TableCell>
                                        <TableCell><Badge variant={null} className={`py-1 px-3 cursor-pointer ${statusStyles[orderItem?.orderStatus] || statusStyles.default}`}>{orderItem?.orderStatus}</Badge></TableCell>
                                        <TableCell>${orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetailsDialog} onOpenChange={() => setOpenDetailsDialog(false)}>
                                                <Button onClick={() => handleOrderDetails(orderItem._id)}>View Details</Button>
                                                <AdminOrderDetails />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Skeleton className="h-4 w-20 bg-slate-200" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-28 bg-slate-200" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-24 bg-slate-200" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-16 bg-slate-200" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-24 rounded-lg bg-slate-200" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    )
}

export default AdminOrderView