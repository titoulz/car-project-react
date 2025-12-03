import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        try {
            storageService.loginUser(formData.email, formData.password);
            // Dispatch event to update navbar
            window.dispatchEvent(new Event('user-login'));
            // Redirect to home or previous page
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-center text-turismo-navy dark:text-white mb-8">Connexion</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent outline-none transition"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-turismo-navy dark:focus:ring-turismo-gold focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-lg bg-turismo-navy text-white font-bold hover:bg-turismo-navy/90 transition shadow-lg dark:bg-white dark:text-turismo-navy dark:hover:bg-gray-100">
                        Se connecter
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="text-turismo-navy dark:text-turismo-gold font-semibold hover:underline">
                        S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    );
}
