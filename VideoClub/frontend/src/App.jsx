import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from "./contexts/AuthContext";
import { ReviewsProvider } from './contexts/ReviewsContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <ReviewsProvider>
                    <FavoritesProvider>
                        <RouterProvider router={router} />
                    </FavoritesProvider>
                </ReviewsProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App
