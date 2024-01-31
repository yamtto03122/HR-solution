import React, { useEffect, useState } from 'react';
import { deleteNotice, getNoticeList, onUserState } from '../api/firebase';
import { QuillSet } from '../component/QuillSet';
import { ModalPortal } from '../component/ModalPortal';
import ReactHtmlParser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';


function Notice() {
    const navigate = useNavigate();
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

    
    //데이터를 정렬해서 담을 변수
    const [noticeList, setNoticeList] = useState([]);

    const [isItem, setIsItem] = useState(true);

    useEffect(() => {
        const fetchNoticeData = async () => {
            // Notice에서 async로 getNoticeList()호출 ->
            // getNoticeList()에서 await로 데이터를 받아올 때 까지 Notice async 함수 정지 ->
            // 데이터 받아온 후 Notice async 함수실행
          try {
            const asyncNoticeData = await getNoticeList();
            if (asyncNoticeData) {
              setIsItem(true);
              const sortedData = asyncNoticeData.sort().reverse();
              setNoticeList(sortedData)
                //setNoticeList(asyncNoticeData)
                
            } else {
              // Handle the case where noticeListData is undefined
              console.log('No data');
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchNoticeData();
      },[]);

      console.log(noticeList)
    //   noticeList.map((noticeData) => (
    //     console.log(noticeData.title)
    //     ))

    //   const { isLoading, error, data : notice } = useQuery({queryKey : ['notice'], queryFn : getNoticeList})
    //   console.log(notice);
    //   if (isLoading) return 'Loading...';
    //   if (error) return 'An error has occurred: ' + error.message;


    //삭제
    const removeNotice = async(id) => {
        
        if(window.confirm('삭제하시겠습니까?')){
            try{
                await deleteNotice().then((res)=>{
                    alert('삭제되었습니다.')
                    navigate('/',{replace:true});
                });
            }catch (error) {
                console.error(error);
            }

        }
      }

    


  
    
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
                {/* {isLoading && <p>Loading...</p>} 만약 로딩중이라면, 로딩이라고 뜨고, */}
                {/* {error && <p>An error has occurred.</p>} */}
                <ul className='noticeUl'>
                    {noticeList.map((noticeData, index) => ( //notice 배열의 한 요소를 호출해서 map으로 새 배열을 생성하고 그 안에 값은 noticeData 라는 매개변수로 받아옵니다
                        <li key={noticeData.id} index={index} id={noticeData.id} className='noticeLi'>
                            <div className='noticeWrap'>
                                <div className='writerWrap'>
                                <div className='writerImg'><img src={noticeData.userImg} alt='{noticeData.userImg}'/></div>
                                <div className='postTTl'>
                                    <div className='ttlWrap'>
                                        <div className='ttl'>{noticeData.title}</div>
                                        <div className='postingTime'>{noticeData.dateKey}</div>
                                    </div>
                                    <div className='writer'>{noticeData.userName}</div>
                                </div>
                                </div>
                                <div className='postWrap'>
                                    <div className='post'>{ReactHtmlParser(noticeData.content)}</div>
                                    <div className='postBtnWrap'>
                                        <div className='postBtn'>✅ 5</div>

                                        {user && user.isAdmin && (
                                        <div className='postAdminBtn'>
                                            <div className='postBtn'>수정</div>
                                            <button onClick={()=>removeNotice(noticeData.id)} className='postBtn'>삭제</button>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default Notice;

