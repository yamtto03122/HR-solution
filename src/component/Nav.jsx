import React, { useEffect, useState } from 'react';
import UserDatas from './UserDatas';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, onUserState } from '../api/firebase';
import styled from 'styled-components';

function Nav() {
    const { user, logOut } = useAuthContext();
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    const userLogOut=()=>{
        logOut().then(setUserInfo);
    }

    useEffect(()=>{
        onUserState((userInfo) => {
            setUserInfo(userInfo);
        })
    },[])


    return (
        <NavContaier>
            <>
                {user && <UserDatas user={userInfo}/>}
                <Link to='/login'>
                    <button onClick={userLogOut} className='logoutBtn'>
                        로그아웃
                    </button>
                </Link>
            </>
        </NavContaier>
    );
}

export default Nav;

const NavContaier = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
`