import React, { useState, useEffect, useRef } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchDropdownAll = ({ props }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        products: [],
        categories: [],
        subCategories: [],
        shops: [],
        users: [],
    });
    const [isOpen, setIsOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const dropdownRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim()) {
                try {
                    const response = await axiosPublic.get('/searches/read', {
                        params: { query },
                    });
                    setResults(response.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            } else {
                setResults({
                    products: [],
                    categories: [],
                    subCategories: [],
                    shops: [],
                    users: [],
                });
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
        // Close the dropdown only if the click was outside of it
        setTimeout(() => {
            if (!dropdownRef.current.contains(e.relatedTarget)) {
                setIsOpen(false);
            }
        }, 100);
    };

    const handleResultClick = () => {
        setIsOpen(false); // Close dropdown after clicking a result
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
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 text-center dropdown dropdown-open">
                    <ul className="w-full p-2 overflow-scroll overflow-x-hidden bg-white border border-gray-200 shadow-md menu dropdown-content">
                        {/* Products */}
                        {results.products.length > 0 && (
                            <>
                                <h3 className="p-2 text-lg font-bold bg-gray-100 text-success">Products: <span className="font-thin text-info">( {results.products.length} )</span></h3>
                                <hr />
                                {results.products.map((item) => (
                                    <Link to={`products/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                        <div>
                                            <h4 className="font-semibold text-slate-400">{item.name}</h4>
                                            {/* <p className="text-sm text-gray-600">{item.price}</p> */}
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* Categories */}
                        {results.categories.length > 0 && (
                            <>
                                <h3 className="p-2 text-lg font-bold bg-gray-100 text-success">Categories: <span className="font-thin text-info">( {results.categories.length} )</span></h3>
                                <hr />
                                {results.categories.map((item) => (
                                    <Link to={`categories/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* Subcategories */}
                        {results.subCategories.length > 0 && (
                            <>
                                <h3 className="p-2 text-lg font-bold bg-gray-100 text-success">Sub Categories: <span className="font-thin text-info">( {results.subCategories.length} )</span></h3>
                                <hr />
                                {results.subCategories.map((item) => (
                                    <Link to={`subCategories/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* Shops */}
                        {results.shops.length > 0 && (
                            <>
                                <h3 className="p-2 text-lg font-bold bg-gray-100 text-success">Shops : <span className="font-thin text-info">( {results.shops.length} )</span></h3>
                                <hr />
                                {results.shops.map((item) => (
                                    <Link to={`shops/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* Users */}
                        {results.users.length > 0 && (
                            <>
                                <h3 className="p-2 text-lg font-bold text-success">Users: <span className="font-thin text-info"> ( {results.users.length} )</span></h3>
                                <hr />
                                {results.users.map((item) => (
                                    <Link to={`users/${item._id}`} key={item._id} className="p-2 cursor-pointer hover:bg-success hover:text-white" onClick={handleResultClick}>
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                        {/* No results found */}
                        {results.products.length === 0 && results.categories.length === 0 &&
                            results.subCategories.length === 0 && results.shops.length === 0 && results.users.length === 0 && (
                                <li className="p-2 text-gray-500">No results found</li>
                            )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchDropdownAll;
