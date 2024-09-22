// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAxiosPublic from './../../hooks/useAxiosPublic';

// const SearchDropdown = ({ props }) => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState({ products: [], categories: [], subCategories: [], shops: [], users: [] });
//     const [isOpen, setIsOpen] = useState(false);
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         const fetchResults = async () => {
//             if (query.trim()) {
//                 try {
//                     const response = await axiosPublic.get('/search', {
//                         params: { query }
//                     });
//                     setResults(response.data);
//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                 }
//             } else {
//                 setResults({ products: [], categories: [], subCategories: [], shops: [], users: [] });
//             }
//         };

//         fetchResults();
//     }, [query]);

//     return (
//         <div className="relative">
//             <label className={`input input-bordered input-success md:input-sm lg:input-md items-center gap-2 flex join-item ${props}`}>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 16 16"
//                     fill="currentColor"
//                     className="w-4 h-4 font-bold text-success opacity-70">
//                     <path
//                         fillRule="evenodd"
//                         d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                         clipRule="evenodd" />
//                 </svg>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => {
//                         setQuery(e.target.value);
//                         setIsOpen(true);
//                     }}
//                     onFocus={() => setIsOpen(true)}
//                     onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay to allow click event to register
//                     placeholder="Search..."
//                     className="grow"
//                 />
//             </label>

//             {isOpen && (
//                 <div className="absolute z-10 w-full mt-1 dropdown dropdown-open">
//                     <ul className="w-full p-2 overflow-y-auto bg-white border border-gray-200 shadow-md menu dropdown-content max-h-60">
//                         {/* Products */}
//                         {results.products.length > 0 && (
//                             <>
//                                 <h3 className="p-2 font-bold">Products</h3>
//                                 {results.products.map((item) => (
//                                     <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
//                                         <div>
//                                             <h4 className="font-semibold">{item.name}</h4>
//                                             <p className="text-sm text-gray-600">{item.description}</p>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </>
//                         )}

//                         {/* Categories */}
//                         {results.categories.length > 0 && (
//                             <>
//                                 <h3 className="p-2 font-bold">Categories</h3>
//                                 {results.categories.map((item) => (
//                                     <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
//                                         <div>
//                                             <h4 className="font-semibold">{item.title}</h4>
//                                             <p className="text-sm text-gray-600">{item.description}</p>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </>
//                         )}

//                         {/* Subcategories */}
//                         {results.subCategories.length > 0 && (
//                             <>
//                                 <h3 className="p-2 font-bold">Subcategories</h3>
//                                 {results.subCategories.map((item) => (
//                                     <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
//                                         <div>
//                                             <h4 className="font-semibold">{item.title}</h4>
//                                             <p className="text-sm text-gray-600">{item.category}</p>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </>
//                         )}

//                         {/* Shops */}
//                         {results.shops.length > 0 && (
//                             <>
//                                 <h3 className="p-2 font-bold">Shops</h3>
//                                 {results.shops.map((item) => (
//                                     <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
//                                         <div>
//                                             <h4 className="font-semibold">{item.name}</h4>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </>
//                         )}

//                         {/* Users */}
//                         {results.users.length > 0 && (
//                             <>
//                                 <h3 className="p-2 font-bold">Users</h3>
//                                 {results.users.map((item) => (
//                                     <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
//                                         <div>
//                                             <h4 className="font-semibold">{item.name}</h4>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </>
//                         )}

//                         {/* No results found */}
//                         {results.products.length === 0 && results.categories.length === 0 &&
//                             results.subCategories.length === 0 && results.shops.length === 0 && results.users.length === 0 && (
//                                 <li className="p-2 text-gray-500">No results found</li>
//                             )}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SearchDropdown;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchDropdown = ({ props }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Adjust the delay time as needed

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.trim()) {
                try {
                    const response = await axios.get('http://localhost:5000/api/v1/search', {
                        params: { query: debouncedQuery }
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
    }, [debouncedQuery]);

    return (
        <div className="relative">
            <label className={`input input-bordered input-success md:input-sm lg:input-md items-center gap-2 flex join-item ${props}`}>
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
                <div className="absolute z-10 w-full mt-1 dropdown dropdown-open">
                    <ul className="w-full p-2 overflow-y-auto bg-white border border-gray-200 shadow-md menu dropdown-content max-h-60">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <li key={item._id} className="p-2 cursor-pointer hover:bg-gray-200">
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
