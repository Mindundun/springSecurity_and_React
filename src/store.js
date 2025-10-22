import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

// 스토어 구성
const store = configureStore({

    reducer: {
        'loginSlice': loginSlice


    }

});

export default store;