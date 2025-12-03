import { carsData } from '../data/cars';

const STORAGE_KEYS = {
    CARS: 'car_project_cars',
    RESERVATIONS: 'car_project_reservations'
};

export const storageService = {
    // Initialize data if empty
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
            localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(carsData));
        }
        if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
            localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify([]));
        }
    },

    // Get all cars
    getCars() {
        this.init();
        const cars = localStorage.getItem(STORAGE_KEYS.CARS);
        return JSON.parse(cars);
    },

    // Get car by ID
    getCarById(id) {
        const cars = this.getCars();
        return cars.find(car => car.id === parseInt(id));
    },

    // Add a new car
    addCar(car) {
        const cars = this.getCars();
        const newCar = {
            ...car,
            id: Date.now(), // Simple ID generation
            specs: {
                power: car.power || "N/A",
                acceleration: car.acceleration || "N/A",
                transmission: car.transmission || "Automatique",
                seats: car.seats || "2 places",
                fuel: car.fuel || "Essence"
            },
            features: car.features ? car.features.split(',').map(f => f.trim()) : []
        };

        cars.push(newCar);
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
        return newCar;
    },

    // Add a reservation
    addReservation(reservation) {
        this.init();
        const reservations = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS));
        const newReservation = {
            ...reservation,
            id: Date.now(),
            date: new Date().toISOString()
        };
        reservations.push(newReservation);
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
        return newReservation;
    },

    // Get all reservations
    getReservations() {
        this.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS));
    }
};
