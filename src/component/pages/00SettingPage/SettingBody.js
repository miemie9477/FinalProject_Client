import "./css/SettingPage.css"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

/* handle click, call fetchClientData again to rendering new client data*/


const FixStyle = {
    position: "relative"
}

const SettingBody = () => {

  const [clientData, setClientData] = useState({
        account: '',
        cName: '', // 用戶名稱
        sex: '',
        birthday: '',
        phone: '',
        email: ''
    });

  const fetchClientData = () => {
    // 1. 從 localStorage 中取出 Token
    const token = localStorage.getItem('accessToken'); 

    // 檢查 Token 是否存在
    if (!token) {
        console.warn("未找到 Token，無法發送請求。請確認已登入。");
        // navigate('/LoginPage'); 
        return; // 沒有 Token 就不發送請求
    }

    const url = `${process.env.REACT_APP_API_URL}/clientpage/client`;

    // 2. 在這裡設定 headers 物件
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}` 
            // 使用 Bearer 前綴，這是 JWT 的標準格式
        }
    })
    .then((response) => {
      const fetchedData = response.data.results; 
            console.log("成功獲取 API 資料:", fetchedData);
            
            // 2. 將獲取的資料設定到 state 中
            setClientData({
                account: fetchedData.account || '',
                cName: fetchedData.cName || '',
                sex: fetchedData.sex || '',
                birthday: fetchedData.birthday || '',
                phone: fetchedData.phone || '',
                email: fetchedData.email || ''
            });
        
    })
    .catch((error) => {
        console.error("拿API資料失敗", error);

        if (error.response) {
            // 伺服器有回應，但狀態碼是錯誤的
            console.error("錯誤狀態碼:", error.response.status);
            console.error("錯誤訊息:", error.response.data);

            if (error.response.status === 401) {
                alert("您的登入已過期，請重新登入。");
                // 導航到登入頁面並清除無效的 Token
                // localStorage.removeItem('accessToken');
                // navigate('/LoginPage');
            } else if (error.response.status === 403) {
                alert("您沒有權限訪問此資源。");
            } else {
                alert(`API 請求失敗: ${error.response.status} - ${error.response.data.message || '未知錯誤'}`);
            }
        } else if (error.request) {
            // 請求已發出但沒有收到回應（例如網路問題）
            console.error("沒有收到回應:", error.request);
            alert("網路錯誤，請檢查您的連線。");
        } else {
            // 在設定請求時發生了某些錯誤
            console.error("請求設定錯誤:", error.message);
            alert("請求發生未知錯誤。");
        }
    });
  };

  useEffect(() => {
      fetchClientData();
  }, []);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


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
                {/* 帳號是 readOnly，直接綁定 value */}
                <input 
                    type="text" 
                    placeholder="您的帳號名稱" 
                    readOnly 
                    value={clientData.account} 
                    name="account" // 添加 name 屬性，方便未來處理更新
                />
            </div>
          </div>
  
          <div className="SBIArow">
            <div className="SBIATitle">用戶名稱</div>
            <div className="SBIAtext">
              <input 
                  type="text" 
                  placeholder="請輸入用戶名稱" 
                  value={clientData.cName} 
                  onChange={handleChange}
                  name="cName"
              />
            </div>
          </div>
  
          <div className="SBIArow">
            <div className="SBIATitle">性別</div>
            <div className="SBIAtext">
              <select 
                  value={clientData.sex} 
                  onChange={handleChange}
                  name="sex"
              >
                  <option value="" disabled>請選擇性別</option>
                  <option value="男">男</option> {/* 注意這裡的值要與後端傳回的值匹配 */}
                  <option value="女">女</option>
                  <option value="其他">其他</option>
              </select>
            </div>
          </div>
  
          <div className="SBIArow">
            <div className="SBIATitle">生日</div>
            <div className="SBIAtext">
              <input 
                  type="text" 
                  placeholder="您的生日" 
                  readOnly 
                  value={clientData.birthday} 
                  name="birthday"
              />
            </div>
          </div>
  
          <div className="SBIArow">
            <div className="SBIATitle">電話</div>
            <div className="SBIAtext">
              <input 
                  type="text" 
                  placeholder="請輸入電話" 
                  value={clientData.phone} 
                  onChange={handleChange}
                  name="phone"
              />
            </div>
          </div>
  
          <div className="SBIArow">
            <div className="SBIATitle">電子郵件</div>
            <div className="SBIAtext">
              <input 
                  type="text" 
                  placeholder="請輸入電子郵件" 
                  value={clientData.email} 
                  onChange={handleChange}
                  name="email"
              />
            </div>
            <div style={{ display: "flex" }}>
              <button className="SBIAModifyButtom">一鍵修改</button>
            </div>
          </div>
        </div>
      
          <div className="SBIArowtwo">
            <div className="SBIATitletwo">密碼</div>
            <div className="SBIAtexttwo">
              <input type="password" placeholder="請輸入密碼" />
            </div>
          </div>
          <div className="SBIArowtwo">
            <div className="SBIATitletwo">確認密碼</div>
            <div className="SBIAtexttwo">
              <input type="password" placeholder="請輸入密碼" />
            </div>
          </div>
            <div style={{ display: "flex" }}>
              <button className="SBIAModifyButtomtwo">修改密碼</button>
            </div>

      </div>
    );
  };

  

export default SettingBody