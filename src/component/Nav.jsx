import React, { useEffect, useState } from 'react';
import UserDatas from './UserDatas';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, onUserState } from '../api/firebase';
import styled from 'styled-components';

function Nav() {
    // const { user, logOut } = useAuthContext();
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();

    const userLogOut=()=>{
        logOut().then(setUserInfo);
    }

    useEffect(()=>{
        onUserState((userInfo) => { //firebase.jsx에서 받아온 onUserState
            setUserInfo(userInfo);
        })
    },[])


    return (
        <NavContaier>
            <>
                {userInfo && <UserDatas user={userInfo}/>}
            </>
            <ul>
                <li><Link to='/'>홈피드</Link></li>
                <li><Link to='/home'>구성원</Link></li>
                <li><Link to='/home'>근무</Link></li>
                <li><Link to='/home'>휴가</Link></li>
                <li><Link to='/home'>급여</Link></li>
                
            </ul>
            <Link to='/login' className='logoutBtn'>
                <button onClick={userLogOut}>
                    로그아웃
                </button>
            </Link>
        </NavContaier>
    );
}

export default Nav;

const NavContaier = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 270px;
    display: flex;
    flex-direction: column;
    padding: 50px 30px;
    background-color: #f1f1f1;
    .logoutBtn{

    }
    ul{
        li{
            margin: 25px 0;
            a{
                width: 100%;
                display: block;
            }
        }
    }
    
`