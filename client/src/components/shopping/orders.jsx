import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './order-details'

const ShoppingOrders = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
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
                        <TableRow>
                            <TableCell>12345</TableCell>
                            <TableCell>12/01/2025</TableCell>
                            <TableCell>Delivered</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>
                                <Dialog open={openDetailsDialog} onOpenChange={() => setOpenDetailsDialog(false)}>
                                    <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
                                    <ShoppingOrderDetails />
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders