import React, { useState } from 'react';
import { FiMail } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
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
        // navigate('/pages/home');
    }


    return (
        <LoginPage>
            <h1>새로운 HR의 시작, Better Log</h1>

            <button onClick={googleLogin}>Google 계정으로 로그인</button>
            {/* <form>
                <div className='inputLine'>
                    <FiMail className='loginIco'/>
                    <input type='email' placeholder='이메일 주소' 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='inputLine'>
                    <LuKeyRound className='loginIco'/>
                    <input type='password' placeholder='비밀번호' value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>로그인하기</button>
                {errorMsg && <span className='errorTxt'>{errorMsg}</span>}
                <button type='button' onClick={joinEmail}>회원가입</button>
                <button type='button'>비밀번호를 잊으셨나요?</button>
            </form> */}

        </LoginPage>
    );
}

export default Login;

const LoginPage = styled.div `
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h1{
        font-size: 35px;
        text-align: center;
        margin-bottom: 30px;
    }
    form{
        display: flex;
        flex-direction: column;
        .inputLine{
            display: flex;
            font-size: 14px;
            height: 56px;
            padding-left: 18px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
            .loginIco{
                font-size: 23px;
            }


        }
    }
`