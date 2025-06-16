// src/components/frame/TopBarText.js
import "./css/frame.css";
import logo from "./pic/logo.png";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'; 
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { LoginContext } from "../../ContextAPI"; 
import axios from "axios";
import { useForm } from 'react-hook-form';
import { IoIosArrowDropdownCircle } from "react-icons/io";

const ScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight - 1, behavior: "smooth" });
    return null;
};


// 新增一個用於 URL 參數的映射，使用簡潔的英文或無特殊字元的鍵
const categoryMapForURL = {
    "全部商品": "all",
    "臉部彩妝": "face_makeup",
    "眼眉彩妝": "eye_makeup",
    "唇部彩妝": "lip_makeup",
    "卸妝": "cleansing",
    "臉部保養": "face_care"
};


const TopBarText = () => {
    const { login, setLogin } = useContext(LoginContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setLogin(1); 
            console.log("偵測到 Token，登入狀態設定為：已登入");
        } else {
            setLogin(0);
            console.log("未偵測到 Token，登入狀態設定為：未登入");
        }
    }, [setLogin]);
 
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLogin(0);
        alert("您已成功登出。");
        navigate('/');
    };

    const LoginIdentity = () => {
        if(login === 0) {
            return <NavLink to="/LoginPage"><Button variant="light">登入</Button></NavLink>;
        }
        if(login === 1) {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="TopBarDropdownToggle">
                        帳戶資訊
                        <IoIosArrowDropdownCircle/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="TopBarDropdownMenu">
                        <Dropdown.Item as={NavLink} to="/SettingPage" className="TopBarDropdownItem">個人資料設定</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/ChasingPage" className="TopBarDropdownItem">收藏庫</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} className="TopBarDropdownItem">登出</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            );
        }
    };

    const onSubmit = (data) => { 
        console.log("搜尋關鍵字:", data.TBinputSearchBox);
        // 關鍵字搜尋保持不變，因為關鍵字本身就可能包含特殊字元，encodeURIComponent 是必須的
        navigate(`/SearchResultPage?searchType=keyword&keyword=${encodeURIComponent(data.TBinputSearchBox)}`);
    };
    
    return(
        <>
            <div className="TopBarListCss">
                <div className="TopBarTextLeftCss">
                    <ul>
                        <li><NavLink to="/"><img src={logo} alt="logo" className="TopLogo"/></NavLink></li>
                        <li style={{padding: "0.8vw 0 0.8vw 1.5vw", backgroundColor: "white", borderRadius:"0.8vw", width:"28vw", display:"flex", justifyContent:"space-between",alignItems: "center"}}>
                            <form name="searchbox" onSubmit={handleSubmit(onSubmit)} className="TBSearchBoxForm">
                                <div className="TBSearchBox">
                                    <input type="text" placeholder="搜尋您想要的商品、品牌..."
                                    {...register("TBinputSearchBox", {required: true})} />
                                </div>
                                <div style={{paddingRight:"2vw"}}><button type="submit"><CiSearch style={{fontSize:"1.25vw"}}/></button></div>
                            </form>
                        </li>
                    </ul>
                </div>
                <div className="TopBarTextRightCss">
                    <div className="RightCss">
                        <NavLink to="/AboutUsPage">關於我們</NavLink>
                    </div>
                    <div className="RightCss">|</div>
                    <div className="RightCss">
                        <button onClick={ScrollToBottom}>聯絡我們</button>
                    </div>
                    <div className="RightCss">|</div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">IG</NavLink> 
                    </div>
                    <div className="RightCss">|</div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">FB</NavLink> 
                    </div>
                    <div className="RightCss">|</div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">Line</NavLink> 
                    </div>
                    <div className="CartCss">
                        {LoginIdentity()}
                    </div>
                </div>
            </div>
            <div className="TopBarCategory">
                <div className="TBCList">
                    {/* 使用 categoryMapForURL 來獲取 URL 友好的分類值 */}
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["全部商品"]}`}>
                            全部商品
                        </NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["臉部彩妝"]}`}>
                            臉部彩妝
                        </NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["眼眉彩妝"]}`}>
                            眼眉彩妝
                        </NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["唇部彩妝"]}`}>
                            唇部彩妝
                        </NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["卸妝"]}`}>
                            卸妝
                        </NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to={`/SearchResultPage?searchType=category&category=${categoryMapForURL["臉部保養"]}`}>
                            臉部保養
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBarText;