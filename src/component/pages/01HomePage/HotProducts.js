import { useContext,useEffect, useState } from 'react';
import ProductCards from "./ProductCards";
import "./css/HomePage.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {PidContext} from "../../../ContextAPI"; //這個是相對路徑，可能會有不一樣要注意


const HotProducts = () => {
  const { pid, setPid } = useContext(PidContext);
  
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // 預設顯示前 10 筆
  
  // 載入熱門商品（根據 limit 動態改變）
  const fetchProducts = (limitVal) => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/homepage/product?sort=clickTimes&limit=${limitVal}`)
      .then((res) => {
        if (res.data) {
          const formatted = res.data.map((p) => ({
            Id: p.pId,
            Name: p.pName,
            Price: p.price,
            OriginalPrice: p.price,
            Image: require("./pic/HotProduct1.png"),
            Rating: p.review,
          }));
          setHotProducts(formatted);
        }
      })
      .catch((err) => {
        console.error("載入熱門商品失敗:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(limit);
  }, [limit]);
  
  useEffect(() => {
    console.log("目前的 hotProducts 狀態:", hotProducts);
  }, [hotProducts]);

  return (
    <div className="HotProducts">
      <hr className="HPDivider" />
      <h2 className="HPTitle">熱門商品</h2>

      {/* 下拉選單 */}
      <div className="HPDropdown">
        <label htmlFor="limitSelect">顯示筆數：</label>
        
        <select
          id="limitSelect"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={10}>前 10 筆</option>
          <option value={20}>前 20 筆</option>
          <option value={50}>前 50 筆</option>
          <option value={100}>前 100 筆</option>
        </select>
      </div>
      {/* 商品卡片 */}
      {loading ? (
        <div>載入中...</div>
      ) : (
        <div className="HPGrid">
          {hotProducts.map((p) => (
            <NavLink key={p.Id} to={`/GoodsDetailPage?pId=${p.Id}`} className="SRLink">
            <ProductCards Product={p} />
          </NavLink>
          ))}
        </div>
      )}

      <div className="HPButton">
        <NavLink to="/SearchResultPage">
          <button>查看所有商品</button>
        </NavLink>
      </div>
    </div>
  );
};

export default HotProducts;


