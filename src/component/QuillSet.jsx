import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { createNotice, onUserState } from '../api/firebase';

import { IoClose } from "react-icons/io5";


export function QuillSet({ onClose },{user}) {

    //퀼 설정 start
        const modules = useMemo(()=> { // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
            return {
                toolbar: {
                    container : [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" }
                        ],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }, "link", "image"],
                        //["clean"],
                    ]
                },
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

        const quillRef = useRef();
    // 퀼 설정 end

    const [success, setSuccess] = useState(null) //업로드 완료 시 완료 상태 체크

    // const onChange = (e) => { //타겟이 없기때문에 매개변수 e가 들어가줘야함
    //     const {name, value} = e.target;
 
    //     setContents((prevContents)=>({ ...prevContents,[name] : value }))
    // }

    const [content, setContent] = useState('');
    console.log(content);
    const [title, setTitle] = useState('');
    const handleTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.currentTarget.value);
    };
    console.log(user);

    const handleSubmit = async(user) => {
        const now = new Date();
        const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const userName = user.displayName
        const contents = {
            title,
            content,
            dateKey,
            userName
        }
        console.log(contents)
        console.log(user.displayName);
        try {
        await createNotice(contents).then((res) => console.log(res));
        alert('등록되었습니다.');
        } catch (error) {
        console.log(error);
        }finally{
            onClose();
        }
    };

    return (
    <div className='mask'>  
        <div className='writeBoxWrap'>
            <div className='writeTTlBox'>
                <h2>공지사항 작성</h2>
                <button className='closeBtn' onClick={ onClose }><IoClose className='closeIco'/></button>
            </div>
            <div>    
                <div>
                <input type="text" placeholder="제목을 입력해주세요." onChange={handleTitleChange} />
                <ReactQuill
                    style={{ width: "100%", height: "300px", marginBottom: "20px"}}
                    modules={modules}
                    formats={formats}
                    ref={quillRef}
                    onChange={setContent}
                />
                </div>
                <button onClick={handleSubmit} className='submitBtn'>등록</button>
            </div>
        </div>
    </div>
    );
}

export default QuillSet;