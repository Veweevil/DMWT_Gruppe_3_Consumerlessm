'use client';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('Lade Benutzer aus localStorage:', storedUser);
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const login = (userInfo) => {
        console.log('Login mit Benutzer:', userInfo);
        setIsLoggedIn(true);
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
    };

    const logout = () => {
        console.log('Benutzer wird ausgeloggt');
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
