import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

const AddCar = () => {
    const navigate = useNavigate();
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
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Ajouter une nouvelle voiture
                </h1>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-neutral-800 p-8 rounded-xl shadow-2xl border border-neutral-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-blue-400">Informations Générales</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nom du modèle</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Catégorie</label>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Prix</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="price"
                                        required
                                        placeholder="ex: 500€"
                                        className="w-2/3 bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                    <select
                                        name="priceUnit"
                                        className="w-1/3 bg-neutral-700 border border-neutral-600 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                        value={formData.priceUnit}
                                        onChange={handleChange}
                                    >
                                        <option value="/jour">/jour</option>
                                        <option value="/mois">/mois</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">URL de l'image</label>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    placeholder="/assets/..."
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-purple-400">Caractéristiques</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Puissance</label>
                                <input
                                    type="text"
                                    name="power"
                                    placeholder="ex: 500 ch"
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.power}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Accélération (0-100)</label>
                                <input
                                    type="text"
                                    name="acceleration"
                                    placeholder="ex: 3.5s"
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.acceleration}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Transmission</label>
                                <select
                                    name="transmission"
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
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
                            <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Équipements (séparés par des virgules)</label>
                            <input
                                type="text"
                                name="features"
                                placeholder="GPS, Cuir, Toit ouvrant..."
                                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                                value={formData.features}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Ajouter la voiture
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
