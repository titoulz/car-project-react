export default function Footer() { // Définit le composant Footer
    return ( // Retourne le JSX du pied de page
        <footer className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300"> {/* Élément footer avec styles */}
            <div className="container mx-auto px-6 text-center"> {/* Conteneur centré */}
                <div className="text-2xl font-bold text-turismo-navy dark:text-white mb-4 flex items-center justify-center gap-2"> {/* Logo et nom */}
                    <span className="text-turismo-navy dark:text-turismo-gold">✦</span> 3T {/* Icône et texte du logo */}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-8">L'excellence automobile à votre service.</p> {/* Slogan */}
                <div className="text-sm text-gray-500 dark:text-gray-500"> {/* Copyright */}
                    &copy; 2024 3T. Tous droits réservés. {/* Texte de copyright */}
                </div>
            </div>
        </footer>
    );
}
