import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (username, password) => {
        // In a real app, you would validate against a backend
        if (username && password) {
            const userData = { username };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success('Login successful!', {
                style: {
                    background: '#f0fdf4',
                    color: '#166534',
                }
            });
            return true;
        }
        toast.error('Invalid credentials', {
            style: {
                background: '#fef2f2',
                color: '#991b1b',
            }
        });
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        toast.info('Logged out successfully', {
            style: {
                background: '#eff6ff',
                color: '#1e40af',
            }
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};