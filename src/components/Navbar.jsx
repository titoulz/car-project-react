import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function Navbar() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Check for user login status on mount and when localStorage changes
    useEffect(() => {
        const checkUser = () => {
            const currentUser = storageService.getCurrentUser();
            setUser(currentUser);
        };

        checkUser();

        // Listen for storage events (in case login happens in another tab)
        window.addEventListener('storage', checkUser);
        // Custom event for same-tab updates
        window.addEventListener('user-login', checkUser);

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('user-login', checkUser);
        };
    }, []);

    const handleLogout = () => {
        storageService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass-effect shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wider text-turismo-navy dark:text-white flex items-center gap-2">
                    <span className="text-3xl text-turismo-navy dark:text-turismo-gold">✦</span> 3T
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-turismo-navy font-medium hover:text-turismo-gold transition dark:text-white dark:hover:text-turismo-gold">Accueil</Link>
                    <Link to="/cars" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Catalogue</Link>

                    {user && user.role === 'admin' && (
                        <>
                            <Link to="/add-car" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Gérer les véhicules</Link>
                            <Link to="/manage-users" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Utilisateurs</Link>
                            <Link to="/admin/reservations" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Réservations</Link>
                        </>
                    )}

                    {user && (user.role === 'client' || user.role === 'admin') && (
                        <Link to="/my-reservations" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Mes Réservations</Link>
                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/my-account" className="flex items-center gap-2 hover:opacity-80 transition">
                                <div className="w-8 h-8 rounded-full bg-turismo-navy text-white dark:bg-turismo-gold dark:text-gray-900 flex items-center justify-center font-bold text-sm">
                                    {user.firstName.charAt(0)}
                                </div>
                                <span className="text-sm font-semibold text-turismo-navy dark:text-turismo-gold">
                                    {user.firstName} ({user.role})
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="px-6 py-2 rounded-full border border-turismo-navy text-turismo-navy hover:bg-turismo-navy hover:text-white transition duration-300 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-turismo-navy">
                            Connexion
                        </Link>
                    )}

                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-turismo-navy dark:text-white cursor-pointer">
                        {darkMode ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
