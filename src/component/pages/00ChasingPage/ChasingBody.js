import "./css/ChasingPage.css";
import { NavLink } from "react-router-dom";
import ex1 from './pic/ex1.png'; // 根據你的位置調整路徑

const ChasingBody = ({ pNo }) => {
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
        <div className="product-card">
          <img src={ex1} alt="商品圖片" className="product-image" />

          <div className="product-info">
            <div className="product-brand">品牌名</div>
            <div className="product-name">商品名稱</div>
            <div className="product-price">
              <span className="original-price">原價 $1000</span>
              <span className="special-price">特價 $799</span>
            </div>
            <div className="product-rating">⭐ 4.5</div>
          </div>
        </div>

        <button className="CBIAUnfollowButtom">取消追蹤</button>
      </div>
    </div>
  );
};

export default ChasingBody;
