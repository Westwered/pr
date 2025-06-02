import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

   useEffect(() => {
    try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (parsed && typeof parsed === 'object') {
                setUser(parsed);
            }
        }
    } catch (error) {
        console.warn("Ошибка при чтении user из localStorage:", error);
        localStorage.removeItem("user"); // Очистим мусор
    }
}, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    try {
        return (
            <AuthContext.Provider value={{ user, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    } catch (error) {
        console.error("Ошибка в AuthProvider:", error);
        return <div>Произошла ошибка в AuthProvider</div>;
    }
}

export function useAuth() {
    return useContext(AuthContext);
}
