import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { createNotice, onUserState } from '../api/firebase';


function QuillSet() {
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

    const [isLoading, setIsLoading] = useState(false) //업로드 상태 초기화 (업로드시 true)
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

    const handleSubmit = async () => {
        setIsLoading(true);
        const now = new Date();
        const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const contents = {
            title,
            content,
            dateKey
        }
        console.log(contents)
        try {
        await createNotice(contents).then((res) => console.log(res));
        alert('등록되었습니다.');
        } catch (error) {
        console.log(error);
        }finally{ // 마지막에 업로드됐다 -> 초기화
            setIsLoading(false);
        }
    };

    return (
    <>
        <div>
        <input type="text" placeholder="제목을 입력해주세요." onChange={handleTitleChange} />
        <ReactQuill
            style={{ width: "100%", height: "300px" }}
            modules={modules}
            formats={formats}
            ref={quillRef}
            onChange={setContent}
        />
        </div>
        <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '등록중' : '등록'}
        </button>
    </>
    );
}

export default QuillSet;