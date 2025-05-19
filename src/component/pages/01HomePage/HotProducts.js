import ProductCards from "./ProductCards";
import "./css/HomePage.css";
import Product1 from "./pic/HotProduct1.png"
import { NavLink } from "react-router-dom";

const HotProducts = () => {
  const hotProducts = [
    {
      Id: 1,
      Name: "1號健髮護髮洗髮露 500ml",
      Price: 580,
      OriginalPrice: 780,
      Image: Product1,
      Rating: 4.5,
    },
    {
      Id: 2,
      Name: "1號健髮護髮洗髮露 500ml",
      Price: 580,
      OriginalPrice: 780,
      Image: Product1,
      Rating: 4.5,
    },
    {
      Id: 3,
      Name: "1號健髮護髮洗髮露 500ml",
      Price: 580,
      OriginalPrice: 780,
      Image: Product1,
      Rating: 4.5,
    },
    {
      Id: 4,
      Name: "1號健髮護髮洗髮露 500ml",
      Price: 580,
      OriginalPrice: 780,
      Image: Product1,
      Rating: 4.5,
    }
  ];

  return (
    <div className="HotProducts">
      <hr className="HPDivider" />
      <h2 className="HPTitle">熱門商品</h2>
      <div className="HPGrid">
        {hotProducts.map((p) => (
          <NavLink to="/GoodsDetailPage" className="SRLink">
            <ProductCards key={p.id} Product={p}></ProductCards>
          </NavLink>
        ))}
      </div>
      <div className="HPButton">
        <NavLink to="/SearchResultPage"><button>查看所有商品</button></NavLink>
      </div>
    </div>
  );
};

export default HotProducts;
