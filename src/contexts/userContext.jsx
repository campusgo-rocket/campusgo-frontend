import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('');

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            userType,
            setUserType
        }}>
            {children}
        </UserContext.Provider>
    );
}
