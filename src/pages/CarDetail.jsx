import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function CarDetail() {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchedCar = storageService.getCarById(id);
        setCar(fetchedCar);
    }, [id]);

    const handleReservation = () => {
        if (window.confirm(`Voulez-vous réserver la ${car.name} ?`)) {
            storageService.addReservation({
                carId: car.id,
                carName: car.name,
                price: car.price
            });
            alert('Réservation effectuée avec succès !');
        }
    };

    if (!car) {
        return <div className="min-h-screen pt-32 text-center text-2xl dark:text-white">Voiture non trouvée</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <Link to="/cars" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-8 hover:underline">
                    ← Retour au catalogue
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center">
                            <img src={car.image} alt={car.name} className="w-full max-w-lg object-contain" />
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-2">
                                        {car.category}
                                    </span>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{car.price}</div>
                                    <div className="text-gray-500 dark:text-gray-400">{car.priceUnit}</div>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                                {car.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Puissance</div>
                                    <div className="font-semibold dark:text-white">{car.specs.power}</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">0-100 km/h</div>
                                    <div className="font-semibold dark:text-white">{car.specs.acceleration}</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Transmission</div>
                                    <div className="font-semibold dark:text-white">{car.specs.transmission}</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Carburant</div>
                                    <div className="font-semibold dark:text-white">{car.specs.fuel}</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Équipements</h3>
                            <ul className="grid grid-cols-2 gap-2 mb-8">
                                {car.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        • {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={handleReservation}
                                className="w-full py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                            >
                                Réserver ce véhicule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
