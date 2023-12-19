// 회원가입
import React, { useState } from 'react';
import { joinEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [psError,setPsError] = useState('')//패스워드 에러
    const navigate = useNavigate();

    //회원가입 버튼 이벤트
    const signUpEvent = async(e)=>{
        e.preventDefault();
        // console.log(password.length)

        if(password.length < 6){
            // console.log(password.length)
            setPsError('비밀번호는 6자리 이상이야합니다.')
            return
        }
        try{
            const user = await joinEmail(email, password, name);
            // console.log(user)
            navigate('/'); //로그인페이지로 이동
        }catch(error){
            console.error(error);
        }
    }
    return (
        <div className='container'>
            <h2>JOIN</h2>
            <form onSubmit={signUpEvent}>
                <div>
                    <input type='text' placeholder='이름을 입력하세요.' value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <input type='email' placeholder='이메일을 입력하세요.' value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type='password' placeholder='비밀번호를 입력하세요.' value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {psError && <span className='errorText'>{psError}</span>}
                </div>

                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
}

export default Join;