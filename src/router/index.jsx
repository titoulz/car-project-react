import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Catalogue from '../pages/Catalogue';
import CarDetail from '../pages/CarDetail';
import Login from '../pages/Login';

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
                path: '*',
                element: <Home />,
            },
        ],
    },
]);
