import React, { useContext, useState } from 'react';
import { FiMail } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { emailLogin, joinEmail, login } from '../api/firebase';
import styled from 'styled-components';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    //구글 로그인 버튼
    const googleLogin = async() => {
        const user = await login();
        navigate('/'); //메인페이지로 이동
    }

    const loginEvent = async (e) => {
        e.preventDefault();
        try{
            const user = await emailLogin(email, password);
            // console.log(user)
            if(user){
                navigate('/');
            }else{
                setErrorMsg('아이디나 비밀번호가 일치하지 않습니다.');
            }
        }catch(error){
            console.error(error);
        }
    }


    return (
        <div className='loginPage'>
            <h1>새로운 HR의 시작, Better Log</h1>

            <form onSubmit={loginEvent}>
                <div className='inputLine'>
                    <FiMail className='loginIco'/>
                    <input type='email' placeholder='이메일 주소'
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='inputLine'>
                    <LuKeyRound className='loginIco'/>
                    <input type='password' placeholder='비밀번호'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                </div>
                <button type='submit'>로그인하기</button>
                {errorMsg && <span className='errorTxt'>{errorMsg}</span>}
                <button type='button'>비밀번호를 잊으셨나요?</button>
            </form>
                <button type='button' onClick={googleLogin}>Google 계정으로 로그인</button>
            <Link to='/join'>회원가입</Link>
            <Link to='/admin'>관리자</Link>

        </div>
    );
}

export default Login;
