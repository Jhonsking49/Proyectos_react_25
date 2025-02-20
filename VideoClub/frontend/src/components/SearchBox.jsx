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
        onSearch(value); // Real-time search
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-800 placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-600 transition-colors"
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