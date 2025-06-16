import "./css/frame.css"
import logo from "./pic/logo.png"
import Button from 'react-bootstrap/Button';
// 引入 Dropdown 相關組件
import Dropdown from 'react-bootstrap/Dropdown'; 
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { useContext } from 'react';
import { LoginContext } from "../../ContextAPI"; 
import { SearchdataContext } from "../../ContextAPI"; 
import axios from "axios";
import { useForm } from 'react-hook-form';
import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const ScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight - 1, behavior: "smooth" });
    return null;
};

const categoryMap = {
    "全部商品": "all",
    "臉部彩妝": "化妝品_臉部彩妝",
    "眼眉彩妝": "化妝品_眼眉彩妝_眼影", // 請檢查資料庫實際值
    "唇部彩妝": "化妝品_唇部彩妝_唇膏", // 請檢查資料庫實際值
    "卸妝": "臉部保養_卸妝_卸妝油&乳&水",
    "臉部保養": "臉部保養_保養"
};

const TopBarText = () => {
    const { login, setLogin } = useContext(LoginContext);
    const { Searchdata, setSearchdata } = useContext(SearchdataContext);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const navigate = useNavigate();

    // 在組件載入時檢查 localStorage 中的 Token
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setLogin(1); 
            console.log("偵測到 Token，登入狀態設定為：已登入");
        } 
        else {
            setLogin(0);
            console.log("未偵測到 Token，登入狀態設定為：未登入");
        }
    }, [setLogin]); 
 
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // 移除 access token
        localStorage.removeItem('refreshToken'); // 如果有 refresh token 也移除
        setLogin(0); // 更新登入狀態為未登入
        alert("您已成功登出。"); // 給用戶提示
        navigate('/'); // 導向首頁或登入頁
    };

    const LoginIdentity = () =>
    {
        if(login === 0) return(
            <NavLink to="/LoginPage"><Button variant="light">登入</Button></NavLink>
        )
        if(login === 1) return(
            // 已登入時顯示下拉式選單
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="TopBarDropdownToggle">
                    帳戶資訊
                    <IoIosArrowDropdownCircle/>
                </Dropdown.Toggle>

                <Dropdown.Menu className="TopBarDropdownMenu">
                    <Dropdown.Item as={NavLink} to="/SettingPage" className="TopBarDropdownItem">個人資料設定</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/ChasingPage" className="TopBarDropdownItem">收藏庫</Dropdown.Item> {/* 新增收藏庫連結 */}
                    <Dropdown.Item onClick={handleLogout} className="TopBarDropdownItem">登出</Dropdown.Item> {/* 登出按鈕 */}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    // Test_setLogin 函式（如果仍用於測試）
    

    const onSubmit = (data) => { 
        console.log(data);
        const url = `${process.env.REACT_APP_API_URL}/frame/search`;
        const info = {
            "keyword": data.TBinputSearchBox
        }
        console.log("url:", url)
        console.log("info:", info)
        axios.post(url, info)
        .then(
            response=>{
                console.log("Status Code:", response.status);
                console.log("data:", response.data.results)             
                if(response.status === 200){
                    setSearchdata(response.data.results)
                }
                if(response.status === 404){ 
                    alert("找不到相關商品")
                }
            }
        ).catch(
            error =>{
                console.log("error", error);
                if(error.response && error.response.status === 404 && error.response.data.message === "找不到符合條件的商品"){
                    alert("找不到相關商品")
                }
                else
                {
                    console.error("搜尋時發生未預期錯誤:", error); 
                    alert("搜尋時發生錯誤，請稍後再試。"); 
                }
            }
        ).finally(() => {
            navigate('/SearchResultPage') 
        })   
    }
    
    const fetchCategoryProducts = useCallback((backendCategory) => {
        let apiUrl = `${process.env.REACT_APP_API_URL}/goodpage/product`;
        if (backendCategory && backendCategory !== "all") {
            apiUrl += `?category=${encodeURIComponent(backendCategory)}`;
            console.log(`正在請求類別商品: ${backendCategory}`);
        } else {
            console.log("正在請求全部商品");
        }

        axios.get(apiUrl)
            .then(res => {
                const data = res.data
                console.log("載入分類商品成功:", data.results);
                if (res.data) {
                    setSearchdata(res.data);
                    console.log("分類商品結果已存入 Context:", Searchdata);
                    navigate('/SearchResultPage'); // 導航到搜尋結果頁
                } else {
                    setSearchdata([]); // 沒有結果則清空 Context
                    console.log("該類別下未找到任何商品。");
                }
            })
            .catch(err => {
                console.error("載入分類商品失敗:", err);
                setSearchdata([]); 
                alert("載入分類商品失敗，請稍後再試。");
            });
    }, [setSearchdata, navigate]); 

    const handleCategoryClick = (categoryName) => {
        const backendCategory = categoryMap[categoryName];
        
        if (backendCategory) {
            fetchCategoryProducts(backendCategory);
            
        } else {
            console.warn(`未找到類別 "${categoryName}" 對應的後端值。`);
            setSearchdata([]); 
            navigate("/SearchResultPage"); 
        }
    };

    return(
        <>
            <div className="TopBarListCss">
                <div className="TopBarTextLeftCss">
                    <ul >
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
                        {LoginIdentity()} {/* 這裡會渲染新的下拉選單或登入按鈕 */}
                    </div>

                    {/* 您可以使用這個按鈕來測試登入/登出狀態，實際部署時可能移除 */}
                    {/* <button onClick={Test_setLogin} style={{marginLeft: '10px'}}> ChangeLogin，{login} </button> */}
                    
                </div>
            </div>
            <div className="TopBarCategory">
                <div className="TBCList">
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("全部商品")}>全部商品</NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("臉部彩妝")}>臉部彩妝</NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("眼眉彩妝")}>眼眉彩妝</NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("唇部彩妝")}>唇部彩妝</NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("卸妝")}>卸妝</NavLink>
                    </div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}>
                        <NavLink to="#" onClick={() => handleCategoryClick("臉部保養")}>臉部保養</NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBarText;