import { useState } from 'react';

const SearchBox = ({ onSearch, placeholder = "Buscar películas..." }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-[#121212] border-2 border-[#1A1DFF] text-white 
                             placeholder-[#6B7280] focus:outline-none focus:border-[#FF007F] focus:ring-1 
                             focus:ring-[#FF007F] transition-all duration-300
                             group-hover:border-[#FF007F] group-hover:shadow-[0_0_10px_#1A1DFF]"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1DFF] 
                             hover:text-[#FF007F] transition-all duration-300
                             hover:drop-shadow-[0_0_5px_#FF007F]"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default SearchBox;