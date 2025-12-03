import { useState, useEffect } from 'react'; // Importe les hooks React pour l'état et les effets
import { Link } from 'react-router-dom'; // Importe Link pour la navigation

export default function Navbar() { // Définit le composant Navbar
    const [darkMode, setDarkMode] = useState(() => { // Initialise l'état darkMode avec une fonction
        if (typeof window !== 'undefined') { // Vérifie si on est dans un environnement navigateur
            return localStorage.getItem('theme') === 'dark' || // Vérifie si le thème est stocké comme 'dark'
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches); // Ou si la préférence système est sombre
        }
        return false; // Par défaut, mode clair
    });

    useEffect(() => { // Effet pour appliquer le thème quand darkMode change
        if (darkMode) { // Si le mode sombre est actif
            document.documentElement.classList.add('dark'); // Ajoute la classe 'dark' à la racine HTML
            localStorage.setItem('theme', 'dark'); // Sauvegarde la préférence dans localStorage
        } else { // Sinon
            document.documentElement.classList.remove('dark'); // Retire la classe 'dark'
            localStorage.setItem('theme', 'light'); // Sauvegarde 'light' dans localStorage
        }
    }, [darkMode]); // Dépendance: s'exécute quand darkMode change

    return ( // Retourne le JSX de la barre de navigation
        <nav className="fixed w-full z-50 transition-all duration-300 glass-effect shadow-sm"> {/* Barre de navigation fixe en haut */}
            <div className="container mx-auto px-6 py-4 flex justify-between items-center"> {/* Conteneur flex pour espacer les éléments */}
                <Link to="/" className="text-2xl font-bold tracking-wider text-turismo-navy dark:text-white flex items-center gap-2"> {/* Logo lien vers l'accueil */}
                    <span className="text-3xl text-turismo-navy dark:text-turismo-gold">✦</span> 3T {/* Icône et texte du logo */}
                </Link>
                <div className="hidden md:flex items-center space-x-8"> {/* Menu de navigation (caché sur mobile) */}
                    <Link to="/" className="text-turismo-navy font-medium hover:text-turismo-gold transition dark:text-white dark:hover:text-turismo-gold">Accueil</Link> {/* Lien Accueil */}
                    <Link to="/cars" className="text-gray-600 hover:text-turismo-gold transition dark:text-gray-300 dark:hover:text-turismo-gold">Catalogue</Link> {/* Lien Catalogue */}
                    <Link to="/login" className="px-6 py-2 rounded-full border border-turismo-navy text-turismo-navy hover:bg-turismo-navy hover:text-white transition duration-300 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-turismo-navy">Connexion</Link> {/* Bouton Connexion */}
                    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-turismo-navy dark:text-white cursor-pointer"> {/* Bouton toggle mode sombre */}
                        {darkMode ? ( // Si mode sombre
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Icône soleil */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        ) : ( // Sinon mode clair
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Icône lune */}
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
