import { useEffect, useState } from "react";
import { getItems } from "../api/itemApi";
import { createSearchParams, useNavigate } from "react-router-dom";

function Item() {

    const [ items, setItems ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        getItems()
            .then((data) => {
                console.log('data : ', data);
                setItems(data);
            })
            .catch((ex) => {
                const errorMsg = ex.response.data.error; // REQUIRED_LOGIN

                const searchParams = createSearchParams({error: errorMsg}).toString();

                if (errorMsg == "REQUIRED_LOGIN") {

                    alert("You must Login.");
                    navigate({pathname: '/login', search: searchParams});

                }
            })
    }, [])

    return (
        <>
            <h1>상품 목록 조회</h1>

            {
                items && items.map((item) => {
                    return <div key={item.id}>
                        <span style={{margin:'2px'}}>{item.id}</span>
                        <span style={{margin:'2px'}}>{item.name}</span>

                    </div>
                })
            }
        </>
    )
}

export default Item;