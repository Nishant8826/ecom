import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLayout from './components/admin/layout'
import AdminDashboard from './pages/admin/dashboard'
import AdminFeatures from './pages/admin/features'
import AdminOrders from './pages/admin/order'
import AdminProducts from './pages/admin/products'
import ShoppingLayout from './components/shopping/layout'
import NotFound from './pages/notFound'
import ShoppingAccount from './pages/shopping/account'
import ShoppingCheckout from './pages/shopping/checkout'
import ShoppingListing from './pages/shopping/listing'
import ProtectedRoute from './components/common/ProtectedRoute'
import UnAuthorizedPage from './pages/unauth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkAuth } from './store/authSlice'
import { motion } from "framer-motion";
import ShoppingHome from './pages/shopping/home'
import StripeSuccess from './pages/shopping/success'
import StripeCancel from './pages/shopping/cancel'
import SearchProducts from './pages/shopping/search'
import { fetchCart } from './store/cartSlice'
import AdminUsers from './pages/admin/users'

const App = () => {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  useEffect(() => {
    if (user && user._id && user.role != 'admin') {
      dispatch(fetchCart({ userId: user?._id }));
    }
  }, [user])


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center px-4 overflow-hidden">
        <motion.div className="relative mb-8" initial={{ rotate: 0, scale: 0.8 }} animate={{ rotate: 360, scale: 1 }} transition={{ rotate: { repeat: Infinity, duration: 1, ease: "linear" }, scale: { duration: 0.5, ease: "easeInOut" }, }}>
          <div className="h-16 w-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </motion.div>

        <motion.h2 className="text-2xl font-semibold text-gray-700 mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} >
          Warming up your experience...
        </motion.h2>

        <motion.p className="text-gray-500 text-sm max-w-md" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} >
          Our services might be waking up from sleep. It’ll just take a few seconds — once ready, everything will load smoothly.
        </motion.p>

        <motion.div className="absolute bottom-24 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} />
      </div>
    );
  }

  return (

    <BrowserRouter>
      <Routes>

        <Route path='' element={<Navigate to={'/shop/home'} />} />

        <Route path='/admin' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><AdminLayout /></ProtectedRoute>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='users' element={<AdminUsers />} />
        </Route>

        <Route path='/shop' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></ProtectedRoute>}>
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='success' element={<StripeSuccess />} />
          <Route path='cancel' element={<StripeCancel />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='home' element={<ShoppingHome />} />
          <Route path='search' element={<SearchProducts />} />
        </Route>

        <Route path='unauth' element={<UnAuthorizedPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
