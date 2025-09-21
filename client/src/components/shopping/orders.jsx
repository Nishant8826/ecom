import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './order-details'
import { getAllOrdersByUser, getOrderDetails } from '@/services/api'
import { useSelector } from 'react-redux'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/utils/formatDate'
import { statusStyles } from '@/utils/orderStatusStyles'

const ShoppingOrders = () => {
    const { user } = useSelector(state => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState(null);

    const getAllOrders = async () => {
        try {
            const orders = await getAllOrdersByUser(user._id);
            setOrders(orders?.data);
        } catch (error) {
            console.log('error - getAllOrders:', error)
        }

    }

    const handleOrderDetails = async (id) => {
        setOpenDetailsDialog(true)
        const detail = await getOrderDetails(id);
        setOrderDetail(detail?.data);
    }

    useEffect(() => {
        if (user._id) {
            getAllOrders();
        }
    }, [])

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
                            orders && orders.length > 0 ? (
                                orders.map((orderItem) => (
                                    <TableRow key={orderItem?._id}>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{formatDateTime(orderItem?.orderDate)}</TableCell>
                                        <TableCell><Badge variant={null} className={`py-1 px-3 cursor-pointer ${statusStyles[orderItem?.orderStatus] || statusStyles.default}`}>{orderItem?.orderStatus}</Badge></TableCell>
                                        <TableCell>${orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetailsDialog} onOpenChange={() => setOpenDetailsDialog(false)}>
                                                <Button onClick={() => handleOrderDetails(orderItem._id)}>View Details</Button>
                                                <ShoppingOrderDetails orderDetail={orderDetail} />
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

export default ShoppingOrders