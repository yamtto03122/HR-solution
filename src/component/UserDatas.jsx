import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StopWorkTime } from './StopWorkTime';
import { workRecord } from '../api/firebase';

function UserDatas({user : {photoURL, displayName}}) {

     // 1. 출근버튼
    const [startWork, setStartWork] = useState();
    
    // 2. 스톱 워치가 작동(running) 하고 있는지 여부
    const [isWorking, setIsWorking] = useState(false);

    // 3. 실시간으로 측정되고 있는 시간
    const [time, setTime] = useState(0);

    // 4. timer의 실시간(?)을 관리하는 변수 
    const intervalRef = useRef(undefined);

    // 5. 퇴근버튼
    const [endWork, setEndWork] = useState();

    // 6. 퇴근완료 메세지
    const [endMSG, setEndMSG] = useState('아직 출근 전입니다!');


    // 7. 파이어베이스 등록
    const onSubmit = async(e)=> {
        e.preventDefault();
        const currentTime = new Date();
        try{
            if(isWorking){ //퇴근 전송
                setStartWork(currentTime);
                setEndWork(currentTime); //파이어베이스 퇴근시간 전송
                workRecord();
            }

        }catch(error){
            console.error(error);
        }
        
    }

   
    // 1. 스톱워치를 시작하고, 정지하는 함수
    const startStop = () => {
        if(!isWorking) {
            intervalRef.current = setInterval(()=>{
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
            setIsWorking(true);
            setEndMSG('근무중입니다 :)');
        } else {
            clearInterval(intervalRef.current);
            setIsWorking(true);
            setEndMSG('수고하셨습니다!');
        }
    }

    // //2. 해당 시간을 record에 파이어베이스에 기록하는 함수

    // const recordLap = () =>{
    //     const newRecord = {
    //         id : record.length === 0 ? 1 : record[record.length - 1].id + 1,
    //     };
    //     setRecord((prevLaps) => [...prevLaps, newRecord]);
    //     console.log(recordLap)
    // }

    
    

    return (
        <UserItem>
            <img src={photoURL} alt={displayName}/>
            <div className='userWrap'>
                <div className='userName'>
                    <font>{displayName}</font>님,
                </div>
                <p>{endMSG}</p>
            </div>
            <form>
                <div className='workTimeWrap' onClick={startStop}>
                    {isWorking ? 
                        <div className='timerZone'>
                            <div className='workTimer'>{StopWorkTime(time)}</div>
                            <button onClick={onSubmit} className='stopBtn'>퇴근</button>
                        </div> : 
                            <button onClick={startWork} className='startBtn'>출근</button>
                    }
                </div>
            </form>
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