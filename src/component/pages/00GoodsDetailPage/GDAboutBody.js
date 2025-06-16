import "./css/GDABody.css"
import { useEffect, useState } from "react";
import { ImStarFull } from "react-icons/im";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FixStyle = {
    position: "relative"
}

const GDAboutBody = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pId = queryParams.get('pId'); 

    const images = [
        require('./pic/ex1.png'),
        require('./pic/ex2.png'),
        require('./pic/ex1.png'),
        require('./pic/ex2.png'),
        require('./pic/ex1.png'),
    ];

    const [mainImage, setMainImage] = useState(images[0]);
    const [startIndex, setStartIndex] = useState(0);
    const MAX_VISIBLE = 3;

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    }
    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, images.length - MAX_VISIBLE));
    };

    const visibleImages = images.slice(startIndex, startIndex + MAX_VISIBLE)

    const [productData, setProductData] = useState({
        brand: '',
        pName: '',
        price: '',
        review: '', 
    });

    const [isTracking, setIsTracking] = useState(false); 

    // --- useEffect 區塊 ---

    // Effect 1: 載入商品詳細資訊 (不變)
    useEffect(() => {
        if (!pId) return; 

        axios.get(`${process.env.REACT_APP_API_URL}/gooddetail/product/${pId}`)
            .then((response) => {
                console.log("商品詳細數據:", response.data);
                setProductData(response.data.results || {}); 
            })
            .catch((error) => {
                console.error("拿取商品詳細資料失敗", error);
            });
    }, [pId]); 

    // Effect 2: 發送點擊次數更新請求 (不變)
    useEffect(() => {
        if (!pId) return; 

        axios.post(`${process.env.REACT_APP_API_URL}/gooddetail/click/${pId}`)
            .then((response) => {
                console.log("點擊數更新成功", response.data);
            })
            .catch((error) => {
                console.error("點擊數更新失敗", error);
            });
    }, [pId]); 

    // Effect 3: 檢查商品初始追蹤狀態 (新增判斷是否登入)
    useEffect(() => {
        const token = localStorage.getItem('accessToken'); 
        
        // 只有在 pId 存在且 Token 存在時才發送請求
        if (!pId) {
            console.warn("缺少 pId，無法檢查商品追蹤狀態。");
            return;
        }
        if (!token) {
            console.info("用戶未登入，不檢查商品追蹤狀態。");
            setIsTracking(false); // 確保未登入時按鈕顯示為「加入關注」
            return;
        }

        axios.post(
            `${process.env.REACT_APP_API_URL}/gooddetail/track/id`,
            { pId: pId }, 
            { headers: { 'Authorization': `Bearer ${token}` } } 
        )
        .then(response => {
            if (response.status === 200) {
                setIsTracking(response.data.status === 1);
                console.log("商品初始追蹤狀態:", response.data.message);
            }
        })
        .catch(error => {
            console.error("檢查初始追蹤狀態失敗:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    alert("您的登入已過期，請重新登入。");
                    localStorage.removeItem('accessToken'); // 清除過期 Token
                    // navigate('/LoginPage'); // 導向登入頁面
                } else {
                    console.log(`無法檢查商品關注狀態: ${error.response.data.message || '未知錯誤'}`);
                }
            } else {
                console.log("網路錯誤，無法檢查商品關注狀態。");
            }
        });
    }, [pId]); 

    // --- 處理函式 ---

    // 處理「加入關注」/「取消關注」按鈕點擊 (新增判斷是否登入)
    const handleToggleTrack = () => {
        const token = localStorage.getItem('accessToken');
        
        // 如果沒有 Token (未登入)，則提示用戶登入
        if (!token) {
            alert("請先登入以使用此功能。");
            // 可以選擇在此處導向登入頁面
            // navigate('/LoginPage');
            return; 
        }

        // 如果已登入且 pId 存在，則正常發送請求
        if (!pId) {
            console.warn("缺少 pId，無法切換追蹤狀態。");
            return;
        }

        axios.post(
            `${process.env.REACT_APP_API_URL}/gooddetail/track`,
            { pId: pId }, 
            { headers: { 'Authorization': `Bearer ${token}` } } 
        )
        .then(response => {
            if (response.status === 200) {
                setIsTracking(response.data.status === 1);
                alert(response.data.message); 
                console.log("追蹤狀態切換成功:", response.data);
            }
        })
        .catch(error => {
            console.error("切換追蹤狀態失敗:", error);
            if (error.response) {
                console.error("錯誤回應數據:", error.response.data);
                if (error.response.status === 401) {
                    alert("您的登入已過期，請重新登入。");
                    localStorage.removeItem('accessToken');
                    // navigate('/LoginPage');
                } else if (error.response.status === 404) {
                    console.log("商品不存在，無法操作關注。");
                } else {
                    console.log(`操作失敗: ${error.response.data.message || '未知錯誤'}`);
                }
            } else {
                console.log("網路錯誤，無法切換關注狀態。");
            }
        });
    };

    return (
        <div className="GDAbout">
            <div className="GDAPic">
                <img className="GoodPic" src={mainImage} alt="商品圖"></img>
                <div className="GoodPicPreview">
                    {images.length > MAX_VISIBLE && (
                        <button className="GoodPicPreviewLeftBut" onClick={handlePrev} disabled={startIndex === 0}>
                            <IoIosArrowDropleftCircle />
                        </button>
                    )}
                    {visibleImages.map((img, index) => (
                        <img
                            key={startIndex + index} 
                            src={img}
                            alt={"展示"}
                            className="GoodPicPreviewImage"
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                    {images.length > MAX_VISIBLE && (
                        <button className="GoodPicPreviewRightBut" onClick={handleNext} disabled={startIndex + MAX_VISIBLE >= images.length}>
                            <IoIosArrowDroprightCircle />
                        </button>
                    )}
                </div>
            </div>
            <div className="GDAText" key={productData.pName || 'loading'}> 
                <div className="GDAContext">
                    <div className="GDABrand">{productData.brand}</div>
                    <div className="GDAName">{productData.pName}</div>
                    <br /><br />
                    <div className="GDAPrice">
                        <span className="GDAOriginalPrice">${productData.price}</span> 
                        <span className="GDADiscount">500</span> 
                    </div>
                    <br />
                    <span className="GDARate">
                        <ImStarFull size={20} color='gold' />
                        <span className="GDAScore">&nbsp;{productData.review}</span> 
                    </span>
                    <br /><br /><br /><br />
                </div>
                <div className="GDAAddLikeButton">
                    <button 
                        className="GDAAddLike" 
                        onClick={handleToggleTrack}
                    >
                        {isTracking ? "取消關注" : "加入關注"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GDAboutBody;