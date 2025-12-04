import { carsData } from '../data/cars';

const STORAGE_KEYS = {
    CARS: 'car_project_cars',
    RESERVATIONS: 'car_project_reservations'
};

export const storageService = {
    // Initialise les données si elles n'existent pas
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
            localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(carsData));
        }
        if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
            localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify([]));
        }
    },

    // Récupère toutes les voitures
    getCars() {
        this.init();
        const cars = localStorage.getItem(STORAGE_KEYS.CARS);
        return JSON.parse(cars);
    },

    // Récupère une voiture par son ID
    getCarById(id) {
        const cars = this.getCars();
        return cars.find(car => car.id === parseInt(id));
    },

    // Ajoute une nouvelle voiture
    addCar(car) {
        const cars = this.getCars();
        const newCar = {
            ...car,
            id: Date.now(),
            // On s'assure que specs existe même si vide
            specs: {
                power: car.power || "N/A",
                acceleration: car.acceleration || "N/A",
                transmission: car.transmission || "Automatique",
                seats: car.seats || "2 places",
                fuel: car.fuel || "Essence"
            },
            // On transforme la chaine de caractères en tableau
            features: typeof car.features === 'string' ? car.features.split(',').map(f => f.trim()) : []
        };

        cars.push(newCar);
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
        return newCar;
    },

    // Supprime une voiture
    deleteCar(id) {
        const cars = this.getCars();
        const updatedCars = cars.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(updatedCars));
        return updatedCars;
    },

    // Met à jour une voiture
    updateCar(updatedCar) {
        const cars = this.getCars();
        const index = cars.findIndex(c => c.id === updatedCar.id);
        if (index !== -1) {
            cars[index] = { ...cars[index], ...updatedCar };
            localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
        }
    },

    // Ajoute une réservation simple
    addReservation(reservation) {
        this.init();
        const reservations = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS));
        const newReservation = {
            ...reservation,
            id: Date.now(),
            date: new Date().toLocaleDateString()
        };
        reservations.push(newReservation);
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    }
};
