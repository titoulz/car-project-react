import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function CarDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchedCar = storageService.getCarById(id);
        setCar(fetchedCar);
    }, [id]);

    const [selectedDates, setSelectedDates] = useState([]);

    // Données fictives pour le calendrier (ajouté pour la démo)
    const currentMonth = "Décembre 2025";
    const daysInMonth = 31;
    const reservedDays = [5, 6, 12, 13, 14, 20, 21, 25, 26];

    const toggleDate = (day) => {
        if (reservedDays.includes(day)) return;

        setSelectedDates(prev => {
            if (prev.includes(day)) {
                return prev.filter(d => d !== day);
            } else {
                return [...prev, day].sort((a, b) => a - b);
            }
        });
    };

    const handleReservation = () => {
        if (!car) return;
        if (selectedDates.length === 0) {
            alert('Veuillez sélectionner au moins une date.');
            return;
        }

        const reservation = {
            carId: car.id,
            carName: car.name,
            price: car.price,
            dates: selectedDates.map(d => `${d} Décembre 2025`)
        };

        storageService.addReservation(reservation);
        alert(`Félicitations ! Vous avez réservé la ${car.name} pour les dates : ${selectedDates.join(', ')} Décembre.`);
        navigate('/');
    };

    if (!car) {
        return <div className="min-h-screen pt-32 text-center text-2xl dark:text-white">Voiture non trouvée</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 animate-zoom-in-up">
            <div className="container mx-auto px-6">
                <Link to="/cars" className="inline-flex items-center gap-2 text-turismo-navy dark:text-turismo-gold mb-8 hover:underline">
                    ← Retour au catalogue
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="bg-gray-100 dark:bg-gray-700 p-8 flex items-start justify-center">
                            <div className="sticky top-32 w-full flex justify-center">
                                <img src={car.image} alt={car.name} className="w-full max-w-xl object-contain drop-shadow-2xl" />
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-turismo-navy/10 text-turismo-navy dark:bg-turismo-gold/20 dark:text-turismo-gold text-sm font-semibold mb-2">
                                        {car.category}
                                    </span>
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{car.name}</h1>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="text-3xl font-bold text-turismo-navy dark:text-turismo-gold">{car.price}</div>
                                    <div className="text-gray-500 dark:text-gray-400 mb-2">{car.priceUnit}</div>
                                    <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1.5 rounded-lg font-bold dark:bg-green-900/30 dark:text-green-400 shadow-sm">
                                        250€ économisés grâce à 3T
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                                {car.description}
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Puissance</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.power}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">0-100 km/h</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.acceleration}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transmission</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.transmission}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Carburant</div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{car.specs.fuel}</div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Équipements</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {car.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 text-turismo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Section Calendrier de disponibilité */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Disponibilités</h3>
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                    <div className="text-center font-semibold mb-4 text-turismo-navy dark:text-white">{currentMonth}</div>

                                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                                            <div key={day} className="text-gray-400 font-medium">{day}</div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                            const isReserved = reservedDays.includes(day);
                                            const isSelected = selectedDates.includes(day);

                                            return (
                                                <div
                                                    key={day}
                                                    onClick={() => toggleDate(day)}
                                                    className={`
                                                        py-2 rounded-lg transition-colors duration-200
                                                        ${isReserved
                                                            ? 'bg-red-50 text-red-400 dark:bg-red-900/20 dark:text-red-400 cursor-not-allowed'
                                                            : isSelected
                                                                ? 'bg-turismo-gold text-white shadow-md transform scale-105 cursor-pointer'
                                                                : 'hover:bg-turismo-navy hover:text-white dark:hover:bg-turismo-gold dark:hover:text-gray-900 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 cursor-pointer'
                                                        }
                                                    `}
                                                >
                                                    {day}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex gap-6 mt-6 text-sm justify-center border-t border-gray-100 dark:border-gray-700 pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                            <span className="text-gray-600 dark:text-gray-400">Disponible</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-turismo-gold"></div>
                                            <span className="text-gray-600 dark:text-gray-400">Sélectionné</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900/20"></div>
                                            <span className="text-gray-600 dark:text-gray-400">Réservé</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleReservation}
                                disabled={selectedDates.length === 0}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-lg 
                                    ${selectedDates.length > 0
                                        ? 'bg-turismo-navy text-white hover:bg-turismo-navy/90 shadow-turismo-navy/30 dark:bg-white dark:text-turismo-navy dark:hover:bg-gray-100'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                    }`}
                            >
                                {selectedDates.length > 0 ? 'Réserver ces dates' : 'Sélectionnez des dates'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
