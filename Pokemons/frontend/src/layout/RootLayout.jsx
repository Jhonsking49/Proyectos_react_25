import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#000000]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;