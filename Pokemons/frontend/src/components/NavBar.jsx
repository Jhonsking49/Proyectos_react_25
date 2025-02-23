import { NavLink } from "react-router-dom";
import { ROUTES } from "../router/path";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const navLinkStyles = ({ isActive }) => 
        `text-[#B0BEC5] text-lg transition-all duration-200 hover:text-[#00B0FF] 
        ${isActive ? "font-bold border-b-2 border-[#00B0FF]" : ""}`;

    return (
        <nav className="bg-[#000000] border-b border-[#00B0FF] shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <NavLink to={ROUTES.HOME} className="text-[#00B0FF] text-2xl font-bold hover:text-[#FF1744] transition-colors duration-200">
                    POKÉDEX
                </NavLink>
                <div className="flex items-center space-x-6">
                    <NavLink to={ROUTES.HOME} className={navLinkStyles}>
                        Inicio
                    </NavLink>
                    <NavLink to={ROUTES.SEARCH} className={navLinkStyles}>
                        Buscar
                    </NavLink>
                    <NavLink to={ROUTES.FAVORITES} className={navLinkStyles}>
                        Favoritos
                    </NavLink>
                    <NavLink to={ROUTES.ABOUT} className={navLinkStyles}>
                        About
                    </NavLink>
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-[#B0BEC5] text-lg">¡Hola, {user?.username}!</span>
                            <button
                                onClick={logout}
                                className="bg-[#FF1744] text-white px-4 py-2 rounded-lg hover:bg-[#8E24AA] transition-colors duration-200 text-sm font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to={ROUTES.LOGIN}
                            className="bg-[#00B0FF] text-white px-6 py-2 rounded-lg hover:bg-[#8E24AA] transition-colors duration-200 text-sm font-medium"
                        >
                            Iniciar Sesión
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;