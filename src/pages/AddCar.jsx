import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

const AddCar = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setCars(storageService.getCars());
    }, [navigate]);

    const initialFormState = {
        name: '',
        category: '',
        price: '',
        priceUnit: '/jour',
        image: '',
        description: '',
        power: '',
        acceleration: '',
        transmission: 'Automatique',
        fuel: 'Essence',
        features: ''
    };

    const [formData, setFormData] = useState(initialFormState);

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
        setCars(storageService.getCars());
        setFormData(initialFormState);
    };

    const handleDelete = (id) => {
        if (window.confirm('Supprimer cette voiture ?')) {
            storageService.deleteCar(id);
            setCars(storageService.getCars());
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-3xl font-bold mb-8 text-center">Ajouter une voiture</h1>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nom du modèle</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Catégorie</label>
                            <input
                                type="text"
                                name="category"
                                required
                                className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Prix</label>
                                <input
                                    type="text"
                                    name="price"
                                    required
                                    placeholder="ex: 500€"
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm font-medium mb-1">Unité</label>
                                <select
                                    name="priceUnit"
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.priceUnit}
                                    onChange={handleChange}
                                >
                                    <option value="/jour">/jour</option>
                                    <option value="/mois">/mois</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">URL de l'image</label>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="/assets/..."
                                className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Puissance</label>
                                <input
                                    type="text"
                                    name="power"
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.power}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Accélération</label>
                                <input
                                    type="text"
                                    name="acceleration"
                                    className="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.acceleration}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors"
                        >
                            Ajouter la voiture
                        </button>
                    </div>
                </form>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">Liste des voitures</h2>
                    <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3">Image</th>
                                    <th className="px-4 py-3">Modèle</th>
                                    <th className="px-4 py-3">Prix</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cars.map((car) => (
                                    <tr key={car.id}>
                                        <td className="px-4 py-3">
                                            <img src={car.image} alt={car.name} className="w-12 h-8 object-contain" />
                                        </td>
                                        <td className="px-4 py-3 font-medium">{car.name}</td>
                                        <td className="px-4 py-3">{car.price}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => handleDelete(car.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
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
    );
};

export default AddCar;
