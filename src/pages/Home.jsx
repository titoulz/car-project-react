import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import CarCard from '../components/CarCard';

export default function Home() {
    const cars = storageService.getCars();
    const featuredCars = cars.slice(0, 3);

    return ( // Retourne le JSX de la page d'accueil
        <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"> {/* Conteneur principal */}
            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"> {/* En-tête avec vidéo de fond */}
                <div className="absolute inset-0 z-0"> {/* Conteneur vidéo absolu */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40 z-10"></div> {/* Overlay dégradé sombre */}
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover"> {/* Vidéo en arrière-plan */}
                        <source src="/assets/Video_de_fond_pour_site_web.mp4" type="video/mp4" /> {/* Source vidéo */}
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-20"> {/* Contenu au-dessus de la vidéo */}
                    <div className="max-w-3xl animate-fade-in-up"> {/* Bloc texte animé */}
                        <span className="inline-block py-1 px-3 rounded-full bg-turismo-gold/20 text-turismo-gold text-sm font-semibold mb-6 border border-turismo-gold/30 backdrop-blur-sm"> {/* Badge */}
                            L'Excellence Automobile {/* Texte badge */}
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight"> {/* Titre principal */}
                            Conduisez <span className="text-transparent bg-clip-text bg-gradient-to-r from-turismo-gold to-yellow-200">l'Exceptionnel</span> {/* Texte mis en valeur */}
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl"> {/* Sous-titre */}
                            Une collection exclusive de véhicules de prestige pour des moments inoubliables.
                            Performance, élégance et sensations garanties.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4"> {/* Boutons d'action */}
                            <Link to="/cars" className="px-8 py-4 rounded-full bg-turismo-gold text-gray-900 font-bold hover:bg-white transition duration-300 shadow-lg hover:shadow-turismo-gold/50 text-center"> {/* Bouton découvrir */}
                                Découvrir la flotte {/* Texte bouton */}
                            </Link>
                            <Link to="/contact" className="px-8 py-4 rounded-full border border-white text-white font-bold hover:bg-white hover:text-gray-900 transition duration-300 backdrop-blur-sm text-center"> {/* Bouton contact */}
                                Nous contacter {/* Texte bouton */}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Section */}
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"> {/* Section véhicules en vedette */}
                <div className="container mx-auto px-6"> {/* Conteneur centré */}
                    <div className="flex justify-between items-end mb-12"> {/* En-tête section */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Véhicules en Vedette</h2> {/* Titre section */}
                            <div className="h-1 w-20 bg-turismo-gold rounded"></div> {/* Soulignement décoratif */}
                        </div>
                        <Link to="/cars" className="hidden md:flex items-center gap-2 text-turismo-navy dark:text-turismo-gold font-semibold hover:gap-3 transition-all"> {/* Lien voir tout desktop */}
                            Voir tout le catalogue <span>→</span> {/* Texte lien */}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grille des cartes */}
                        {featuredCars.map(car => ( // Boucle sur les voitures vedettes
                            <CarCard key={car.id} car={car} /> // Affiche la carte
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden"> {/* Lien voir tout mobile */}
                        <Link to="/cars" className="inline-block px-6 py-3 rounded-full border border-turismo-navy text-turismo-navy dark:border-white dark:text-white font-semibold"> {/* Bouton mobile */}
                            Voir tout le catalogue {/* Texte bouton */}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
