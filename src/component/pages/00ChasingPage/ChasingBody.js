import "./css/ChasingPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import ex1 from './pic/ex1.png'; // 根據你的位置調整路徑
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ChasingBody = () => {

  const navigate = useNavigate();
    const [trackList, setTrackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 獲取追蹤列表的邏輯 (不變)
    const fetchTrackList = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        const url = `${process.env.REACT_APP_API_URL}/clientpage/trackList`;

        if (!token) {
            alert("請先登入以查看追蹤商品。");
            navigate('/LoginPage');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("追蹤商品列表:", response.data);
            setTrackList(response.data.results || []);
        } catch (error) {
            console.error("取得追蹤商品列表失敗:", error);
            setError("無法載入追蹤商品列表，請稍後再試。");

            if (error.response) {
                if (error.response.status === 401) {
                    alert("您的登入已過期，請重新登入。");
                    localStorage.removeItem('accessToken');
                    navigate('/LoginPage');
                } else if (error.response.data && error.response.data.error) {
                    alert(`取得追蹤商品列表失敗: ${error.response.data.error}`);
                } else {
                    alert(`取得追蹤商品列表失敗: ${error.response.status} - ${error.response.statusText}`);
                }
            } else if (error.request) {
                alert("網路錯誤，請檢查您的連線。");
            } else {
                alert(`請求設定錯誤或未知錯誤: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchTrackList();
    }, [fetchTrackList]);


    // handleToggleTrack - 用於切換 (新增/取消) 追蹤狀態
    // 這個函式會呼叫您提供的 POST /clientpage/track API
    const handleToggleTrack = async (pId) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert("請先登入以操作追蹤狀態。");
            navigate('/LoginPage');
            return;
        }

        const toggleUrl = `${process.env.REACT_APP_API_URL}/clientpage/track`; // 呼叫 POST /clientpage/track

        try {
            const response = await axios.post(toggleUrl, { pId: pId }, { // 傳遞 pId 在請求體中
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            
            // 根據後端返回的 message 或 status 判斷是新增還是取消
            alert(`${response.data.message || '操作成功'}: ${pId}`);
            console.log("追蹤狀態切換成功響應:", response.data);
            
            // 操作成功後，重新獲取列表，更新 UI
            fetchTrackList(); 

        } catch (error) {
            console.error("追蹤狀態切換失敗:", error);
            alert(`追蹤狀態切換失敗: ${error.response?.data?.message || error.response?.data?.error || error.message}`);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/LoginPage');
            }
        }
    };


    if (loading) {
        return (
            <div className="ChasingBody">
                <div className="loading-message">載入中，請稍候...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ChasingBody">
                <div className="error-message">{error}</div>
            </div>
        );
    }

  return (
    <div className="ChasingBody">
      <div style={{ display: "flex", gap: "0.5vw" }}>
        <NavLink to="/SettingPage">
          <button className="CBIASettingButtom">設定</button>
        </NavLink>
        <NavLink to="/ChasingPage">
          <button className="CBIAFollowButtom">追蹤商品</button>
        </NavLink>
      </div>

      <hr className="Chr-line" />

      <div className="CBInputArea">
            {/* 确保这里是 .map 循环，且按钮在每个 product-card 内部 */}
            {trackList.length > 0 ? (
                trackList.map((product) => (
                    <div className="product-card" key={product.pId}>
                        {/* 商品圖片 */}
                        <img src={product.imageUrl || ex1} alt={product.pName || "商品圖片"} className="product-image" />

                        
                        <div className="product-info">
                            <div className="product-brand">{product.brand || '未知品牌'}</div>
                            <div className="product-name">{product.pName || '未知商品'}</div>
                            <div className="product-price">
                                <span className="current-price">目前價格: ${product.price ? product.price.toFixed(2) : 'N/A'}</span>
                                {/* 如果有原價/特價，可以在這裡添加 */}
                                {/* <span className="original-price">原價 $1000</span> */}
                                {/* <span className="special-price">特價 $799</span> */}
                            </div>
                            {/* 如果有評分，可以在這裡添加 */}
                            {/* <div className="product-rating">⭐ 4.5</div> */}
                        </div>
                        <button
                            className="CBIAUnfollowButtom"
                            onClick={() => handleToggleTrack(product.pId)}
                        >
                            取消追蹤
                        </button>
                    </div>
                ))
            ) : (
                // 如果沒有追蹤商品，顯示提示訊息
                <div className="no-tracking-data">目前沒有追蹤任何商品。</div>
            )}
        </div>
    </div>
  );
};

export default ChasingBody;
