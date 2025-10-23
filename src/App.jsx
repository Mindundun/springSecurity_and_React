import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Item from './component/Item'
import Login from './component/Login'
import Logout from './component/Logout'
import { useSelector } from 'react-redux'

function App() {

    const email = useSelector(state => state.loginSlice.email);

    console.log('email : ', email);

    return (
        <>  
            <Link to={'/'}>홈</Link>&nbsp;&nbsp;&nbsp;
            {/* {
                email ? <span style={{margin: '5px'}}><Link to={'/item'}>상품조회</Link></span> : <></>
            } */}
            <span style={{margin: '5px'}}><Link to={'/item'}>상품조회</Link></span>
            {
                email ? <span style={{margin: '5px'}}><Link to={'/logout'}>로그아웃</Link></span>  : <span style={{margin: '5px'}}><Link to={'/login'}>로그인</Link></span> 
            }

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/item" element={<Item />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        
        </>
    )
  
}

export default App
