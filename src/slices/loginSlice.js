import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeCookie, setCookies, getCookies } from "../util/cookieUtil";
import { postLogin } from "../api/memberApi";

const initialState = {
    email: ''
}

const loadMemberCookie = () => {
    // 새로고침 시 쿠키에 저장된 정보를 가져오고자. . 
    const member = getCookies('member');
    return member;
}

// 비동기 액션 생성 함수
export const postLoginAsync = createAsyncThunk("loginSlice/postLoginAsync",
    // 비동기 작업을 처리하는 로직
    async (param) => {
        const res = await postLogin(param);
        console.log("res : ", res);
        
        return res; // Promise 객체
    }
)

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initialState,
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

        },
        logout: (state, action) => {
            console.log("-------------call logout reducer");
            // 쿠키에 사용자 정보 삭제
            removeCookie("member");

            // email 정보 초기화
            return {...initialState};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postLoginAsync.pending, (state, action) => {
            console.log("pending action:", action);            

        })
        .addCase(postLoginAsync.fulfilled, (state, action) => {
            console.log("fulfilled action:", action);
            console.log("fulfilled action.payload:", action.payload); // API 서버 응답 데이터

            if (!action.payload.error){
                setCookies("member",action.payload, 1);
            }
            
            return action.payload; // 리덕스 스토어에 있는 email 상태가 업데이트 된다.

        })
        .addCase(postLoginAsync.rejected, (state, action) => {
            console.log("rejected action:", action);
            

        })
    }


});


export const {login, logout} = loginSlice.actions; // 액션 생성자 함수

export default loginSlice.reducer; // 리듀서