import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
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
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import { Skeleton } from './components/ui/skeleton'
import ShoppingHome from './pages/shopping/home'
import StripeSuccess from './pages/shopping/success'
import StripeCancel from './pages/shopping/cancel'
import SearchProducts from './pages/shopping/search'
import { fetchCart } from './store/cartSlice'

const App = () => {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);


  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCart({ userId: user?._id }));
    }
  }, [user])


  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-200" />
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
