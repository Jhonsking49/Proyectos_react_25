import { createContext, useState, useContext } from 'react';
import Toast from '../components/Toast';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const newToast = { id, message, type };
        
        setToasts([newToast]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    };

    

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <Toast toasts={toasts} onClose={(toast) => removeToast(toast.id)} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};