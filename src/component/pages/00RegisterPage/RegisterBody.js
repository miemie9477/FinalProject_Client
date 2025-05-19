import "./css/RegisterPage.css"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FixStyle = {
    position: "relative"
}

const RegisterBody = () => {
    return(
        <div className="RegisterBody">
            <div className="RBTitle">註冊帳號</div>
            <div className="RBInputArea">

                <div className="RBIArow">
                    <div className="RBIATitle">帳號</div>
                    <div className="RBIAtext"><input type="text" placeholder="請輸入帳號名稱"/></div>
                </div>

                <div className="RBIArow">
                    <div className="RBIATitle">用戶名稱</div>
                    <div className="RBIAtext"><input type="text" placeholder="請輸入用戶名稱"/></div>
                </div>

                <div className="RBIArow">
                    <div className="RBIATitle">性別</div>
                    <div className="RBIAtext">
                        <select>
                            <option value="" disabled selected>請選擇性別</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                            <option value="other">其他</option>
                        </select>
                    </div>
                </div>
     
                
                <div className="RBIArow">
                    <div className="RBIATitle">生日</div>
                    <div className="RBIAtext"><input type="text" placeholder="選擇年分、日期"/></div>
                </div>

                <div className="RBIArow">
                    <div className="RBIATitle">電話</div>
                    <div className="RBIAtext"><input type="text" placeholder="請輸入電話"/></div>
                </div> 

                <div className="RBIArow">
                    <div className="RBIATitle">電子郵件</div>
                    <div className="RBIAtext"><input type="text" placeholder="請輸入電子郵件"/></div>
                </div> 

                <div className="RBIArow">
                    <div className="RBIATitle">密碼</div>
                    <div className="RBIAtext"><input type="text" placeholder="請輸入密碼"/></div>
                </div> 

                <div className="RBIArow">
                    <div className="RBIATitle">密碼確認</div>
                    <div className="RBIAtext"><input type="text" placeholder="請再次輸入密碼"/></div>
                </div> 

                <div style={{display:"flex"}}>
                    <button className="RBIAConfirmButtom">確認</button>
                </div>
            </div>
        </div>
    );
}
  

export default RegisterBody