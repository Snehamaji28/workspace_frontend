import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, NavLink, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Sidebar = ({ isExpanded, setIsExpanded }) => {
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLogout = () => {
        Cookies.remove("token"); // Clear the cookie
        navigate('/login'); // Navigate to the login page
    };

    const navItems = [
        {
            label: 'Dashboard',
            slug: '/',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            label: 'Profile',
            slug: "/profile",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            label: 'Help',
            slug: '/help',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        };

        const debounceResize = () => {
            clearTimeout(debounceResize.timeout);
            debounceResize.timeout = setTimeout(handleResize, 200);
        };

        handleResize();

        window.addEventListener('resize', debounceResize);

        return () => {
            window.removeEventListener('resize', debounceResize);
        };
    }, [setIsExpanded]);

    return (
        <aside className={`
            overflow-hidden fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-50
            ${isExpanded ? 'w-64' : 'w-0'}
        `}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`transition-all duration-300 z-50 fixed top-4 ${isExpanded ? "left-52" : "left-5"} p-2 rounded-lg bg-gray-800`}
            >
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="flex flex-col h-full">
                <div className={`h-16 flex items-center justify-between px-4 border-b border-gray-800`}>
                    <h1 className={`font-bold text-xl text-white transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        Rezime
                    </h1>
                </div>

                <nav className="flex-1 py-4">
                    {navItems.map((item, index) => (
                        <NavLink to={item.slug}
                            key={index}
                            className={({ isActive }) => `
                                w-full flex items-center px-4 py-3 text-gray-400
                                hover:bg-gray-700 hover:text-gray-200 transition-colors
                                ${isActive ? 'bg-gray-700 text-gray-200' : ''}
                            `}
                        >
                            {item.icon}
                            <span className={`
                                ml-4 transition-opacity duration-300
                                ${isExpanded ? 'opacity-100' : 'opacity-0'}
                            `}>
                                {item.label}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-gray-800 p-4">
                    <button onClick={handleLogout} className="flex items-center text-red-500 hover:bg-red-800 hover:text-red-300 rounded-lg p-2 w-full transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className={`ml-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
