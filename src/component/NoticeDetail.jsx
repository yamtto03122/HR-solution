import React from 'react';

function NoticeDetail({notice}) {
    const noticeDetail = () => {
        Navigate(`/notice/${notice.title}`),{
            state : {
                title : notice.title,
                content : notice.content,
                userName : notice.userName,
                userImg : notice.userImg,
                dateKey : notice.dateKey 
            }
        }
    }
    return (
        <div>
                
            
        </div>
    );
}

export default NoticeDetail;