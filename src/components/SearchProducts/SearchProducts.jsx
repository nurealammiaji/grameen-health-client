import React, { useState, useEffect, useRef } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchProducts = ({ props }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const dropdownRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim()) {
                try {
                    const response = await axiosPublic.get('/searches/read/products', {
                        params: { query },
                    });
                    setResults(response.data.products); // Only store products
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setResults([]);
            }
        };

        fetchResults();
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsOpen(true);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (!dropdownRef.current.contains(e.relatedTarget)) {
                setIsOpen(false);
            }
        }, 100);
    };

    const handleResultClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <label className={`input input-bordered input-success sm:input-sm lg:input-md items-center gap-2 flex join-item ${props}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 font-bold text-success opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={`${t('search')}...`}
                    className="grow"
                />
            </label>
            {isOpen && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 dropdown dropdown-open">
                    <ul className="w-full p-2 overflow-y-auto bg-white border border-gray-200 shadow-md menu dropdown-content max-h-60">
                        <h3 className="p-2 text-lg font-bold text-success">Products</h3>
                        {results.map((item) => (
                            <Link to={`products/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-600">{item.price}</p>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
            {isOpen && results.length === 0 && (
                <div className="absolute z-10 w-full mt-1 dropdown dropdown-open">
                    <ul className="w-full p-2 bg-white border border-gray-200 shadow-md menu dropdown-content">
                        <li className="p-2 text-gray-500">No results found</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchProducts;
