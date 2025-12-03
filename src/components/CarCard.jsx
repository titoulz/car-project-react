import { useState } from 'react'; // Importe useState pour gérer l'état de l'animation
import { Link, useNavigate } from 'react-router-dom'; // Importe Link et useNavigate pour la navigation

export default function CarCard({ car }) { // Définit le composant CarCard qui prend un objet 'car' en prop
    const navigate = useNavigate(); // Hook pour la navigation programmatique
    const [isAnimating, setIsAnimating] = useState(false); // État pour gérer l'affichage de l'animation

    const handleReservation = (e) => {
        e.preventDefault(); // Empêche la navigation immédiate
        setIsAnimating(true); // Déclenche l'animation

        // Attend 2.5 secondes (un peu avant la fin de l'animation de 3s pour la fluidité) avant de changer de page
        setTimeout(() => {
            navigate(`/cars/${car.id}`);
        }, 2500);
    };

    return ( // Retourne le JSX de la carte
        <>
            {/* Overlay d'animation de transition */}
            {isAnimating && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-turismo-navy dark:bg-gray-900 transition-all duration-300">
                    <div className="text-9xl font-bold text-white animate-logo-explosion flex items-center gap-4">
                        <span className="text-turismo-gold">✦</span> 3T
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-700 flex flex-col relative z-0"> {/* Conteneur principal de la carte avec styles */}
                <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-700"> {/* Conteneur de l'image avec hauteur fixe */}
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /> {/* Image de la voiture avec effet de zoom au survol */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-turismo-navy dark:text-turismo-gold uppercase tracking-wider shadow-sm"> {/* Badge de catégorie en haut à droite */}
                        {car.category} {/* Affiche la catégorie de la voiture */}
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow"> {/* Contenu textuel de la carte */}
                    <div className="flex justify-between items-start mb-4"> {/* En-tête avec nom et prix */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-turismo-navy dark:group-hover:text-turismo-gold transition"> {/* Titre de la voiture */}
                            {car.name} {/* Affiche le nom de la voiture */}
                        </h3>
                        <div className="text-right flex flex-col items-end"> {/* Bloc prix aligné à droite */}
                            <div className="text-lg font-bold text-turismo-navy dark:text-turismo-gold">{car.price}</div> {/* Affiche le prix */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{car.priceUnit}</div> {/* Affiche l'unité du prix */}
                            <span className="inline-block bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap"> {/* Badge économie compact */}
                                -250€ avec 3T
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6 mt-auto"> {/* Caractéristiques techniques */}
                        <div className="flex items-center gap-1"> {/* Puissance */}
                            <span className="text-turismo-gold">⚡</span> {car.specs.power} {/* Icône et valeur de puissance */}
                        </div>
                        <div className="flex items-center gap-1"> {/* Accélération */}
                            <span className="text-turismo-gold">⏱️</span> {car.specs.acceleration} {/* Icône et valeur d'accélération */}
                        </div>
                    </div>
                    <button
                        onClick={handleReservation}
                        className="block w-full py-3 rounded-lg font-bold text-white shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-turismo-navy via-turismo-gold to-turismo-navy hover:animate-gradient-xy bg-[length:200%_200%]"
                    > {/* Bouton de réservation animé */}
                        Réserver {/* Texte du bouton */}
                    </button>
                </div>
            </div>
        </>
    );
}
