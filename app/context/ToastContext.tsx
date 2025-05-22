// context/ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextType = {
    show: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const show = useCallback((message: string, type: ToastType = 'info') => {
        const id = ++toastCounter;
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000); // Auto dismiss after 3s
    }, []);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
};

// 👇 Define your toast item UI here or move to separate file
import { View, Text, StyleSheet } from 'react-native';
const ToastItem = ({ toast }: { toast: Toast }) => {
    return (
        <View style={[styles.toast, styles[toast.type]]}>
            <Text style={styles.text}>{toast.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
        padding: 12,
        borderRadius: 8,
        zIndex: 9999,
        elevation: 10,
    },
    success: { backgroundColor: '#4CAF50' },
    error: { backgroundColor: '#F44336' },
    info: { backgroundColor: '#2196F3' },
    text: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
