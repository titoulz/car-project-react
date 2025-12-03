import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

const AddCar = () => {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    useEffect(() => {
        const user = storageService.getCurrentUser();
        if (!user || user.role !== 'admin') {
            alert("Accès refusé. Réservé aux administrateurs.");
            navigate('/');
            return;
        }
        setCars(storageService.getCars());
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        priceUnit: '/jour',
        image: '',
        description: '',
        power: '',
        acceleration: '',
        transmission: 'Automatique',
        seats: '',
        fuel: 'Essence',
        features: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        storageService.addCar(formData);
        alert('Voiture ajoutée avec succès !');
        setCars(storageService.getCars()); // Refresh list
        // Reset form
        setFormData({
            name: '',
            category: '',
            price: '',
            priceUnit: '/jour',
            image: '',
            description: '',
            power: '',
            acceleration: '',
            transmission: 'Automatique',
            seats: '',
            fuel: 'Essence',
            features: ''
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            storageService.deleteCar(id);
            setCars(storageService.getCars());
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-turismo-navy to-turismo-gold bg-clip-text text-transparent animate-fade-in-up">
                    Gestion des Véhicules
                </h1>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-fade-in-up mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-turismo-gold">Informations Générales</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom du modèle</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prix</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="price"
                                        required
                                        placeholder="ex: 500€"
                                        className="w-2/3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="priceUnit"
                                        className="w-1/3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                        value={formData.priceUnit}
                                        onChange={handleChange}
                                    >
                                        <option value="/jour">/jour</option>
                                        <option value="/mois">/mois</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de l'image</label>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    placeholder="/assets/..."
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-turismo-gold">Caractéristiques</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Puissance</label>
                                <input
                                    type="text"
                                    name="power"
                                    placeholder="ex: 500 ch"
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.power}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accélération (0-100)</label>
                                <input
                                    type="text"
                                    name="acceleration"
                                    placeholder="ex: 3.5s"
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.acceleration}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transmission</label>
                                <select
                                    name="transmission"
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                >
                                    <option value="Automatique">Automatique</option>
                                    <option value="Manuelle">Manuelle</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Équipements (séparés par des virgules)</label>
                            <input
                                type="text"
                                name="features"
                                placeholder="GPS, Cuir, Toit ouvrant..."
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                value={formData.features}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-turismo-navy to-turismo-gold hover:from-turismo-navy/90 hover:to-turismo-gold/90 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                        Ajouter la voiture
                    </button>
                </form>

                {/* Car List Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center text-turismo-navy dark:text-white">Gestion du Catalogue</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Image</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Modèle</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Catégorie</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Prix</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <img src={car.image} alt={car.name} className="w-16 h-10 object-contain" />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {car.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {car.category}
                                            </td>
                                            <td className="px-6 py-4 text-turismo-navy dark:text-turismo-gold font-bold">
                                                {car.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="text-red-500 hover:text-red-700 font-medium hover:underline transition-colors"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCar;
