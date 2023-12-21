import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StopWorkTime } from './StopWorkTime';
import { getWorkTime } from '../api/firebase';
import { clockIn, clockOut } from '../api/firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { BiSolidDownArrow } from "react-icons/bi";

function UserDatas({user}) {

     // 3. 실시간으로 측정되고 있는 시간
     const [time, setTime] = useState(0);
 
     // 4. timer의 실시간(?)을 관리하는 변수 
     const intervalRef = useRef(undefined);

     // 상단 스톱워치 메세지
     const [watchMSG, setWatchMSG] = useState('🙂 아직 출근전입니다')
 
     // 6. 퇴근완료 메세지
     const [endMSG, setEndMSG] = useState('출근전');

    //퇴근 버튼 메세지
     const [stopBtn, setStopBtn] = useState('근무 끝내기')


     // 2. 스톱 워치가 작동(running) 하고 있는지 여부
     const [isWorking, setIsWorking] = useState(false);

    

     // 1. 스톱워치를 시작하고, 정지하는 함수
     const startStop = () => {
         setIsWorking(!isWorking);
         if(!isWorking) { // 스톱워치가 작동중(true)이면
             intervalRef.current = setInterval(()=>{ //시간이 흐르고
                 setTime((prevTime) => prevTime + 1000);
             }, 1000);
             setEndMSG('근무중');
             setWatchMSG('🧑🏻‍💻 근무중입니다.');
         } else { //스톱워치가 작동중이지 않으면 (false)
             clearInterval(intervalRef.current); //시계를 멈추고
             setEndMSG('퇴근');
             setIsWorking(true);
         }
     } 


     //출근 시작 시간 확인
     const [workCheck, setWorkCheck] = useState([]);
     const workIn = async(user)=>{

               try{
                   clockIn(user);
                   const workCheckTime = await getWorkTime(user);
                   setWorkCheck(workCheckTime);
                   //console.log(workCheck)
   
               }catch(error){
                   console.error(error)
               }
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

    // 7. 퇴근 날짜 기록
    const workOut = async (e) => {
        //e.preventDefault();
        const db = getDatabase();
        const now = new Date();
        const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const workTime = StopWorkTime(time)
        const workTimeRef = ref(db, `user/${user.displayName}/workTime/${dateKey}/workTime`);
        set(workTimeRef, workTime);
        //clockOut(user)
        setIsWorking(true);
        
        setWatchMSG('😌 수고하셨습니다!');
        setStopBtn('퇴근 완료');

    };

    // 퇴근 시간 '한번만' 기록
    useEffect(() => {
        clockOut(user);
      }, [setIsWorking]);

    return (
        <UserItem>
                <div className='timerZone'>
                    {isWorking ?
                    <>
                        <div className='watchMSG'>{watchMSG}</div>
                        <div className='workTimer'>{StopWorkTime(time)}</div>
                        <BiSolidDownArrow className='downArrow'/>
                    </>:
                    <div className='workingCDT'>{watchMSG}</div>}
                </div>
                <div className='userDataBtnWrap'>
                    <div className='userWrap'>
                            <div className='userDatas'>
                                <div className='userInfo'>
                                    <div className='userPhoto'> <img src={user.photoURL} alt={user.displayName}/></div>
                                    <div>
                                        <font>{user.displayName}</font>님
                                    </div>
                                </div>
                                {isWorking ? <div className='workingCDT working'>{endMSG}</div>:<div className='workingCDT notWorking'>{endMSG}</div>}
                            </div>
                            {isWorking ? <div className='startTime'>{workCheck} 부터 진행중</div>:<></>}
                        </div>
                        <div className='btnWrap' onClick={startStop}>
                            {isWorking ? 
                                    <button onClick={() => workOut(user)} className='workBtn stop'>{stopBtn}</button>
                            
                                    : 
                                    <button className='workBtn start' onClick={() => workIn(user)}>근무 시작하기</button>
                            }
                        </div>
                </div>
        </UserItem>
    );
}

export default UserDatas;

const UserItem = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .timerZone{
            width: 100%;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 10px;
            padding: 15px;
            font-size: 15px;
            position: relative;
            .watchMSG{
                font-weight: 500;
            }
            .workTimer{
                font-size: 23px;
                font-weight: 700;
                margin-top: 10px;
            }
            .downArrow{
                position: absolute;
                transform: translateY(-50%);
                top: 50%;
                right: 23px;
                color: #888888;
            }
            }
        .userDataBtnWrap{
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            background: #ffffff;
            border-radius: 14px;
            padding: 10px;
            .userWrap{
                width: 100%;
                border: 1px solid #0cc321;
                border-radius: 10px;
                background: #f9f9f9;
                .userDatas{
                    font-size: 15px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    margin: 10px;
                    .userInfo{
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        .userPhoto{
                            width: 45px;
                            height: 45px;
                            border-radius: 10px;
                            border: 1px solid #d9d9d9;
                            box-sizing: border-box;
                            overflow: hidden;
                        }
                        img{
                            width: 100%;
                        }
                        font{
                            font-size: 17px;
                            font-weight: 700;
                        }
                    }
                    .workingCDT{
                        padding: 5px;
                        border-radius: 5px;
                        font-size: 12px;
                        font-weight: 900;
                    }
                    .working{
                        background: rgba(17,117,17,0.2);
                        border: 1px solid rgba(17,117,17,0.5);
                        color: #156c00;
                    }
                    .notWorking{
                        background: #ededed;
                        border: 1px solid #666666;
                        color: #777777;

                    }

                }
                .startTime{
                    margin: 10px;
                    color: #888888;
                    font-size: 15px;
                    font-weight: 600;
                }
            }
            .btnWrap{
                width: 100%;
                .workBtn{
                    width: 100%;
                    padding: 15px;
                    border-radius: 10px;
                    border: none;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 700;
                }
                .stop{
                    background: #0cc321;
                }
                .start{
                    background: rgb(12,195,33);
                    background: linear-gradient(90deg, rgba(12,195,33,1) 0%, rgba(9,206,199,1) 100%);
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