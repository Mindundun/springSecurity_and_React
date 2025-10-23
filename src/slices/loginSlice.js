import { createSlice } from "@reduxjs/toolkit";
import { setCookies } from "../util/cookieUtil";

const initialState = {
    email: ''
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers:{
        login: (state, action) => {
            console.log("action : ", action);
            console.log("action.payload : ", action.payload);
            console.log("action.payload.email : ", action.payload.email);
            // 쿠키에 사용자 정보를 저장한다.
            setCookies("member", JSON.stringify(action.payload), 1);

            // 쿠키에 사용자 정보를 저장한다.
            // email 상태를 업데이트 한다.
            // email = action.payload.email; 이렇게 처리 불가. 왜냐 상태 정보는 변경할 수 없기에 return 문으로 리턴해야 업데이트 됨.
            return {email: action.payload.email}

        }

    }
});

export const {login} = loginSlice.actions; // 액션 생성자 함수
export default loginSlice.reducer; // 리듀서