import React from 'react';
import styled from 'styled-components';

function UserDatas({user : {photoURL, displayName}}) {
    return (
        <UserItem>
            <img src={photoURL} alt={displayName}/>
            <span className='hidden'>{displayName}</span>
        </UserItem>
    );
}

export default UserDatas;

const UserItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    img{
        width: 50px;
        border-radius: 5px;
    }
`