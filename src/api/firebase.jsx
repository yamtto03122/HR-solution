// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { ref, get, set, getDatabase, remove, child } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid' //고유 식별자를 생성해주는 패키지
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket : process.env.REACT_APP_STORAGEBUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};

const auth = getAuth(); //파이어베이스에 있는 인증을 초기화해줌
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


// 구글로그인
export async function login(){
    try{ //트라이를 넣는 이유 : 데이터 통신중에 오류가 나는걸 확인하기 위해서
        const loginPopup = await signInWithPopup(auth, provider); //팝업 뜰 때 까지 기다려
        //로그인 함수를 실행시 signInWithPopup이라는 파이어베이스 인증 방법을 실행 ,
        // auth = firebase에 인증 인스턴스, provider = 공급자(실행하는 로그인 방법)
        //구글로그인에서 받은걸 auth가 인스턴스로 사용

        const user = loginPopup.user; //user =  로그인된 상태의 유저
        //위의 코드로 로그인이 성공하는 순간 loginPopup 에는 로그인한 정보가 user라는 변수에 담기게된다.
        console.log(user);

        return user; //로그인된 유저의 정보를 다른 곳에서 참조할 수 있도록 반환함
    }catch(error){
        console.error(error);
    }
}


// 로그인 정보를 유지
export function onUserState(callback){
    return onAuthStateChanged(auth, async(user)=>{
        // onAuthStateChanged = 사용자의 인증 상태 변화를 체크하는 이벤트 리스너 (로그인, 로그아웃)
        if(user){ //if가 없으면 try에서 오류가 뜰 수 있기 때문에유저가 있으면 정보를 넘기고, 아니라면 비워놔라
            try{
                const updateUser = await adminUser(user); //로그인한 사람이 어드민인지 어드민이 아닌지 기다렸다가 실행 구별
                //사용자가 로그인 한 경우 adminUser라는 함수를 실행해서 사용자 권한을 체크
                callback(updateUser); //업데이트 된 사용자 정보를 전달받은 후, 콜백으로 호출
            }catch(error){
                console.error(error);
            }
            //console.log('success');
        }else{ //로그인된 상태가 아니라면
            callback(null); //빈 값으로 보내라
        }
    })
}

//관리자 계정 관리
async function adminUser(user){
    try{
        const snapshot = await get(ref(database, 'admin')); //firebase 안의 database안에 admin폴더를 검색함
        //console.log(snapshot)
        
        if(snapshot.exists()){//snapshot.exists() : snapshot 안에 데이터가 있음을 의미함
            
            const admins = snapshot.val(); //스냅샷 안에 벨류 값을 찾아내라 (admin폴더 안에 데이터 목록들을 검색)
            const isAdmin = admins.includes(user.email); //검색된 admins에 현재 로그인된 사용자의 이메일과 일치하는 이메일이 있는지 확인 (관리자인지 아닌지 확인)
            //console.log(isAdmin)
            return{ ...user, isAdmin } //만든 사이트에 내가 관리자로 로그인했음을 알려준다.
            //원래 사용자 정보와 새 정보와 isAdmin 변수를 새 배열에 추가하여 업데이트 후 반환한다.
        }
        return user;
    }catch(error){
        console.error(error)
    }
}


//구글 로그아웃
export async function logOut(){
    try{
        await signOut(auth); //auth를 초기화 하는 이벤트 (파이어베이스에서 제공하는 signOut 훅을 사용)
    }catch(error){
        console.error(error)
    }
}


//로그인 시 자동 로그인 현상 수정
provider.setCustomParameters({
    prompt : 'select_account'
})


// 이메일 회원가입 저장
export async function joinEmail(email, password, name){
    const auth = getAuth(); //저장할 사용자 인증 폼을 불러옴
    try{
        const userCradit = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCradit.user;
        //const photoURL = await uploadImage(photo); //프로필사진을 firebase storage에 업로드
        await updateProfile(auth.currentUser, {displayName : name, photoURL : 'https://github.com/yamtto03122/HR-solution/assets/134922108/e1969829-2fbb-4e7c-850d-d46f5535449d'});
        return user;
    }catch(error){
        console.error(error);
    }
}

