// importaciones

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import FavoritesPage from "../pages/FavoritesPage";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PokemonDetailPage from "../pages/PokemonDetailPage";
import SearchPage from "../pages/SearchPage";
import { ROUTES } from "./path";
import ProtectedRoute from "../components/ProtectedRoute";
import { fetchPokemonByName } from "../hooks/useFetch";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.SEARCH,
                element: <SearchPage />,
            },
            {
                path: ROUTES.FAVORITES,
                element: (
                    <ProtectedRoute>
                        <FavoritesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.POKEMON_DETAIL,
                element: <PokemonDetailPage />,
                errorElement: <ErrorPage />,
                loader: async ({ params }) => {
                    return await fetchPokemonByName(params.name);
                },
            },
            {
                path: ROUTES.ABOUT,
                element: <AboutPage />,
            },
            {
                path: ROUTES.LOGIN,
                element: <LoginPage />,
            },
        ],
    },
]);