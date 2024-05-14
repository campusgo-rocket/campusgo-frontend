import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [uid, setUid] = useState(() => {
        const storedUID = localStorage.getItem('uid');
        return storedUID ? storedUID : '';
    });
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
