/* eslint-disable react/style-prop-object */
import "./css/SearchResult.css"
import { useState } from "react";
import Select from 'react-select';
import { ImStarFull } from "react-icons/im";
import { NavLink } from "react-router-dom";

const FixStyle = {
    position: "relative"
}

const SearchResult = () => {

    const selectOptionStyles = {
        menu: (provide) => ({
            ...provide,
            width: 100,
        }),
        control: (provided, state) => ({ /*選擇框*/
            ...provided,
            backgroundColor: 'white',
            border: '0.15vw solid #ED8A8A',
            boxShadow: 'none',
            '&:hover': { borderColor: 'rgb(84, 49, 49)', },
            width: '14vw',
            minHeight: '2vh',
            fontSize: '1.5vw',
            padding: '0.1vw',
            marginLeft: '0.5vw',
            marginRight: '0.5vw',
            marginTop: '-0.5vw',
            marginBottom: '0.5vw',
        }),
        option: (provided, state) => ({ /*每個選項*/
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(245, 183, 183)'
                : state.isFocused ? '#eee' : 'white',
            color: 'black',
            fontSize: 12,
            padding: '0.5vw',
        }),
        indicatorSeparator: (provided, state) => ({ /*箭頭和輸入框的分隔線*/
            display: 'none',
            fontSize: '2vw',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0',
            height: 20,
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: 20,
        }),
    }

    const [CommentSelectedOption, setCommentSelectedOption] = useState(null);
    const [PriceSelectedOption, setPriceSelectedOption] = useState(null);

    const CommentOptions = [
        { value: 'option0', label: '評論' },
        { value: 'option1', label: '評論：由高到低' },
        { value: 'option2', label: '評論：由低到高' }
    ];
    const PriceOptions = [
        { value: 'option3', label: '價格' },
        { value: 'option4', label: '價格：由高到低' },
        { value: 'option5', label: '價格：由低到高' }
    ];

    const CommentHandleChange = (selected) => {
        setCommentSelectedOption(selected);
    };
    const PriceHandleChange = (selected) => {
        setPriceSelectedOption(selected);
    };

    const images = [
        require('./pic/ex1.png'),
    ];

    const product = {
        brand: '品牌名',
        name: '商品名',
        originalPrice: '原價',
        discountPrice: '特價',
        rating: 4.5,
    };

    const productDetails = [
        { label: '品牌名', value: product.brand, className: 'SRDProBrand' },
        { label: '商品名', value: product.name, className: 'SRDProName' },
        {
            label: '價格',
            value: (
                <div className="SRDProPrice">
                    <span className="SRDProOriPrice">{product.originalPrice}</span>
                    <span className="SRDProDiscount">{product.discountPrice}</span>
                </div>
            ),
            className: 'SRDProPrice',
        },
        {
            label: '評價',
            value: (
                <div className="SRDProRate">
                    <ImStarFull size={15} color="gold" />
                    <span className="SRDProRScore">&nbsp;{product.rating}</span>
                </div>
            ),
            className: 'SRDProRate',
        },
    ];

    return (
        <div className="SearchResult">
            <div className="SRFilter">
                <p>進階篩選</p>
                <div className="SRFilterComment">
                    <Select
                        value={CommentSelectedOption}
                        onChange={CommentHandleChange}
                        options={CommentOptions}
                        styles={selectOptionStyles}
                        placeholder="評論"
                    />
                </div>
                <div className="SRFilterPrice">
                    <Select
                        value={PriceSelectedOption}
                        onChange={PriceHandleChange}
                        options={PriceOptions}
                        styles={selectOptionStyles}
                        placeholder="價格"
                    />
                </div>
                <div className="SRFilterRange">
                    <p>價格區間</p>
                    <div className="SRFilterRangeMin">
                        <input type="text" placeholder="$ 最小值" />
                    </div>
                    <p>—</p>
                    <div className="SRFilterRangeMax">
                        <input type="text" placeholder="$ 最大值" />
                    </div>
                    <button className="SRFilterRangeConfirmButtom">套用</button>
                </div>
            </div>
            <div className="SRDisplay">
                <div className="SRDisplayPic">
                    <img src={images} alt={"展示"} />
                </div>
                <div className="SRDisplayProduct">
                    {productDetails.map((item, index) => (
                        <NavLink to="/GoodsDetailPage" className="SRLink">
                            <div key={index} className={item.className}>
                                {item.value}
                            </div>
                        </NavLink>
                    ))}
                </div>

            </div>
        </div>

    );
}

export default SearchResult