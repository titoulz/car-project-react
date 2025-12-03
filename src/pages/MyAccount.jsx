import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

const MyAccount = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [licenseFile, setLicenseFile] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const currentUser = storageService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);
        setFormData({
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            email: currentUser.email || ''
        });
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setMessage({ type: 'error', text: 'Veuillez sélectionner un fichier PDF.' });
                return;
            }
            setLicenseFile(file);
            setMessage({ type: '', text: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            ...formData,
            // Simulate file upload by storing the file name
            licenseDocument: licenseFile ? {
                name: licenseFile.name,
                uploadDate: new Date().toISOString(),
                status: 'pending' // pending verification
            } : user.licenseDocument
        };

        try {
            storageService.updateUser(updatedUser);
            setUser(updatedUser);
            setMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });

            // Trigger a custom event to update Navbar immediately
            window.dispatchEvent(new Event('user-login'));
        } catch (error) {
            setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-turismo-navy to-turismo-gold bg-clip-text text-transparent animate-fade-in-up">
                    Mon Compte
                </h1>

                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-fade-in-up">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
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
                                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
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
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-turismo-navy dark:focus:border-turismo-gold transition-colors text-gray-900 dark:text-white"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                            <h3 className="text-xl font-semibold text-turismo-navy dark:text-white mb-4">Documents</h3>

                            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permis de conduire (PDF)</label>

                                {user.licenseDocument ? (
                                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.licenseDocument.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Déposé le {new Date(user.licenseDocument.uploadDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-bold rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                            Vérification en cours
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">Aucun document déposé.</p>
                                )}

                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-turismo-navy file:text-white
                                            hover:file:bg-turismo-navy/90
                                            dark:file:bg-white dark:file:text-turismo-navy
                                        "
                                    />
                                </div>
                                {licenseFile && (
                                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                        Fichier sélectionné : {licenseFile.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-turismo-navy text-white font-bold py-3 px-6 rounded-lg hover:bg-turismo-navy/90 transition-all shadow-lg dark:bg-white dark:text-turismo-navy"
                        >
                            Enregistrer les modifications
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
