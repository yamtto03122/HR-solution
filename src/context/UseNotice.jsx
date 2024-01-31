import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotice, getNoticeList } from "../api/firebase";

export default function UseNotice(){
        
    
  const queryClient = useQueryClient();    
  const deleteNoticeList = useMutation((id)=>deleteNotice(id),{
     onSuccess : () => {
         queryClient.invalidateQueries(['notice'])
     }
 })

 return {deleteNoticeList}
}