import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNoticeList, onUserState } from '../api/firebase';
import { QuillSet } from '../component/QuillSet';
import { ModalPortal } from '../component/ModalPortal';
import axios from 'axios';

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


    const [noticeList, setNoticeList] = useState([]);
    const [isItem, setIsItem] = useState(true);

    // const noticeData = async() => {
    //     try{
    //         const noticeListData = await getNoticeList();
    //         setNoticeList(noticeListData);
    //         setIsItem(true)
    //         console.log(noticeListData)
    //     }catch(error){
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        const fetchNoticeData = async () => {
          try {
            const noticeListData = await getNoticeList();
            if (noticeListData) {
              setNoticeList(noticeListData);
              setIsItem(true);

              console.log(noticeListData);
            } else {
              // Handle the case where noticeListData is undefined
              console.log('No data');
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchNoticeData();
      }, []);


    
    return (
        <div className='notice'>
            <div className='noticeTTl'>공지사항
            {user && user.isAdmin && (
                <button className='noticeAdmin' onClick={noticeAdminBtn}>작성하기</button>
            )}

            {isOpen && (
                    <ModalPortal>
                        <QuillSet onClose={handleCloseModal} user={user} />
                    </ModalPortal>
            )}
            </div>
            {!isItem && <p>공지사항이 없습니다.</p>}
            {isItem &&(
            <div>
                {/* <ul>
                    {noticeList.map((contents) => (
                        <li key={contents.title}>{contents.content}</li>
                        ))}
                </ul> */}
                <div className='writerWrap'>
                    <div className='writerImg'></div>
                    <div className='postTTl'>
                        <div className='ttlWrap'>
                            <div className='ttl'>제목제목</div>
                            <div className='postingTime'>시간</div>
                        </div>
                        <div className='writer'>글쓴이</div>
                    </div>
                </div>
                <div className='postWrap'>
                    <div className='post'>내용내용내용</div>
                    <div className='postCheck'>✅ 5</div>
                </div>
            </div>)}
        </div>
    );
}

export default Notice;

