import { useEffect } from 'react'; // Importe useEffect pour les effets de bord (scroll)
import { useParams, Link } from 'react-router-dom'; // Importe useParams pour récupérer l'ID de l'URL et Link pour la navigation
import { carsData } from '../data/cars'; // Importe les données des voitures

export default function CarDetail() { // Définit le composant de page CarDetail
    const { id } = useParams(); // Récupère l'ID de la voiture depuis l'URL
    const car = carsData.find(c => c.id === parseInt(id)); // Trouve la voiture correspondante dans les données

    useEffect(() => { // Effet pour remettre la page en haut lors du chargement
        window.scrollTo(0, 0); // Scrolle tout en haut
    }, []); // Le tableau vide [] signifie que cela ne s'exécute qu'une fois au montage

    // Données fictives pour le calendrier (ajouté pour la démo)
    const currentMonth = "Décembre 2025"; // Mois affiché
    const daysInMonth = 31; // Nombre de jours dans le mois
    const reservedDays = [5, 6, 12, 13, 14, 20, 21, 25, 26]; // Jours simulés comme réservés

    if (!car) { // Si la voiture n'est pas trouvée
        return <div className="min-h-screen pt-32 text-center text-2xl dark:text-white">Voiture non trouvée</div>; // Affiche un message d'erreur
    }

    return ( // Retourne le JSX de la page de détail
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 animate-zoom-in-up"> {/* Conteneur principal avec animation impressionnante */}
            <div className="container mx-auto px-6"> {/* Conteneur centré */}
                <Link to="/cars" className="inline-flex items-center gap-2 text-turismo-navy dark:text-turismo-gold mb-8 hover:underline"> {/* Lien retour au catalogue */}
                    ← Retour au catalogue {/* Texte du lien */}
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"> {/* Carte principale de détail */}
                    <div className="grid grid-cols-1 lg:grid-cols-2"> {/* Grille 2 colonnes sur grand écran */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-8 flex items-start justify-center"> {/* Colonne image alignée en haut */}
                            <div className="sticky top-32 w-full flex justify-center"> {/* Image collante au scroll */}
                                <img src={car.image} alt={car.name} className="w-full max-w-xl object-contain drop-shadow-2xl" /> {/* Image de la voiture */}
                            </div>
                        </div>

                        <div className="p-8 lg:p-12"> {/* Colonne informations */}
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6"> {/* En-tête infos */}
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-turismo-navy/10 text-turismo-navy dark:bg-turismo-gold/20 dark:text-turismo-gold text-sm font-semibold mb-2"> {/* Badge catégorie */}
                                        {car.category} {/* Catégorie */}
                                    </span>
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{car.name}</h1> {/* Nom de la voiture */}
                                </div>
                                <div className="text-right flex flex-col items-end"> {/* Prix et économies */}
                                    <div className="text-3xl font-bold text-turismo-navy dark:text-turismo-gold">{car.price}</div> {/* Prix */}
                                    <div className="text-gray-500 dark:text-gray-400 mb-2">{car.priceUnit}</div> {/* Unité */}
                                    <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1.5 rounded-lg font-bold dark:bg-green-900/30 dark:text-green-400 shadow-sm"> {/* Badge économie agrandi */}
                                        250€ économisés grâce à 3T
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8"> {/* Description */}
                                {car.description} {/* Texte description */}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8"> {/* Grille des spécifications */}
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"> {/* Bloc Puissance */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Puissance</div> {/* Label */}
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.power}</div> {/* Valeur */}
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"> {/* Bloc Accélération */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">0-100 km/h</div> {/* Label */}
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.acceleration}</div> {/* Valeur */}
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"> {/* Bloc Transmission */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transmission</div> {/* Label */}
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.transmission}</div> {/* Valeur */}
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"> {/* Bloc Carburant */}
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Carburant</div> {/* Label */}
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.fuel}</div> {/* Valeur */}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Équipements</h3> {/* Titre équipements */}
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"> {/* Liste équipements */}
                                {car.features.map((feature, index) => ( // Boucle sur les équipements
                                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300"> {/* Élément liste */}
                                        <svg className="w-5 h-5 text-turismo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Icône check */}
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature} {/* Nom de l'équipement */}
                                    </li>
                                ))}
                            </ul>

                            {/* Section Calendrier de disponibilité */}
                            <div className="mb-8"> {/* Conteneur du calendrier avec marge basse */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Disponibilités</h3> {/* Titre de la section */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"> {/* Carte du calendrier */}
                                    <div className="text-center font-semibold mb-4 text-turismo-navy dark:text-white">{currentMonth}</div> {/* Affiche le mois courant */}

                                    {/* Grille des jours de la semaine */}
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => ( // Boucle sur les jours
                                            <div key={day} className="text-gray-400 font-medium">{day}</div> // Affiche l'initiale du jour
                                        ))}
                                    </div>

                                    {/* Grille des dates */}
                                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => { // Génère un tableau de 1 à 31
                                            const isReserved = reservedDays.includes(day); // Vérifie si le jour est réservé
                                            return (
                                                <div
                                                    key={day}
                                                    className={`
                                                        py-2 rounded-lg transition-colors duration-200
                                                        ${isReserved
                                                            ? 'bg-red-50 text-red-400 dark:bg-red-900/20 dark:text-red-400 cursor-not-allowed' // Style si réservé
                                                            : 'hover:bg-turismo-navy hover:text-white dark:hover:bg-turismo-gold dark:hover:text-gray-900 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 cursor-pointer' // Style si disponible
                                                        }
                                                    `}
                                                >
                                                    {day} {/* Affiche le numéro du jour */}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Légende du calendrier */}
                                    <div className="flex gap-6 mt-6 text-sm justify-center border-t border-gray-100 dark:border-gray-700 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div> {/* Point gris */}
                                            <span className="text-gray-600 dark:text-gray-400">Disponible</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900/20"></div> {/* Point rouge */}
                                            <span className="text-gray-600 dark:text-gray-400">Réservé</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-turismo-navy text-white font-bold text-lg hover:bg-turismo-navy/90 transition shadow-lg shadow-turismo-navy/30 dark:bg-white dark:text-turismo-navy dark:hover:bg-gray-100"> {/* Bouton d'action */}
                                Réserver ce véhicule {/* Texte du bouton */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
