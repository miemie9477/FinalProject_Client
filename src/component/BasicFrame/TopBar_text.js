import "./css/frame.css"
import logo from "./pic/logo.png"
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { CiSearch } from "react-icons/ci";


const ScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight - 1, behavior: "smooth" });

    return null;
};

const TopBarText = () => {

    

    return(
        <>
            <div className="TopBarListCss">
                <div className="TopBarTextLeftCss">
                    <ul >
                        <li><NavLink to="/"><img src={logo} alt="logo" className="TopLogo"/></NavLink></li>
                        <li style={{padding: "0.8vw 0 0.8vw 1.5vw", backgroundColor: "white", borderRadius:"0.8vw", width:"28vw", display:"flex", justifyContent:"space-between",alignItems: "center"}}>
                            <div className="TBSearchBox">
                                <input type="text" placeholder="搜尋您想要的商品、品牌..."/>
                                
                            </div>
                            <div style={{paddingRight:"2vw"}}><button><CiSearch style={{fontSize:"1.25vw"}}/></button></div>
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
                        <NavLink to="/RegisterPage"><Button variant="light">登入 / 註冊</Button></NavLink>
                    </div>
                </div>
            </div>
            <div className="TopBarCategory">
                <div className="TBCList">
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}><NavLink to="/SearchResultPage">全部商品</NavLink></div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}><NavLink to="/SearchResultPage">類別一</NavLink></div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}><NavLink to="/SearchResultPage">類別二</NavLink></div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}><NavLink to="/SearchResultPage">類別三</NavLink></div>
                    <div className="TBCListTypes" style={{paddingRight:"2vw"}}><NavLink to="/SearchResultPage">類別四</NavLink></div>
                    <div className="TBCListTypes"><NavLink to="/SearchResultPage">類別五</NavLink></div>
                </div>
            </div>
        </>
    );
}



export default TopBarText