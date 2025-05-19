import "./css/SettingPage.css"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const FixStyle = {
    position: "relative"
}

const SettingBody = ({pNo}) => {


    return (


        <div className="SettingBody">

           <div style={{ display: "flex", gap: "0.5vw" }}>
            <NavLink to="/SettingPage"><button className="SBIASettingButtom">設定</button></NavLink>
            <NavLink to="/ChasingPage"><button className="SBIAFollowButtom">追蹤商品</button></NavLink>
           </div>

           <hr className="Shr-line" />

            <div className="SBInputArea">
            <div className="SBIArow">
              <div className="SBIATitle">帳號</div>
              <div className="SBIAtext">
                <input type="text" placeholder="請輸入帳號名稱" />
              </div>
              <div style={{ display: "flex" }}>
                <button className="SBIAModifyButtom">修改</button>
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">密碼</div>
              <div className="SBIAtext">
                <input type="password" placeholder="請輸入密碼" />
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">用戶名稱</div>
              <div className="SBIAtext">
                <input type="text" placeholder="請輸入用戶名稱" />
              </div>
              <div style={{ display: "flex" }}>
                <button className="SBIAModifyButtom">修改</button>
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">性別</div>
              <div className="SBIAtext">
                <select>
                  <option value="" disabled selected>
                    請選擇性別
                  </option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">生日</div>
              <div className="SBIAtext">
                <input type="text" placeholder="請輸入生日（EX: 1999/01/01）" />
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">電話</div>
              <div className="SBIAtext">
                <input type="text" placeholder="請輸入電話" />
              </div>
              <div style={{ display: "flex" }}>
                <button className="SBIAModifyButtom">修改</button>
              </div>
            </div>
    
            <div className="SBIArow">
              <div className="SBIATitle">電子郵件</div>
              <div className="SBIAtext">
                <input type="text" placeholder="請輸入電子郵件" />
              </div>
              <div style={{ display: "flex" }}>
                <button className="SBIAModifyButtom">修改</button>
              </div>
            </div>
    
          </div>
        </div>
      );
    };

  

export default SettingBody