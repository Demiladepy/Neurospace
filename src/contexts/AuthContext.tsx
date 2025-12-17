'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    name: string;
    role: string;
}

interface Student {
    name: string;
    grade: string;
    profileType: string;
}

interface AuthContextType {
    user: User;
    student: Student;
    login: (name: string) => void;
    logout: () => void;
}

const defaultUser = { name: 'Sarah', role: 'Parent & Guardian' };
const defaultStudent = { name: 'Leo', grade: '3rd Grade', profileType: 'Visual Learner' };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(defaultUser);
    const [student, setStudent] = useState<Student>(defaultStudent);

    // Load from localStorage on mount (Simulate persistence)
    useEffect(() => {
        const storedUser = localStorage.getItem('neurospace_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (name: string) => {
        const newUser = { name, role: 'Parent & Guardian' };
        setUser(newUser);
        localStorage.setItem('neurospace_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(defaultUser); // Reset to default for demo, or could clear
        localStorage.removeItem('neurospace_user');
    };

    return (
        <AuthContext.Provider value={{ user, student, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
