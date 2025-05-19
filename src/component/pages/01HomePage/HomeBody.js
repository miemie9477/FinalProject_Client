import "./css/HomePage.css";
// ↑↑這邊上面import的css文件名記得改
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const FixStyle = {
  position: "relative",
};


const HomeBody = () => {
  // ↑↑這邊上面變數名記得改成跟文件名一樣

  return (
    <div className="HomeBody">
      {" "}
      {/* className 請寫成單字首字母大寫的形式 */}
      <div className="EBYourCodeHere">
        {" "}
        {/* 內層的 className 請加上上層 className 的首字母大寫*/}
        {/* ↑↑比如說上面這個className，因為外層有className="HomeBody，所以在前面加上EB */}
      </div>
    </div>
  );
};

// ↓↓這邊下面變數名記得改成跟文件名一樣
export default HomeBody;
