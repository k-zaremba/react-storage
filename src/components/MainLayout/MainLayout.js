import React, { useState } from 'react'
import './MainLayout.css'
import MainLayoutClient from '../Client/MainLayoutClient/MainLayoutClient'
import MainLayoutWorker from '../Worker/MainLayoutWorker/MainLayoutWorker'
import MainLayoutManager from '../Manager/MainLayoutManager/MainLayoutManager'
import MainLayoutAdmin from '../Admin/MainLayoutAdmin/MainLayoutAdmin'
import LoginPanel from '../LoginPanel/LoginPanel'
import RegisterPanel from '../RegisterPanel/RegisterPanel'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NoAccessPanel from '../NoAccessPanel/NoAccessPanel'
import NotFoundPanel from '../NotFoundPanel/NotFoundPanel'

const MainLayout = () => {


    function RequireAuth({ children, redirectTo, perm }) {
        var item = sessionStorage.getItem('user')
        var user = item ? JSON.parse(item) : {}

        console.log(sessionStorage.getItem('authenticated'))
        var isAuthenticated = ( (sessionStorage.getItem('authenticated') === 'true' ) && user.permission === perm);
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }

    return (
        <BrowserRouter>
            <div className="main-panel-panels">
                <Routes >
                    <Route
                        path='/'
                        element={<LoginPanel/>}
                    />

                    <Route
                        path='/noaccess'
                        element={<NoAccessPanel />}
                    />

                    <Route
                        path='/register'
                        element={<RegisterPanel />}
                    />

                    <Route
                        path='/admin'
                        element={
                            <RequireAuth perm={0} redirectTo="/noaccess">
                                <MainLayoutAdmin />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='/manager'
                        element={
                            <RequireAuth perm={1} redirectTo="/noaccess">
                                <MainLayoutManager />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='/worker'
                        element={
                            <RequireAuth perm={2} redirectTo="/noaccess">
                                <MainLayoutWorker />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='/client'
                        element={
                            <RequireAuth perm={3} redirectTo="/noaccess">
                                <MainLayoutClient />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path='*'
                        element={<NotFoundPanel/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default MainLayout