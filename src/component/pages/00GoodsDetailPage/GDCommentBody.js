import { useState, useEffect } from "react" // 引入 useEffect
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./css/GDComment.css"
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";

const FixStyle = {
    position: "relative"
}

// renderStar 函式保持不變，它是一個純粹的渲染函式
const renderStar = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const full = rating >= i;
        const half = rating >= i - 0.5 && rating < i;
        if (full) {
            stars.push(
                <span key={i} className="star"> <ImStarFull /> </span>
            );
        } else if (half) {
            stars.push(
                <span key={i} className="star"> <ImStarHalf /> </span>
            );
        } else {
            stars.push(
                <span key={i} className="star"> <ImStarEmpty /> </span>
            );
        }
    };
    return stars;
}

const GDCommentBody = () => {
    const location = useLocation();
    
    // 1. 定義狀態來儲存評論數據和平均評分
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [filterRating, setFilterRating] = useState(null); // 用於儲存當前篩選的星級 (null 表示全部)

    // 2. 使用 useEffect 來發送 API 請求
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pId = queryParams.get('pId'); 
        
        if (pId) {
            const url = `${process.env.REACT_APP_API_URL}/gooddetail/productReview/${pId}`;
            axios.get(url)
                .then(response => {
                    if (response.status === 200) {
                        const fetchedComments = response.data.results;
                        console.log("評論數據:", fetchedComments);
                        setComments(fetchedComments); // 更新評論列表

                        // 計算平均評分
                        if (fetchedComments.length > 0) {
                            const totalRating = fetchedComments.reduce((sum, comment) => sum + comment.rating, 0);
                            setAverageRating(totalRating / fetchedComments.length);
                        } else {
                            setAverageRating(0); // 沒有評論時平均分為0
                        }
                    } else {
                        console.error("無法獲取評論數據，狀態碼:", response.status);
                        setComments([]); // 清空數據
                        setAverageRating(0);
                    }
                })
                .catch(error => {
                    console.error("發生錯誤:", error);
                    setComments([]); // 清空數據
                    setAverageRating(0);
                });
        } else {
            console.warn("URL 中缺少 pId 參數，無法獲取評論數據。");
            setComments([]); // 清空數據
            setAverageRating(0);
        }
    }, [location.search]); // 依賴於 location.search 以便 pId 改變時重新獲取數據

    // 根據篩選條件過濾評論
    const filteredComments = filterRating 
        ? comments.filter(comment => comment.rating === filterRating)
        : comments;

    return (
        <div className="GDComment">
            <div className="GDCommentTitle">商品評論</div> {/* 標題改為商品評論更符合內容 */}
            <div className="GDCommentArea">
                <table className="GDCommentTable">
                    <thead className="GDCommentThead">
                        <tr>
                            <th className="GDCommentth">
                                <div className="GDCommentRateArea">
                                    <div className="GDCommentRate">{averageRating.toFixed(1)}/5</div> {/* 顯示平均評分，保留一位小數 */}
                                    <div className="GDCommentStar">
                                        {renderStar(averageRating)} {/* 渲染平均評分的星星 */}
                                    </div>
                                </div>
                                <div className="GDCommentFilter">
                                    <div className="GDCommentFilterBotton">
                                        {/* 篩選按鈕，點擊時更新 filterRating 狀態 */}
                                        <button 
                                            className={`GDCBottonAll ${filterRating === null ? 'active' : ''}`}
                                            onClick={() => setFilterRating(null)}>全部</button>
                                        <button 
                                            className={`GGDCBottonFiveStars ${filterRating === 5 ? 'active' : ''}`}
                                            onClick={() => setFilterRating(5)}>5星</button>
                                        <button 
                                            className={`GGDCBottonFourStars ${filterRating === 4 ? 'active' : ''}`}
                                            onClick={() => setFilterRating(4)}>4星</button>
                                        <button 
                                            className={`GGDCBottonThreeStars ${filterRating === 3 ? 'active' : ''}`}
                                            onClick={() => setFilterRating(3)}>3星</button>
                                        <button 
                                            className={`GGDCBottonTwoStars ${filterRating === 2 ? 'active' : ''}`}
                                            onClick={() => setFilterRating(2)}>2星</button>
                                        <button 
                                            className={`GGDCBottonOneStar ${filterRating === 1 ? 'active' : ''}`}
                                            onClick={() => setFilterRating(1)}>1星</button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="GDCommentBody">
                        {filteredComments.length > 0 ? (
                            filteredComments.map((comment, index) => (
                                <tr key={comment.pId + comment.userName + index}> {/* 使用組合鍵或更好的唯一ID */}
                                    <td>
                                        <div className="GDCommentUser">
                                            {/* 用戶頭像通常來自 API，這裡暫時使用靜態圖 */}
                                            <img src={require('./pic/ex1.png')} alt="用戶"
                                                style={{
                                                    width: 50,
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    margin: '1.2vw',
                                                }} />
                                            <div className="GDCommentUserInfo">
                                                <div className="GDCommentUserName">{comment.userName}</div>
                                                <div className="GDCommentUserRate">
                                                    {renderStar(comment.rating)} {/* 渲染單個評論的星星 */}
                                                    <span className="GDCommentUserRScore">{comment.rating.toFixed(1)}</span>
                                                </div>
                                                <div className="GDCommentUserComment">{comment.reviewText}</div>
                                            </div>
                                            <div className="GDCommentUserCommentTime">
                                                時間&nbsp;:&nbsp;{new Date(comment.date).toLocaleDateString()} {/* 格式化日期 */}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td style={{ textAlign: 'center', padding: '20px' }}>
                                    {comments.length === 0 && filterRating !== null 
                                        ? "沒有符合篩選條件的評論。" 
                                        : "載入中或暫無評論數據..."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GDCommentBody;