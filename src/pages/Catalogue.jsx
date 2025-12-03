import { carsData } from '../data/cars'; // Importe les données des voitures
import CarCard from '../components/CarCard'; // Importe le composant carte voiture

export default function Catalogue() { // Définit le composant page Catalogue
    return ( // Retourne le JSX de la page
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"> {/* Conteneur principal */}
            <div className="container mx-auto px-6"> {/* Conteneur centré */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Notre Catalogue</h1> {/* Titre de la page */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grille responsive pour les cartes */}
                    {carsData.map(car => ( // Boucle sur chaque voiture pour créer une carte
                        <CarCard key={car.id} car={car} /> // Affiche le composant CarCard
                    ))}
                </div>
            </div>
        </div>
    );
}
