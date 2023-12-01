import { createContext, useContext, useEffect, useState } from 'react';
import { onUserState, login } from '../api/firebase';


const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();

  
    

    return(
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>    
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}