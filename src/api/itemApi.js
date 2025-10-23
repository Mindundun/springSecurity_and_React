import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:9000";

const prefix = `${API_SERVER_HOST}/api/v1`;

export const getItems = async () => {

    const res = await jwtAxios.get(`${prefix}/items`);
    console.log("res.data : ", res.data);

    return res.data;

}