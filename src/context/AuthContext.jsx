import { createContext, useContext, useEffect, useState } from 'react';
import { onUserState, login, logOut } from '../api/firebase';


const AuthContext = createContext();
// context() = 컴포넌트간에 어떠한 값 (여기서는 유저)들을 공유할 수 있게 하는 기능
//변수에 새로운 context를 생성하고 초기화 후 사용

export function AuthContextProvider({children}){
    const [user, setUser] = useState(); //user에 대한 정보를 받을 상태변수
    const [unSubScribe, setUnSubScribe] = useState(); //로그인 인증상태를 봄

    useEffect(()=>{
        const userChange = (newUser) => {
            console.log(newUser);
            setUser(newUser);
            //새로운 사용자 데이터로 상태를 업데이트
        };

        const unSubScribeFunc = onUserState(userChange); // 위에서 새로 업데이트 된 사용자를 onUserState로 넘김
        setUnSubScribe(()=>unSubScribeFunc);

        return () => {
            if(unSubScribeFunc){
                unSubScribeFunc();
            }
        }
    },[])
    

    return(
        <AuthContext.Provider value={{user, login}}>
            {children}
            {/* {children} = 모든 하위 컴포넌트를 의미 */}
        </AuthContext.Provider>    
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}

//위의 함수들을 단순화시켜서 다른 곳에서 참조할 수 있도록 export(내보내기)함