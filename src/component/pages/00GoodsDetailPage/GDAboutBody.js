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
    // 使用 useLocation Hook 取得當前 URL 的 location 物件
    const location = useLocation();
    
    // 建立 URLSearchParams 物件來解析查詢參數
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

    const [formData, setFormData] = useState([]);
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/gooddetail/product/${pId}`)
            .then((response) => {
                console.log(response)
                const data = response.data;
                setFormData(data.results);   
            })
            .catch((error) => {
                console.error("拿API資料失敗", error);
            });
    }, []);

        

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
            <div className="GDAText" key={formData.pName}>
                <div className="GDAContext">
                    <div className="GDABrand">{formData.brand}</div>
                    <div className="GDAName">{formData.pName}</div>
                    <br /><br />
                    <div className="GDAPrice">
                        <span className="GDAOriginalPrice">{formData.price}</span>
                        <span className="GDADiscount">500</span>
                    </div>
                    <br />
                    <span className="GDARate">
                        < ImStarFull size={20} color='gold' />
                        <span className="GDAScore">&nbsp;{formData.review}</span>
                    </span>
                    <br /><br /><br /><br />
                </div>
                <div className="GDAAddLikeButton">
                    <button className="GDAAddLike">加入關注</button>
                </div>
                
            </div>
        </div>
    );
}


export default GDAboutBody