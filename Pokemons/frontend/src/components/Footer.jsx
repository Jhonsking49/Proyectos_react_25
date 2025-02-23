
const Footer = () => {
    return (
        <footer className="bg-[#000000] border-t border-[#00B0FF] text-[#B0BEC5] py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2 text-[#00B0FF]">Pokédex App</h3>
                    <p className="text-sm">Created by Juan Rey González</p>
                    <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;