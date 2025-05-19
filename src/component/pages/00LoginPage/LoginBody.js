import "./css/LoginPage.css"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const FixStyle = {
    position: "relative"
}

const LoginBody = ({pNo}) => {

    // const [productInfo, setProductInfo] = useState([]);

    // useEffect(() =>{
    //     const check = async () =>{
    //         try{
    //             const tId = getCookie('tId');
    //             if(tId === null){
    //                 const checkCart = `${process.env.REACT_APP_API_URL}/setCookie/createTId`;
    //                 const checkCartResponse = await axios.get(checkCart,{ withCredentials: true });
    //                 console.log(checkCartResponse.data);
    //             }
    //             console.log('tId:', tId);

    //             const url = `${process.env.REACT_APP_API_URL}/menu/loadMenu`;
    //             const menuResponse = await axios.get(url, { withCredentials: true })
    //             console.log("get menu:" , menuResponse.data)
    //             setProductInfo(menuResponse.data);
                
    //         }
    //         catch(error){
    //             console.log(error);
    //         }
    //     }
    //     check();
    // }, [])

    // function getCookie(name) {
    //     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    //     if (match) {
    //         return match[2];
    //     }
    //     return null; // 如果沒找到該 cookie，則返回 null
    // }

    return(
        <div className="LoginBody">
            <div className="LBTitle">登入</div>
            <div className="LBInputArea">
                <div className="LBIArow">
                    <div className="LBIATitle">帳號</div>
                    <div className="LBIAtext"><input type="text" placeholder="請輸入帳號名稱"/></div>
                </div>
                <div className="LBIArow">
                    <div className="LBIATitle">密碼</div>
                    <div className="LBIAtext"><input type="text" placeholder="請輸入密碼"/></div>
                </div>
                <div style={{display:"flex"}}>
                    <button className="LBIAConfirmButtom">確認</button>
                </div>
            </div>
        </div>
    );
}
  

export default LoginBody