import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import CarCard from '../components/CarCard';

export default function Home() {
    const cars = storageService.getCars();
    const featuredCars = cars.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <header className="bg-blue-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Bienvenue chez 3T
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-blue-100">
                        La location de voitures simple et efficace.
                    </p>
                    <Link to="/cars" className="inline-block px-8 py-4 rounded-lg bg-white text-blue-900 font-bold hover:bg-gray-100 transition shadow-lg">
                        Voir notre catalogue
                    </Link>
                </div>
            </header>

            {/* Featured Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">Nos derniers modèles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map(car => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/cars" className="text-blue-600 hover:underline font-semibold dark:text-blue-400">
                            Voir toutes les voitures →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
