import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

const AdminReservations = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const user = storageService.getCurrentUser();
        if (!user || user.role !== 'admin') {
            alert("Accès refusé. Réservé aux administrateurs.");
            navigate('/');
            return;
        }

        // Load all reservations
        const allReservations = storageService.getReservations();
        // Sort by most recent
        setReservations(allReservations.reverse());
    }, [navigate]);

    const handleStatusChange = (id, newStatus) => {
        storageService.updateReservationStatus(id, newStatus);
        // Refresh list
        const updatedReservations = storageService.getReservations();
        setReservations(updatedReservations.reverse());
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900/30 dark:text-green-400">Confirmée</span>;
            case 'refused':
                return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold dark:bg-red-900/30 dark:text-red-400">Refusée</span>;
            default:
                return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold dark:bg-yellow-900/30 dark:text-yellow-400">En attente</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-turismo-navy to-turismo-gold bg-clip-text text-transparent animate-fade-in-up">
                    Gestion des Réservations
                </h1>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Véhicule</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Dates réservées</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Prix</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {reservations.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                                Aucune réservation trouvée.
                                            </td>
                                        </tr>
                                    ) : (
                                        reservations.map((reservation) => (
                                            <tr key={reservation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(reservation.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                    {reservation.carName}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {reservation.dates ? reservation.dates.join(', ') : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 text-turismo-navy dark:text-turismo-gold font-bold">
                                                    {reservation.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(reservation.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {(!reservation.status || reservation.status === 'pending') && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-medium"
                                                            >
                                                                Accepter
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(reservation.id, 'refused')}
                                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm font-medium"
                                                            >
                                                                Refuser
                                                            </button>
                                                        </div>
                                                    )}
                                                    {reservation.status === 'confirmed' && (
                                                        <button
                                                            onClick={() => handleStatusChange(reservation.id, 'refused')}
                                                            className="text-red-500 hover:text-red-700 text-sm hover:underline"
                                                        >
                                                            Annuler
                                                        </button>
                                                    )}
                                                    {reservation.status === 'refused' && (
                                                        <span className="text-gray-400 text-sm italic">Refusée</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReservations;
