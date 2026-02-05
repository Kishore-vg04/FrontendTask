import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // if not logged in → redirect to login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // if logged in → allow access
    return children;
};

export default ProtectedRoute;

