import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import { ShoppingHome } from './pages/shopping/home'
import ProtectedRoute from './components/common/ProtectedRoute'
import UnAuthorizedPage from './pages/unauth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import { Skeleton } from './components/ui/skeleton'

function App() {

  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  console.log("App isLoading:", isLoading);

  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />
  }

  return (

    <BrowserRouter>
      <Routes>

        <Route path='/auth' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><AuthLayout /></ProtectedRoute>}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>

        <Route path='/admin' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><AdminLayout /></ProtectedRoute>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>

        <Route path='/shop' element={<ProtectedRoute isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></ProtectedRoute>}>
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='home' element={<ShoppingHome />} />
        </Route>

        <Route path='unauth' element={<UnAuthorizedPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
