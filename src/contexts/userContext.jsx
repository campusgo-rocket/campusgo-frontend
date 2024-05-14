import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [uid, setUid] = useState(null);
    const [userType, setUserType] = useState(() => {
        const storedUserType = localStorage.getItem('userType');
        return storedUserType ? storedUserType : '';
    });

    return (
        <UserContext.Provider value={{
            uid,
            setUid,
            userType,
            setUserType
        }}>
            {children}
        </UserContext.Provider>
    );
}
