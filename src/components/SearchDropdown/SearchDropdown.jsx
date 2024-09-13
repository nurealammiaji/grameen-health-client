import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchDropdown = ({props}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {

            if (query.trim()) {
                try {
                    const response = await axios.get('http://localhost:5000/api/search', {
                        params: { query }
                    });
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setResults([]);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="relative">
            <label className={`input input-bordered input-success md:input-sm lg:input-md items-center gap-2 flex join-item ${props}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 text-success font-bold opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
                <input type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay to allow click event to register
                    placeholder="Search..."
                    className="grow" />
            </label>

            {isOpen && (
                <div className="dropdown dropdown-open absolute z-10 w-full mt-1">
                    <ul className="menu dropdown-content bg-white shadow-md border border-gray-200 w-full max-h-60 overflow-y-auto p-2">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <li key={item._id} className="p-2 hover:bg-gray-200 cursor-pointer">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchDropdown;
