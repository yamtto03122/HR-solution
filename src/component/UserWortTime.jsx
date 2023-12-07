// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useAuthContext } from "./AuthContext";
// import { updateWorkTime } from "../api/firebase";

// export default function UserWorkTime(){
//     const { uid } = useAuthContext();
//     const queryClient = useQueryClient();
//     console.log(uid)

//     const addWorkTime = useMutation(
//         (recordLap) => updateWorkTime(uid, recordLap),
//         {
//             onSuccess : () => {
//                 queryClient.invalidateQueries(['workTime',uid])
//             }
//         } 
//         )

//     return {addWorkTime}
// }

