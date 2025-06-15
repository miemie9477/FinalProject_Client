import "./css/frame.css"
import logo from "./pic/logo.png"
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { useContext } from 'react';
import { LoginContext } from "../../ContextAPI";
import { SearchdataContext } from "../../ContextAPI";
import axios from "axios";
import { useForm } from 'react-hook-form';


const ScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight - 1, behavior: "smooth" });

    return null;
};
const categoryMap = {
    "全部商品": "all", // 假設 "全部商品" 對應後端查詢所有商品，或表示不傳 category 參數
    "臉部彩妝": "化妝品_臉部彩妝",
    "眼眉彩妝": "化妝品_眼眉彩妝_眼影", // **請檢查資料庫實際值**
    "唇部彩妝": "化妝品_唇部彩妝_唇膏", // **請檢查資料庫實際值**
    "卸妝": "臉部保養_卸妝_卸妝油&乳&水",
    "臉部保養": "臉部保養_保養",
    "類別五": "your_category_five_backend_value" // **重要：請替換成您資料庫中 '類別五' 的實際值**
};
const TopBarText = () => {

    const { login, setLogin } = useContext(LoginContext);
    const { Searchdata, setSearchdata } = useContext(SearchdataContext);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();



    const navigate = useNavigate();

    const LoginIdentity = () =>
    {
        if(login === 0) return(
            <NavLink to="/LoginPage"><Button variant="light">登入</Button></NavLink>
        )
        if(login === 1) return(
            
            <NavLink to="/SettingPage"><Button variant="light">個人資料</Button></NavLink>
        )
    }

    const Test_setLogin = () =>
    {
        if(login === 0) setLogin(1)
        if(login === 1) setLogin(0)
    }

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
                if(response.status === 401){
                    alert("找不到相關商品")
                }
                
            }
        ).catch(
            error =>{
                console.log("error", error);
                // console.log(error.response.data.message);
                if(error.response && error.response.status === 404 && error.response.data.message == "找不到符合條件的商品"){
                    alert("找不到相關商品")
                }
                else
                {
                    throw error;
                }
                
                // alert("伺服器崩潰，等待回應");
                
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
            // 如果是 "all" 或沒有 category，就請求所有商品，後端會處理
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
                setSearchdata([]); // 錯誤時也清空 Context
                alert("載入分類商品失敗，請稍後再試。");
            });
    }, [setSearchdata]); // useCallback 的依賴項，確保 setSearchdata 穩定

    const handleCategoryClick = (categoryName) => {
        const backendCategory = categoryMap[categoryName];
        
        if (backendCategory) {
            fetchCategoryProducts(backendCategory); // 直接呼叫 API 請求函式
            
        } else {
            console.warn(`未找到類別 "${categoryName}" 對應的後端值。`);
            setSearchdata([]); // 清空 Context 中的搜尋資料
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
                    <div className="RightCss">
                        |
                        
                    </div>
                    <div className="RightCss">
                        <button onClick={ScrollToBottom}>聯絡我們</button>
                        
                    </div>
                    <div className="RightCss">
                        |
                        
                    </div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">IG</NavLink> 
                        
                    </div>
                    <div className="RightCss">
                        |
                        
                    </div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">FB</NavLink> 
                        
                    </div>
                    <div className="RightCss">
                        |
                        
                    </div>
                    <div className="RightCss">
                        <NavLink to="/LoginPage">Line</NavLink> 
                        
                    </div>
                    <div className="CartCss">
                        {LoginIdentity()}

                        {/* <NavLink to="/RegisterPage"><Button variant="light">
                            登入 / 註冊
                        </Button></NavLink> */}
                    </div>

                    {/* <button onClick={Test_setLogin}> ChangeLogin，{login} </button> */}
                    
                </div>
            </div>
            <div className="TopBarCategory">
                <div className="TBCList">
                    {/* 將 NavLink 的 to 屬性改為 "#"，並添加 onClick 事件 */}
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



export default TopBarText