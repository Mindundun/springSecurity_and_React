import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";

function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {

        // logoutSlice 가져와 dispatch 처리
        dispatch(logout());
        navigate('/'); // 로그아웃 성공 시 Home 화면으로 이동

    }

    return (
        <>
            <h1>로그아웃 페이지입니다.</h1>
            <div>
                <button onClick={handleClick}>로그아웃</button>
                
            </div>
        </>
    )
}

export default Logout;