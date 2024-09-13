import React from 'react'
import { RiCloseCircleFill, RiCloseFill } from 'react-icons/ri'
import SearchDropdown from '../SearchDropdown/SearchDropdown'

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
                    <label htmlFor="search-drawer" aria-label="close sidebar" className="btn btn-sm p-0 btn-error absolute top-0 left-0 rounded-none"><RiCloseFill className="text-3xl text-white" /></label>
                    {/* Sidebar content here */}
                    <div className="mt-8">
                        <SearchDropdown props={'w-4/6 mx-auto'} />
                    </div>
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SearchDrawer