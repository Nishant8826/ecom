import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    if (location.pathname === "/shop/home") {
        if (!isAuthenticated) {
            return <div>{children}</div>;
        } else if (isAuthenticated && user?.role == "shop") {
            return <Navigate to="/shop/home" replace />;
        }
    }

    if (!isAuthenticated && location.pathname == "/admin/dashboard") {
        return <Navigate to="/unauth" />;
    }


    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
        return <Navigate to="/unauth" />;
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <div>{children}</div>;
};

export default ProtectedRoute;
