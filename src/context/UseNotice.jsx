import { useQuery } from "@tanstack/react-query";
import { getNoticeList } from "../api/firebase";

export default function UseNotice(){
        const fetchNoticeData = async () => {
            // Notice에서 async로 getNoticeList()호출 ->
            // getNoticeList()에서 await로 데이터를 받아올 때 까지 Notice async 함수 정지 ->
            // 데이터 받아온 후 Notice async 함수실행
          try {
            const noticeListData = await getNoticeList();
            if (noticeListData) {
              setNoticeList(noticeListData);
              setIsItem(true);
            //   const map = new Map(Object.entries(noticeListData));
            //   console.log(map)
            console.log(noticeListData)
              return noticeListData
            } else {
              // Handle the case where noticeListData is undefined
              console.log('No data');
            }
          } catch (error) {
            console.error(error);
          }
        };
        const key = Object.entries(fetchNoticeData);
    const noticeData = useQuery(['notice',key || ''],()=> getNoticeList(key),{
        
    })
}