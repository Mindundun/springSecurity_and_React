import axios from "axios"
import { getCookies } from "./cookieUtil";

// axios 생성
const jwtAxios = axios.create();

// 클라이언트 요청 시 인증된 유저인지 확인하고자 쿠키를 찾아 인증정보 전달
const beforeReq = (config) => {

    const member = getCookies('member');

    console.log('member : ', member);

    if(!member){
        console.log('Member not found');

        // 만약 인증된 사용자가 아니면 promise에서 reject호출(그 외 pending(대기), fulfiled(이행)상태가 존재)
        
        return Promise.reject({
            response: {data: {error: "REQUIRED_LOGIN"}}
        
        })
    }

    // 객체 구조 분해 할당
    const {accessToken} = member;
    
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;

}



const requestFail = () => {

    console.log('requestFail', error);

    return Promise.reject(error);
    

}
















// Axios 인터셉터 설정
jwtAxios.interceptors.request.use(beforeReq, requestFail);

// jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;