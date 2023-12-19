import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StopWorkTime } from './StopWorkTime';
import { getWorkTime, workRecord } from '../api/firebase';
import { clockIn, clockOut } from '../api/firebase';
import { getDatabase, ref, set } from 'firebase/database';

function UserDatas({user}) {

     // 3. 실시간으로 측정되고 있는 시간
     const [time, setTime] = useState(0);
 
     // 4. timer의 실시간(?)을 관리하는 변수 
     const intervalRef = useRef(undefined);
 
     // 6. 퇴근완료 메세지
     const [endMSG, setEndMSG] = useState('아직 출근 전입니다!');


     // 2. 스톱 워치가 작동(running) 하고 있는지 여부
     const [isWorking, setIsWorking] = useState(false);

     //출근 시작 시간 체그
     const [start, setStart] = useState('');
 
    
     // 1. 스톱워치를 시작하고, 정지하는 함수
     const startStop = () => {
         if(!isWorking) {
             intervalRef.current = setInterval(()=>{
                 setTime((prevTime) => prevTime + 1000);
             }, 1000);
             setIsWorking(true);
             setEndMSG('근무중');
         } else {
             clearInterval(intervalRef.current);
             setIsWorking(true);
             setEndMSG('수고하셨습니다!');
         }
         setIsWorking(!isWorking);
     } 

     const workIn = () => {
        clockIn(user)
        const today = new Date();
        const timeff = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        
        return timeff
     }

     
        // 날짜 출력
        const getToday = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = ('0' + (1+ date.getMonth())).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
    
            return `${year}년 ${month}월 ${day}일`;
            console.log(getToday);
    
         }

    // 7. 퇴근시간 기록
    const workOut = async (e) => {
        //e.preventDefault();
        const db = getDatabase();
        const now = new Date();
        const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const workTime = StopWorkTime(time)
        const workTimeRef = ref(db, `user/${user.displayName}/workTime/${dateKey}/workTime`);
        set(workTimeRef, workTime);
        clockOut(user)
        setIsWorking(true);
    };

    return (
        <UserItem>
            <img src={user.photoURL} alt={user.displayName}/>
            <div className='userWrap'>
                <div className='userName'>
                    <font>{user.displayName}</font>님
                </div>
            </div>
                <div className='timerZone'>
                
                    <>
                        <div className='workTimer'>{StopWorkTime(time)}</div>
                        <p>{endMSG}</p>
                    </>
                    <></>
                
                </div>
                <div className='workTimeWrap' onClick={startStop}>
                    {isWorking ? 
                        <>
                            <div>{getWorkTime()}부터 근무중입니다.</div>
                            <button onClick={() => workOut(user)} className='stopBtn'>근무 끝내기</button>
                        </>
                            : 
                            <button className='startBtn' onClick={() => workIn(user)}>근무 시작하기</button>
                    }
                </div>
        </UserItem>
    );
}

export default UserDatas;

const UserItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    img{
        width: 120px;
        height: 120px;
        border-radius: 15px;
    }
    .userWrap{
            font-size: 17px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        .userName{
            font{
                font-size: 20px;
                font-weight: 700;
            }
        }

    }
    form{
        width: 100%;
        .workTimeWrap{
            .timerZone{
                display: flex ;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                .workTimer{
                    font-size: 30px;
                    font-weight: bold;
                }
                .stopBtn{
                    background-color: #0077eb;
                }
            }
            button{
                width: 100%;
                padding: 13px;
                border-radius: 5px;
                border: none;
                color: #ffffff;
                font-size: 17px;
                font-weight: bold;
            }
            .startBtn{
                    background-color: #0077eb;
            }
        }

    }
`