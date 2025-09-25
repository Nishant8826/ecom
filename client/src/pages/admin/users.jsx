import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersByAdmin } from "@/services/api";
import { setUserList } from "@/store/adminUsersSlice";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.adminUser);
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);

    const allUser = async () => {
        setLoading(true);
        try {
            const resp = await fetchAllUsersByAdmin();
            if (resp && resp.status) {
                dispatch(setUserList(resp.data));
            }
        } catch (error) {
            toast({
                title: error?.response?.data?.message || "Server Error",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        allUser();
    }, [dispatch]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-600">Admin Users</h1>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, idx) => (
                        <Skeleton key={idx} className="h-16 w-full rounded-xl border-2" />
                    ))}
                </div>
            ) : userList && userList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userList.map((user) => (
                        <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Card className="cursor-pointer hover:shadow-2xl transition-shadow rounded-xl border border-gray-200 bg-white">
                                        <CardContent className="flex items-center gap-4">
                                            <Avatar className="w-14 h-14 border-2">
                                                <AvatarFallback>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-semibold text-lg text-gray-800">{user.userName}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${user.role === "admin" ? "bg-red-100 text-red-700" :
                                                    "bg-green-100 text-green-700"
                                                    }`}>
                                                    {user.role.toUpperCase()}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold">User Details</DialogTitle>
                                    </DialogHeader>
                                    <CardContent className="space-y-3">
                                        <p><strong>Name:</strong> {user.userName}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Role:</strong> {user.role}</p>
                                        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </CardContent>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 mt-12 text-lg">No users found</p>
            )}
        </div>
    );
};

export default AdminUsers;
