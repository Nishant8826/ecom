import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ isAuthentication, user, children }) => {

    const location = useLocation();

    if (!isAuthentication && !(location.pathname.includes('login') || location.pathname.includes('signup'))) return <Navigate to={'/auth/login'} />

    if (isAuthentication && (location.pathname.includes('login') || location.pathname.includes('signup'))) {
        if (user?.role == 'admin') {
            return <Navigate to={'/admin/dashboard'} />
        } else {
            return <Navigate to={'/shop/home'} />
        }
    }

    if (isAuthentication && user?.role !== 'admin' && location.pathname.includes('admin')) return <Navigate to={'/unauth'} />

    if (isAuthentication && user?.role === 'admin' && location.pathname.includes('shop')) return <Navigate to={'/admin/dashboard'} />


    return <div>{children}</div>
}

export default ProtectedRoute