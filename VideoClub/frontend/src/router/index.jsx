import { createBrowserRouter } from "react-router-dom";
import Rootlayout from "../layout/RootLayout"
import Error from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Search from "../pages/SearchPage";
import Reviews from "../pages/ReviewsPage";
import Favorites from "../pages/FavoritesPage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

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
        element: <ProtectedRoute />,
        children: [
            {
                element: <Rootlayout />,
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
            }
        ],
    },
]);