import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

export default function ManageUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = storageService.getCurrentUser();
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        setCurrentUser(user);
        setUsers(storageService.getUsers());
    }, [navigate]);

    const handleRoleChange = (userId, newRole) => {
        const userToUpdate = users.find(u => u.id === userId);
        if (userToUpdate) {
            const updatedUser = { ...userToUpdate, role: newRole };
            storageService.updateUser(updatedUser);
            setUsers(users.map(u => u.id === userId ? updatedUser : u));
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Gestion des Utilisateurs</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Utilisateur</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Rôle</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-turismo-navy text-white flex items-center justify-center font-bold">
                                                    {user.firstName[0]}{user.lastName[0]}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold 
                                                ${user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                disabled={user.id === currentUser?.id} // Prevent changing own role to lose access
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-turismo-navy focus:border-turismo-navy block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="client">Client</option>
                                                <option value="admin">Admin</option>
                                                <option value="viewer">Viewer</option>
                                            </select>
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
}
