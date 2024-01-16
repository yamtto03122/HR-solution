import React from 'react';

function NoticeItem({notice}) {
    console.log(notice);
    return (
        <li>
            <div className='writerWrap'>
                    <div className='writerImg'>{notice.userImg}</div>
                    <div className='postTTl'>
                        <div className='ttlWrap'>
                            <div className='ttl'>{notice.title}</div>
                            <div className='postingTime'>{notice.dateKey}</div>
                        </div>
                        <div className='writer'>{notice.userName}</div>
                    </div>
                </div>
                <div className='postWrap'>
                    <div className='post'>{notice.content}</div>
                    <div className='postCheck'>✅ 5</div>
                </div>
        </li>
    );
}

export default NoticeItem;