import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserState } from '../api/firebase';
import { QuillSet } from '../component/QuillSet';
import { ModalPortal } from '../component/ModalPortal';

function Notice() {
    const [user, setUser] = useState();

    const [isOpen, setIsOpen] = useState(false);

    function noticeAdminBtn() {
        console.log(isOpen);
        setIsOpen(true);
    }
    function handleCloseModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        onUserState((user) => {
            // console.log(user)
            setUser(user);
        })
    }, [])
    return (
        <div className='notice'>
            <div className='noticeTTl'>공지사항
            {user && user.isAdmin && (
                <button className='noticeAdmin' onClick={noticeAdminBtn}>작성하기</button>
            )}

            {isOpen && (
                    <ModalPortal>
                        <QuillSet onClose={handleCloseModal} />
                    </ModalPortal>
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
        </div>
    );
}

export default Notice;

