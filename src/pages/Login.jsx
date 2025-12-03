export default function Login() { // Définit le composant page Login
    return ( // Retourne le JSX de la page de connexion
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300"> {/* Conteneur centré plein écran */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700"> {/* Carte de formulaire */}
                <h2 className="text-3xl font-bold text-center text-turismo-navy dark:text-white mb-8">Connexion</h2> {/* Titre du formulaire */}
                <form className="space-y-6"> {/* Formulaire avec espacement vertical */}
                    <div> {/* Champ Email */}
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label> {/* Label Email */}
                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-turismo-navy focus:border-transparent outline-none transition" placeholder="votre@email.com" /> {/* Input Email */}
                    </div>
                    <div> {/* Champ Mot de passe */}
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label> {/* Label Mot de passe */}
                        <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-turismo-navy focus:border-transparent outline-none transition" placeholder="••••••••" /> {/* Input Mot de passe */}
                    </div>
                    <button type="submit" className="w-full py-3 rounded-lg bg-turismo-navy text-white font-bold hover:bg-turismo-navy/90 transition shadow-lg"> {/* Bouton soumettre */}
                        Se connecter {/* Texte bouton */}
                    </button>
                </form>
            </div>
        </div>
    );
}
