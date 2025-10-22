import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import Item from './component/Item'
import Login from './component/Login'
import Logout from './component/Logout'

function App() {

    return (
        <>  
            <Link to={'/'}>홈</Link>&nbsp;&nbsp;&nbsp;
            <Link to={'/item'}>상품조회</Link>&nbsp;&nbsp;&nbsp;
            <Link to={'/login'}>로그인</Link>&nbsp;&nbsp;&nbsp;
            <Link to={'/logout'}>로그아웃</Link>

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
