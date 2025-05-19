import "./css/ChasingPage.css"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import a0001 from './pic/a0001.jpg'; // 根據你的位置調整路徑


const FixStyle = {
    position: "relative"
}

const ChasingBody = ({pNo}) => {


    return (


        <div className="ChasingBody">

           <div style={{ display: "flex", gap: "0.5vw" }}>
            <NavLink to="/SettingPage"><button className="CBIASettingButtom">設定</button></NavLink>
            <NavLink to="/ChasingPage"><button className="CBIAFollowButtom">追蹤商品</button></NavLink>
           </div>

           <hr className="Chr-line" />

           <div className="CBInputArea">
            <img
              src={a0001}
              alt="商品圖片"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
            <button
              className="CBIAUnfollowButtom"
              style={{
                position: "absolute",
                bottom: "0.5vw",
                right: "0.5vw"
              }}
            >
              取消追蹤
            </button>
          </div>
          
        </div>
      );
    };

  

export default ChasingBody