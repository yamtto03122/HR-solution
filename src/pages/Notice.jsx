import React, { useEffect, useState } from 'react';
import { getNoticeList, onUserState } from '../api/firebase';
import { QuillSet } from '../component/QuillSet';
import { ModalPortal } from '../component/ModalPortal';
import { useQuery } from '@tanstack/react-query';
import NoticeItem from '../component/NoticeItem';

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

    // useEffect(() => {
    //     const fetchNoticeData = async () => {
    //         // Notice에서 async로 getNoticeList()호출 ->
    //         // getNoticeList()에서 await로 데이터를 받아올 때 까지 Notice async 함수 정지 ->
    //         // 데이터 받아온 후 Notice async 함수실행
    //       try {
    //         const noticeListData = await getNoticeList();
    //         if (noticeListData) {
    //           setNoticeList(noticeListData);
    //           setIsItem(true);
    //         //   const map = new Map(Object.entries(noticeListData));
    //         //   console.log(map)
    //         console.log(noticeListData)
    //           setNoticeList(noticeListData)
    //         } else {
    //           // Handle the case where noticeListData is undefined
    //           console.log('No data');
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    
    //     fetchNoticeData();
    //   }, []);

      const { isLoading, error, data : notice } = useQuery({queryKey : ['notice'], queryFn : getNoticeList})
      console.log(notice);
      if (isLoading) return 'Loading...';

      if (error) return 'An error has occurred: ' + error.message;
    
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
                <ul>
                    {notice && notice.map((notice) => {
                        <NoticeItem key={notice.title}/>
                    })}
                </ul>
                {/* <div className='writerWrap'>
                    <div className='writerImg'></div>
                    <div className='postTTl'>
                        <div className='ttlWrap'>
                            <div className='ttl'>{noticeList.title}</div>
                            <div className='postingTime'>시간</div>
                        </div>
                        <div className='writer'>글쓴이</div>
                    </div>
                </div>
                <div className='postWrap'>
                    <div className='post'>내용내용내용</div>
                    <div className='postCheck'>✅ 5</div>
                </div> */}
            </div>)}
        </div>
    );
}

export default Notice;

