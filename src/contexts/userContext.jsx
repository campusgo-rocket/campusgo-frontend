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
    const [isLogged, setIsLogged] = useState(() => {
        const storedIsLogged = localStorage.getItem('isLogged');
        return storedIsLogged ? storedIsLogged : false;
    })

    return (
        <UserContext.Provider value={{
            uid,
            setUid,
            userType,
            setUserType,
            isLogged,
            setIsLogged
        }}>
            {children}
        </UserContext.Provider>
    );
}
