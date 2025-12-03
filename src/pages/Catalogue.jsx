import { storageService } from '../services/storageService';
import CarCard from '../components/CarCard';

export default function Catalogue() {
    const cars = storageService.getCars();

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Notre Catalogue</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map(car => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            </div>
        </div>
    );
}