//프로필사진 업로드
// const uploadImage = async (url) => {
//     // url 확인 
//     if (url.startsWith("https")) {
//         // http로 시작하는 경우 업로드 필요 없음
//         return url;
//     }
    
//     // 사진 저장 위한 blob 생성
//     const blob = await new Promise((resolve, reject) => {
//         // image 불러오기 위한 XML 만든다
//         const xhr = new XMLHttpRequest();
//         // imagePicker통해 선택된 사진을 blob형태로 가져온다
//         xhr.open("GET", url, true);
//         xhr.responseType = "blob";
//         // XML 상태 확인
//         xhr.onload = function () {
//         // 성공하면 Promise의 값으로 xhr.response 반환
//         resolve(xhr.response);
//         };
//         xhr.onerror = function () {
//         // 실패하면 Promise의 값으로 Error 반환
//         reject(new TypeError("Network request failed"));
//         };
//         // "GET" 인 경우에는 서버에 데이터를 보낼 필요 없음
//         xhr.send(null);
//     });
   
//     // user정보 가져와서 user별 폴더에 저장
//     const user = auth.currentUser;
//     const storage = getStorage();
//     // storage에 업로드 경로 생성
//     const profileRef = ref(storage, `/profile/${user.uid}/photo.png`);
//     // blob(사진파일)을 경로에 업로드한다
//     await uploadBytes(profileRef, blob, {
//       connectType: "image/png",
//     });
//     blob.close();
   
//     // 업로드한 사진 주소 반환
//     return await getDownloadURL(profileRef);
//   }
  


//파이어베이스에서 이메일 로그인 정보 받아오기
export async function emailLogin(email, password){
    try{
        const userCradit = await signInWithEmailAndPassword(auth, email, password);
        return userCradit.user
    }catch(error){
        console.error(error);
    }
}

//중복 아이디 체크
export async function checkEmail(email){ //이메일만 체크하면 됨
    const database = getDatabase();
    const userRef = ref();
}


// //  출퇴근시간 저장하기

// export async function workRecord(onSubmit, user ){
       
//     const id = user;
    
//         console.log(`${id}/workTime/`)
//         await set(ref(database, `user/${id}/workTime`),onSubmit)
    
// }

//출근 시간
export async function clockIn(user) {
    const db = getDatabase();
    const now = new Date();
    const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const today = new Date();
    const time = today.getHours() + '시 ' + today.getMinutes() + '분';

    const clockInRef = ref(db, `user/${user.displayName}/workTime/${dateKey}/clockIn`);
    set(clockInRef, time);
}

//퇴근 시간
export function clockOut(user) {
    const db = getDatabase();
    const now = new Date();
    const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const today = new Date();
    const nowTime = today.getHours() + '시 ' + today.getMinutes() + '분';

    const clockOutRef = ref(db, `user/${user.displayName}/workTime/${dateKey}/clockOut`);
    set(clockOutRef, nowTime);
}

//데이터베이스에 저장된 시간 가져오기

 export async function getWorkTime(user) {
    const db = ref(getDatabase());
    const now = new Date();
    const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return get(child(db, `user/${user.displayName}/workTime/${dateKey}/clockIn`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val()
        } else {
            console.log("No data available");
            return ''
        }
    })
}

//공지사항 등록하기
export async function createNotice(contents){ //등록버튼 눌렀을때 얘가 실행만 됨
    const db = getDatabase();
    // const now = new Date();
    // const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    console.log(contents);
    const path = `notice/${contents.title}`
    console.log(path);
    set(ref(db, path),contents);

}

//파이어베이스에서 게시글 목록 가져오기
export async function getNoticeList(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `notice/`)).then((snapshot) => {
        if (snapshot.exists()){
            console.log(snapshot.val());
        return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    })
}

// 공지 삭제하기
export async function deleteNotice(contents){
    const db = getDatabase();
    return remove(ref(db, `notice/${contents.title}`));
}

