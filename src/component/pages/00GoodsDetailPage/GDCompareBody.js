import "./css/GDCompare.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"; // 導入 useEffect 和 useState

const FixStyle = {
    position: "relative"
};

const GDCompareBody = () => {
    const location = useLocation();
    
    // 1. 建立一個 state 來儲存價格數據
    const [priceData, setPriceData] = useState([]); // 初始值為空陣列

    // 2. 將 API 請求放在 useEffect 中
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pId = queryParams.get('pId'); 
        
        // 確保 pId 存在才發送請求
        if (pId) {
            axios.get(`${process.env.REACT_APP_API_URL}/gooddetail/priceNow/${pId}`)
                .then(response => {
                    if (response.status === 200) {
                        const results = response.data.results; // 假設數據在 response.data.results
                        console.log("價格數據:", results);
                        // 3. 更新 priceData 狀態
                        setPriceData(results); 
                    } else {
                        console.error("無法獲取價格數據，狀態碼:", response.status);
                    }
                })
                .catch(error => {
                    console.error("發生錯誤:", error);
                    // 處理錯誤情況，例如顯示錯誤訊息給用戶
                });
        } else {
            console.warn("URL 中缺少 pId 參數，無法獲取價格數據。");
        }
    }, [location.search]); // 當 location.search 改變時重新觸發 useEffect

    return (
        <div className="GDCompare">
            <hr className="hr"/>
            <div className="GDCompareTitle">通路價格</div>
            <div className="GDCompareArea">
                <table className="GDCompareTable">
                    <thead className="GDCompareThead">
                        <tr>
                            <th className="GDCompareTthFirst">店家名稱</th>
                            <th>特價情況</th>
                            <th className="GDCompareTthLast">價格</th>
                        </tr>
                    </thead>
                    <tbody className="GDCompareBody">
                        {/* 4. 動態渲染表格行 */}
                        {priceData.length > 0 ? (
                            priceData.map((item, index) => (
                                <tr key={index}> {/* 使用 index 作為 key 是可以的，但如果數據項目有唯一ID，建議用ID */}
                                    <td className="GDCompareTtdFirst">{item.store}</td>
                                    <td>{item.storeDiscount}</td>
                                    <td className="GDCompareTtdLast">{item.storePrice}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{textAlign: 'center', padding: '20px' }}>
                                    載入中或暫無價格數據...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GDCompareBody;