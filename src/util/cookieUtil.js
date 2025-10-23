import { Cookies } from "react-cookie";

const cookie = new Cookies();

// 쿠키 생성 : 로그인 시 
export const setCookies = (name, value, days) => {

    const expires = new Date();
    // cookie.setUTCDate(expires.getUTCDate() + days);
    expires.setDate(expires.getDate() + days);
    
    // 모든 요청 경로에 쿠키 정보 포함하여 전달
    cookie.set(name, value, {expires: expires, path: '/'});
}

// 쿠키 정보 조회 : 인증 토큰 확인 시 
export const getCookies = (name) => {
    // 이름으로 처리하기에
    return cookie.get(name);
}


// 쿠키 삭제 : 로그아웃 시 
export const removeCookie = (name, path= '/') => {
    cookie.remove(name, {path:path});
}