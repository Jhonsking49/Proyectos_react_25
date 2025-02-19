import { createBrowserRouter, Navigate } from "react-router-dom";
import Rootlayout from "../layouts/Rootlayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Search from "../pages/Search";
import Reviews from "../pages/Reviews";
import Favorites from "../pages/Favorites";
import Login from "../pages/LoginPage";
import Register from "../pages/Registerpage";
import ProtectedRoute from "../components/ProtectedRoute";

// Componente para proteger rutas
/*const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("auth");
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};*/

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <ProtectedRoute element={<Rootlayout />} />,
        errorElement: <Error />,
        children: [
            { 
                index: true, 
                element: <Home /> 
            },
            { 
                path: "movies", 
                element: <MovieList /> 
            },
            { 
                path: "movie/:id", 
                element: <MovieDetail /> 
            },
            { 
                path: "search", 
                element: <Search /> 
            },
            { 
                path: "reviews", 
                element: <Reviews /> 
            },
            { 
                path: "favorites", 
                element: <Favorites /> 
            },
        ],
    },
]);
