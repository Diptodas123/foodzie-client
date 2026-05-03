import { Navigate, useLocation } from 'react-router-dom';

interface User {
    role: string;
    [key: string]: unknown;
}

interface CheckAuthTypes {
    isAuthenticated: boolean;
    user: User | null;
    children: React.ReactNode;
};

const CheckAuth = ({
    isAuthenticated,
    user,
    children,
}: CheckAuthTypes) => {
    const location = useLocation();

    // Redirect to login if not authenticated and trying to access protected routes
    if (!isAuthenticated &&
        !(location.pathname.includes("/login")
            || location.pathname.includes("/register")
        )) {
        return <Navigate to="/auth/login" />;
    }

    // Redirect to appropriate dashboard if already authenticated
    if (isAuthenticated &&
        (location.pathname.includes("/login")
            || location.pathname.includes("/register")
        )) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }

    // Redirect non-admin users away from admin routes
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
        return <Navigate to="/unauth-page" />;
    }

    // Redirect admin users away from shopping routes
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    // If none of the above conditions are met, render the children components
    return <>{children}</>;

}

export default CheckAuth;