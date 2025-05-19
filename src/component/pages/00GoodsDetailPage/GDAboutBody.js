import "./css/GDABody.css"
import { useState } from "react";
import { ImStarFull} from "react-icons/im";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";


const FixStyle = {
    position: "relative"
}

const GDAboutBody = () => {

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
            <div className="GDAText">
                <div className="GDAContext">
                    <div className="GDABrand">品牌名</div>
                    <div className="GDAName">商品名</div>
                    <br /><br />
                    <div className="GDAPrice">
                        <span className="GDAOriginalPrice">原價</span>
                        <span className="GDADiscount">特價</span>
                    </div>
                    <br />
                    <span className="GDARate">
                        < ImStarFull size={20} color='gold' />
                        <span className="GDAScore">&nbsp;4.5</span>
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