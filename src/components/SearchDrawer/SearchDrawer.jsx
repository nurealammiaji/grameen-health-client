import React from 'react'
import { RiCloseFill } from 'react-icons/ri'
import SearchDropdownAll from '../SearchDropdownAll/SearchDropdownAll'

const SearchDrawer = () => {
    return (
        <div style={{ zIndex: 1000 }} className="drawer drawer-end">
            <input id="search-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                {/* <label htmlFor="search-drawer" className="drawer-button btn btn-primary"><RiSearch2Fill className="text-2xl" /> </label> */}
            </div>
            <div className="drawer-side">
                <label htmlFor="search-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 z-[1000] text-base-content min-h-full w-60 p-4">
                    <label htmlFor="search-drawer" aria-label="close sidebar" className="absolute top-0 left-0 p-0 rounded-none btn btn-sm btn-error"><RiCloseFill className="text-3xl text-white" /></label>
                    {/* Sidebar content here */}
                    <div className="mt-8">
                        <SearchDropdownAll props={'w-4/6'} />
                    </div>
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SearchDrawer