import axios from "axios";

export const API_SERVER_HOST = "http://localhost:9000";

const prefix = `${API_SERVER_HOST}/api/members`;

// 로그인 요청 처리
export const postLogin = async (loginParam) => {

    const header = {headers : {'Content-Type': 'x-www-from-urlencoded'}};

    const form = new FormData();
    form.append("email", loginParam.email);
    form.append("password", loginParam.password);

    const res = await axios.post(`${prefix}/login`, form, header);

    console.log('res : ', res);

    return res.data;
    

}