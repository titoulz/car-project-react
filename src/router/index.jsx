import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Catalogue from '../pages/Catalogue';
import CarDetail from '../pages/CarDetail';
import Login from '../pages/Login';
import AddCar from '../pages/AddCar';
import MyReservations from '../pages/MyReservations';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/cars',
                element: <Catalogue />,
            },
            {
                path: '/cars/:id',
                element: <CarDetail />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/add-car',
                element: <AddCar />,
            },
            {
                path: '/my-reservations',
                element: <MyReservations />,
            },
            {
                path: '*',
                element: <Home />,
            },
        ],
    },
]);
