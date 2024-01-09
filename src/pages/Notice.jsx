import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserState } from '../api/firebase';
import { IoClose } from "react-icons/io5";
import QuillSet from '../component/QuillSet';

function Notice() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const closeBtn = (e) => {
        console.log('click')
        e.preventDefault();
    }

    useEffect(() => {
        onUserState((user) => {
            // console.log(user)
            setUser(user);
        })
    }, [])

    const noticeAdminBtn = () => {
        navigate('./noticwWrite');
    }
    return (
        <div className='notice'>
            <div className='noticeTTl'>공지사항
            {user && user.isAdmin && (
                <button className='noticeAdmin' onClick={noticeAdminBtn}>작성하기</button>
            )}
            </div>
            <div className='writerWrap'>
                <div className='writerImg'>프로필사진</div>
                <div className='postTTl'>
                    <div className='ttlWrap'>
                        <div className='ttl'>제목제목제목</div>
                        <div className='postingTime'>시간</div>
                    </div>
                    <div className='writer'>글쓴이</div>
                </div>
            </div>
            <div className='postWrap'>
                <div className='post'>내용내용내용</div>
                <div className='postCheck'>✅ 5</div>
            </div>
            <div className='mask'>
                <div className='writeBoxWrap'>
                    <div className='writeTTlBox'>
                        <h2>공지사항 작성</h2>
                        <button className='closeBtn' onClick={closeBtn}><IoClose className='closeIco'/></button>
                    </div>
                    <div>
                        <QuillSet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notice;

