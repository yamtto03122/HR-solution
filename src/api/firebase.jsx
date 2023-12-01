// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, get, set, getDatabase, remove } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL,
    storageBucket : process.env.REACT_APP_STORAGEBUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);


//관리자 계정
async function adminUser(){

}


// 구글로그인

export async function login(){
    try{
        const loginPopup = await signInWithPopup(auth, provider);
        const user = loginPopup.user;
        console.log(user);
        return user;
    }catch(error){
        console.error(error);
    }
}

//로그인 시 자동 로그인 현상 수정
provider.setCustomParameters({
    prompt : 'select_account'
})


// 이메일 회원가입 저장
export async function joinEmail(email, password){
    const auth = getAuth(); //저장할 사용자 인증 폼을 불러옴
    try{
        const userCradit = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCradit.user;
        return user
    }catch(error){
        console.error(error);
    }
}

// 이메일 로그인 정보 받아오기
export async function emailLogin(email, password){
    try{
        const userCradit = await signInWithEmailAndPassword(auth, email, password);
        return userCradit.user
    }catch(error){
        console.error(error);
    }
}


// 로그인 정보를 유지
export async function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            try{
                const updateUser = await adminUser(user);
                callback(updateUser);
            }catch(error){
                console.error(error);
            }
        }else{
            callback(null);
        }
    })
}