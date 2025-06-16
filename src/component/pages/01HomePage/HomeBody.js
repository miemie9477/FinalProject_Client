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
      <div className="EBYourCodeHere">
        {" "}
      </div>
    </div>
  );
};

// ↓↓這邊下面變數名記得改成跟文件名一樣
export default HomeBody;
