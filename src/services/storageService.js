import { carsData } from '../data/cars';

const STORAGE_KEYS = {
    CARS: 'car_project_cars',
    RESERVATIONS: 'car_project_reservations',
    USERS: 'car_project_users',
    CURRENT_USER: 'car_project_current_user'
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
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
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

    // Delete a car
    deleteCar(id) {
        const cars = this.getCars();
        const updatedCars = cars.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(updatedCars));
        return updatedCars;
    },

    // Add a reservation
    addReservation(reservation) {
        this.init();
        const reservations = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVATIONS));
        const currentUser = this.getCurrentUser();

        const newReservation = {
            ...reservation,
            id: Date.now(),
            userId: currentUser ? currentUser.id : null, // Associate with user
            status: 'pending', // Default status: pending, confirmed, refused
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
    },

    // Update reservation status
    updateReservationStatus(id, status) {
        this.init();
        const reservations = this.getReservations();
        const index = reservations.findIndex(r => r.id === id);
        if (index !== -1) {
            reservations[index].status = status;
            localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
        }
        return reservations;
    },

    // Remove a reservation
    removeReservation(id) {
        this.init();
        const reservations = this.getReservations();
        const updatedReservations = reservations.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updatedReservations));
        return updatedReservations;
    },

    // Register a new user
    registerUser(user) {
        this.init();
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));

        // Check if email already exists
        if (users.find(u => u.email === user.email)) {
            throw new Error('Cet email est déjà utilisé');
        }

        const newUser = {
            ...user,
            id: Date.now(),
            role: 'client' // Default role
        };

        // If it's the very first user, make them admin for convenience
        if (users.length === 0) {
            newUser.role = 'admin';
        }

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return newUser;
    },

    // Login user
    loginUser(email, password) {
        this.init();
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        return user;
    },

    // Get all users
    getUsers() {
        this.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    },

    // Update user
    updateUser(updatedUser) {
        this.init();
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);

        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

            // If updating current user, update session too
            const currentUser = this.getCurrentUser();
            if (currentUser && currentUser.id === updatedUser.id) {
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
            }
        }
    },

    // Logout
    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    // Get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    }
};
