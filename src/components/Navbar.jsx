import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-900 dark:text-white flex items-center gap-2">
                    3T Location
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Accueil</Link>
                    <Link to="/cars" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Catalogue</Link>
                    <Link to="/add-car" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Ajouter</Link>

                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-white">
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </nav>
    );
}
