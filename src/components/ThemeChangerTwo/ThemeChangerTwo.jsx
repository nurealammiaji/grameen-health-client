import React, { useEffect, useState } from 'react';
import 'theme-change';

function ThemeChangerTwo() {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkTheme(savedTheme === 'forest'); // Check if the saved theme is 'forest'
            document.documentElement.setAttribute('data-theme', savedTheme); // Apply the theme
        }
    }, []);

    const handleThemeChange = (event) => {
        const theme = event.target.checked ? 'forest' : 'cupcake';
        setDarkTheme(event.target.checked); // Update the state
        document.documentElement.setAttribute('data-theme', theme); // Apply the theme
        localStorage.setItem('theme', theme); // Save the theme preference
    };

    return (
        <label className="flex gap-2 cursor-pointer">
            {/* Sun icon for Cupcake theme */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                // className={!darkTheme ? 'block' : 'hidden'} // Show/hide based on theme
            >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            {/* Checkbox for toggling the theme */}
            <input
                type="checkbox"
                className="toggle theme-controller"
                checked={darkTheme}
                onChange={handleThemeChange}
            />

            {/* Moon icon for Forest theme */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                // className={darkTheme ? 'block' : 'hidden'} // Show/hide based on theme
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        </label>
    );
}

export default ThemeChangerTwo;
