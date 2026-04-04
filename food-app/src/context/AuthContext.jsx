import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const Auth = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedData = localStorage.getItem("user");
        return savedData ? JSON.parse(savedData) : null;
    });

    const loginUser = (token) => {
        try {
            const decoded = jwtDecode(token);
            const authObject = {
                token: token,      // The raw string for Axios
                role: decoded.role, // For Routing
                username: decoded.sub, // For UI
                ...decoded
            };

            setUser(authObject);
            localStorage.setItem("user", JSON.stringify(authObject));
        } catch (error) {
            console.error("Invalid token:", error);
        }
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <Auth.Provider value={{ loginUser, logoutUser, user, userRole: user?.role }}>
            {children}
        </Auth.Provider>
    );
};

export default AuthContext;