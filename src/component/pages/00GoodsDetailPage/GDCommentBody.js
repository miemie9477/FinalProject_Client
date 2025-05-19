import { useState } from "react"
import "./css/GDComment.css"
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";

const FixStyle = {
    position: "relative"
}

const rating = 2.5;

const renderStar = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const full = rating >= i;
        const half = rating >= i - 0.5 && rating < i;
        if (full) {
            stars.push(
                <span key={i} className="star" > < ImStarFull /> </span>
            );
        } else if (half) {
            stars.push(
                <span key={i} className="star" > < ImStarHalf /> </span>
            );
        } else {
            stars.push(
                <span key={i} className="star" > < ImStarEmpty /> </span>
            );
        }


    };

    return stars;
}

const GDCommentBody = () => {

    return (
        <div className="GDComment">
            <div className="GDCommentTitle">通路價格</div>
            <div className="GDCommentArea">
                <table className="GDCommentTable">
                    <thead className="GDCommentThead">
                        <tr>
                            <th className="GDCommentth">
                                <div className="GDCommentRateArea">
                                    <div className="GDCommentRate">{rating}/5</div>
                                    <div className="GDCommentStar">
                                        {renderStar(rating)}
                                    </div>
                                </div>
                                <div className="GDCommentFilter">
                                    <div className="GDCommentFilterBotton">
                                        <button className="GDCBottonAll">全部</button>
                                        <button className="GGDCBottonFiveStars">5星</button>
                                        <button className="GGDCBottonFourStars">4星</button>
                                        <button className="GGDCBottonThreeStars">3星</button>
                                        <button className="GGDCBottonTwoStars">2星</button>
                                        <button className="GGDCBottonOneStar">1星</button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="GDCommentBody">
                        <tr>
                            <td>
                                <div className="GDCommentUser">
                                    <img src={require('./pic/ex1.png')} alt="用戶"
                                        style={{
                                            width: 50,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            margin: '1.2vw',
                                        }} />
                                    <div className="GDCommentUserInfo">
                                        <div className="GDCommentUserName">寶雅</div>
                                        <div className="GDCommentUserRate">
                                            < ImStarFull size={15} color="gold" />
                                            <span className="GDCommentUserRScore">2.5</span>
                                        </div>
                                        <div className="GDCommentUserComment">評論</div>
                                    </div>
                                    <div className="GDCommentUserCommentTime">時間&nbsp;:&nbsp;2024/12/25</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default GDCommentBody