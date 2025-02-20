import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from "./contexts/AuthContext";
import { ReviewsProvider } from './contexts/ReviewsContext';

function App() {
    return (
        <AuthProvider>
            <ReviewsProvider>
                <FavoritesProvider>
                    <RouterProvider router={router} />
                </FavoritesProvider>
            </ReviewsProvider>
        </AuthProvider>
    );
}

export default App
