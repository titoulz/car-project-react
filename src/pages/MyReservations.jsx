import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function MyReservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const storedReservations = storageService.getReservations();
        // Sort by most recent
        setReservations(storedReservations.reverse());
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Mes Réservations</h1>

                {reservations.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🚗</div>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Aucune réservation pour le moment</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">Envie de conduire une voiture d'exception ?</p>
                        <Link to="/cars" className="px-8 py-3 rounded-full bg-turismo-navy text-white font-bold hover:bg-turismo-navy/90 transition shadow-lg dark:bg-white dark:text-turismo-navy">
                            Découvrir le catalogue
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {reservations.map((reservation) => (
                            <div key={reservation.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900/30 dark:text-green-400">
                                            Confirmée
                                        </span>
                                        <span className="text-sm text-gray-400">
                                            Réservé le {new Date(reservation.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{reservation.carName}</h3>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        <p className="font-medium mb-1">Dates réservées :</p>
                                        <div className="flex flex-wrap gap-2">
                                            {reservation.dates && reservation.dates.length > 0 ? (
                                                reservation.dates.map((date, idx) => (
                                                    <span key={idx} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                                                        {date}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-sm italic">Dates non spécifiées (ancienne version)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right min-w-[150px]">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Prix estimé</div>
                                    <div className="text-2xl font-bold text-turismo-navy dark:text-turismo-gold">
                                        {reservation.price}
                                    </div>
                                    <button className="mt-4 text-sm text-red-500 hover:text-red-600 font-medium underline decoration-transparent hover:decoration-red-500 transition-all">
                                        Annuler la réservation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
