import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { storageService } from '../services/storageService';
import Navbar from '../components/Navbar';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const AdminMap = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const user = storageService.getCurrentUser();
        if (!user || user.role !== 'admin') {
            alert("Accès refusé. Réservé aux administrateurs.");
            navigate('/');
            return;
        }

        const allCars = storageService.getCars();
        // Filter cars that have coordinates
        const locatedCars = allCars.filter(c => c.latitude && c.longitude);
        setCars(locatedCars);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-24 h-screen flex flex-col">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-turismo-navy to-turismo-gold bg-clip-text text-transparent animate-fade-in-up">
                    Localisation des Véhicules
                </h1>

                <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up relative z-0">
                    <MapContainer center={[46.603354, 1.888334]} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {cars.map(car => {
                            const customIcon = L.divIcon({
                                className: 'custom-car-marker',
                                html: `
                                    <div class="relative group">
                                        <div class="w-16 h-16 bg-white rounded-full border-4 border-turismo-navy shadow-lg overflow-hidden transform transition-transform hover:scale-110">
                                            <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap border border-gray-200 text-gray-900">
                                            ${car.name}
                                        </div>
                                    </div>
                                `,
                                iconSize: [64, 64],
                                iconAnchor: [32, 32]
                            });

                            return (
                                <Marker
                                    key={car.id}
                                    position={[parseFloat(car.latitude), parseFloat(car.longitude)]}
                                    icon={customIcon}
                                >
                                    <Popup>
                                        <div className="text-center">
                                            <h3 className="font-bold text-lg">{car.name}</h3>
                                            <p className="text-turismo-navy font-semibold">{car.price}</p>
                                            <p className="text-sm text-gray-500">{car.category}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>

                {cars.length === 0 && (
                    <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                        Aucun véhicule géolocalisé pour le moment. Ajoutez des coordonnées dans "Gérer les véhicules".
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminMap;
