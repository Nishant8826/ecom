import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ isAuthenticated, user, children }) => {

    const location = useLocation();

    console.log(location.pathname, isAuthenticated);
    

    if (!isAuthenticated && !(location.pathname.includes('login') || location.pathname.includes('signup'))) return <Navigate to={'/auth/login'} />

    if (isAuthenticated && (location.pathname.includes('login') || location.pathname.includes('signup'))) {
        if (user?.role == 'admin') {
            return <Navigate to={'/admin/dashboard'} />
        } else {
            return <Navigate to={'/shop/home'} />
        }
    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) return <Navigate to={'/unauth'} />

    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) return <Navigate to={'/admin/dashboard'} />


    return <div>{children}</div>
}

export default ProtectedRoute