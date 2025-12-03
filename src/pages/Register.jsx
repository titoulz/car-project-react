import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            storageService.registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-turismo-navy dark:text-white mb-2">Créer un compte</h1>
                            <p className="text-gray-500 dark:text-gray-400">Rejoignez le club 3T</p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-turismo-navy text-white font-bold hover:bg-turismo-navy/90 transition shadow-lg dark:bg-white dark:text-turismo-navy dark:hover:bg-gray-100"
                            >
                                S'inscrire
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            Déjà un compte ?{' '}
                            <Link to="/login" className="text-turismo-navy dark:text-turismo-gold font-semibold hover:underline">
                                Se connecter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
