import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomRouter from '../utils/CustomRouter';
import history from '../utils/history';
import { LoginScreen, CalendarScreen, RegisterScreen } from '../components';
import ProtectedRoutes from '../utils/ProtectedRoutes';

const AppRouter = () => {
    return (
        <>
            <CustomRouter history={history}>
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />
                    <Route path="/register" element={ <RegisterScreen /> } />
                    <Route element={ <ProtectedRoutes /> }>
                        <Route path="/" element={ <CalendarScreen /> } />
                    </Route>
                </Routes>
            </CustomRouter>
        </>
    );
};

export default AppRouter;