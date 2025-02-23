import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../router/path';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children;
};

export default ProtectedRoute;