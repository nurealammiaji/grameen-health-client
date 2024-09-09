import React from 'react'

const SearchDrawer = () => {
    return (
        <div className="drawer drawer-end">
            <input id="search-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                {/* <label htmlFor="search-drawer" className="drawer-button btn btn-primary"><RiSearch2Fill className="text-2xl" /> </label> */}
            </div>
            <div className="drawer-side">
                <label htmlFor="search-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 z-[1000] text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SearchDrawer