import axios from "axios"
import { getCookies, setCookies } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/memberApi"

// JWT 인증 토큰 재 발급 요청(비동기요청 async)
const refreshJWT = async (accessToken, refreshToken) => {

    const host = API_SERVER_HOST;

    const header = {headers: {'Authorization': `Bearer ${accessToken}`}};


    const res = await axios.get(`${host}/api/v1/refresh?refreshToken=${refreshToken}`, header);

    console.log("res---------------------", res);

    return res.data; 

}


// axios 생성
const jwtAxios = axios.create();

// 클라이언트 요청 시 인증된 유저인지 확인하고자 쿠키를 찾아 인증정보 전달
// config : 요청과 관련된 정보
const beforeReq = (config) => {

    // 정보는 쿠키에 담겨있으니 getCookies
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


// 위의 Promis.reject 가 전달된다.
// { response: {data: {error: "REQUIRED_LOGIN"}} }
const requestFail = (error) => {

    console.log('requestFail', error);
    return Promise.reject(error);    

}

// res : 서버에서 응답 된 데이터
const beforeRes = async (res) => {
    console.log('----------------beforeRes.res : ', res);

    const data = res.data;

    // JWTCheckFilter.java(spring) line.84
    if (data && data.error == "ERROR_ACCESS_TOKEN") { // 토큰 만료
        console.log('---------------- call beforeRes : ');
        const member = getCookies("member");

        
        console.log("member cookie:", member);
        console.log("accessToken:", member?.accessToken);
        console.log("refreshToken:", member?.refreshToken);
        
        console.log("old token", member.accessToken);

        const result = await refreshJWT(member.accessToken, member.refreshToken);

        console.log("new token", result.accessToken);

        console.log("result:!!", result);

        member.accessToken = result.accessToken;
        member.refreshToken = result.refreshToken;

        setCookies("member", JSON.stringify(member), 1); // 1일

        // 재발급된 토큰으로 재요청
        // config : 요청과 관련된 설정
        const originalRequest = res.config;

        // 헤더에 Authorization 영역에 accessToken을 넣음
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);        
    }

    return res;
}


const responseFail = (error) => {
    console.log('call responseFail');

    return Promise.reject(error);
}


// Axios 인터셉터 설정
jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;