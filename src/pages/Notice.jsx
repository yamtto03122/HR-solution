import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserState } from '../api/firebase';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';

function Notice({id, value}) {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const modules = useMemo(()=> { // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
        return {
            toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" }
            ],
            [{ color: [] }, { background: [] }],
            [{ align: [] }, "link", "image"],
            //[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
            ["clean"],
            ],
            // ImageResize: { modules: ['Resize'] },
        }

    },[])
    // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
    ];

    const [content, setContent] = useState('');

    const quillRef = useRef();

    // const handleImage = () => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type','file');
    //     input.setAttribute("accept", "image/*");
    //     input.click();
    //     input.onchange = async()=> {
    //         const file = input.file[0];

    //         //현재 커서 위치 저장
    //         const range = getEditor().getSelection(true);

    //         //서버에 올려질 때 까지 표시할 로딩 placeholder 삽입
    //         getEditor().insertEmbed(range.index, 'image', `images/loading.gif`);

    //         // 필자는 파이어 스토어에 저장하기 때문에 이런식으로 유틸함수를 따로 만들어줬다 
    //         // 이런식으로 서버에 업로드 한뒤 이미지 태그에 삽입할 url을 반환받도록 구현하면 된다 

    //     }
    // }
    // useEffect(()=>{
    //     const handleImage = ()=> {// 이미지 핸들 로직

    //     }
    //     if(quilRef.current){
    //         const { getEditor } = quilRef.current;
    //         const toolbar = quilRef.current.getEditor().getModule('toolbar');
    //         toolbar.addHandler('image', handleImage);
    //     }
    // },[])

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
                <div className='AdminWriteWrap'>
                    <h2>공지사항 작성</h2>
                    <div>
                    <ReactQuill
                    id={id}
                    theme = 'snow'
                    ref={quillRef}
                    modules = {modules}
                    formats = {formats}
                    value = {value || ''}
                    style = {{width: '100%', height: '300px'}}
                    //preserveWhitespace
                    />

                    </div>
                    <button className='submitBtn'>등록</button>
                </div>
            </div>
        </div>
    );
}

export default Notice;

