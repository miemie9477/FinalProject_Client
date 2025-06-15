/* eslint-disable react/style-prop-object */
import "./css/SearchResult.css"
import { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import { ImStarFull } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { SearchdataContext } from "../../../ContextAPI";
const FixStyle = {
    position: "relative"
}

const SearchResult = () => {


    const selectOptionStyles = {
        menu: (provide) => ({
            ...provide,
            width: "14.5vw",
            marginTop: '0vw'
        }),
        control: (provided, state) => ({ /*選擇框*/
            ...provided,
            backgroundColor: 'white',
            border: '0.15vw solid #ED8A8A',
            boxShadow: 'none',
            '&:hover': { borderColor: 'rgb(84, 49, 49)', },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '14vw',
            minWidth: '75px',
            height: '2.5vw',
            minHeight: '1.25vw',
            fontSize: '1.25vw',
            //padding: '0.1vw',
            marginLeft: '0.5vw',
            marginRight: '0.5vw',
            marginTop: '0vw',
            // marginBottom: '0.5vw',
            borderRadius: '0.5vw'
        }),
        option: (provided, state) => ({ /*每個選項*/
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(245, 183, 183)'
                : state.isFocused ? '#eee' : 'white',
            color: 'black',
            fontSize: '1.25vw',
            padding: '0.5vw',
        }),
        indicatorSeparator: (provided, state) => ({ /*箭頭和輸入框的分隔線*/
            //display: 'none',
            fontSize: '1.2vw',
            padding: 0,
            height: '50%',
            alignItems: 'center',
            // backgroundColor:"black"
            // display: 'none',
        }),
        valueContainer: (provided) => ({
            ...provided,
            margin: 0,
            padding: 0,
            fontSize: '1.2vw',
            alignItems: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            // height: '100%',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            padding: 0,
            fontSize:"1vw"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 0.5vw 0 0",
            svg: {
                width: '1.25vw',
                height: '1.25vw',
            }
        }),
    }

    // 1. 使用 SearchdataContext 中的 Searchdata
    const { Searchdata, setSearchdata } = useContext(SearchdataContext);

    // Filter and Sort states
    const [CommentSelectedOption, setCommentSelectedOption] = useState(null);
    const [PriceSelectedOption, setPriceSelectedOption] = useState(null);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);

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

    //const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (Searchdata) {
            setFilteredData(Searchdata); // 初始時，過濾後的數據就是原始數據
            setIsFiltered(false); // 重置過濾狀態
            // 由於 Searchdata 來自 context，它會根據搜尋結果自動更新
        }
    }, [Searchdata]); // 依賴 Searchdata 的變化

    const applyFilters = () => {
        console.log("Debug: Searchdata 的內容是:", Searchdata);
        let data = [...Searchdata];

        // 1. 價格篩選
        const min = parseFloat(priceMin);
        const max = parseFloat(priceMax);
        if (!isNaN(min)) {
            data = data.filter(item => item.price >= min);
        }
        if (!isNaN(max)) {
            data = data.filter(item => item.price <= max);
        }

        // 2. 排序
        if (CommentSelectedOption?.value === 'option1') {
            data.sort((a, b) => b.review - a.review); // 高到低
        } else if (CommentSelectedOption?.value === 'option2') {
            data.sort((a, b) => a.review - b.review); // 低到高
        }

        if (PriceSelectedOption?.value === 'option4') {
            data.sort((a, b) => b.price - a.price); // 價格高到低
        } else if (PriceSelectedOption?.value === 'option5') {
            data.sort((a, b) => a.price - b.price); // 價格低到高
        }

        setFilteredData(data);
        setIsFiltered(true);
    };

    useEffect(() => {
        // 只有當篩選或排序選項被選擇時才應用過濾，或當價格區間有輸入時
        if (CommentSelectedOption?.value !== 'option0' || PriceSelectedOption?.value !== 'option3' || priceMin !== '' || priceMax !== '') {
            applyFilters();
        } else {
            // 如果所有篩選條件都重置為預設或清空，則顯示原始的 Searchdata
            setFilteredData(Searchdata);
            setIsFiltered(false);
        }
    }, [CommentSelectedOption, PriceSelectedOption, priceMin, priceMax, Searchdata]); // 加上 Searchdata 作為依賴項

    const displayData = isFiltered ? filteredData : Searchdata;

    return (
        <div className="SearchResult">
            <div className="SRFilter">
                <div className="SRFilterText">進階篩選</div>
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
                    <div className="SRFilterRangeText">價格區間</div>
                    <div className="SRFilterRangeMin">
                        <input
                            type="text"
                            placeholder="$ 最小值"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                        />
                    </div>
                    <div className="SRFilterRangeText">-</div>
                    <div className="SRFilterRangeMax">
                        <input
                            type="text"
                            placeholder="$ 最大值"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                        />
                    </div>
                    {/* 移除這裡的 applyFilters 按鈕，因為我們會在 useEffect 中自動觸發 */}
                    {/* <button className="SRFilterRangeConfirmButtom" onClick={applyFilters}>套用</button> */}
                </div>
            </div>

            {/* 檢查 displayData 是否存在且有內容 */}
            {displayData && displayData.length > 0 ? (
                displayData.map((item, index) => (
                    <div className="SRDisplay" key={item.pId || index}> {/* 使用 pId 作為 key，如果沒有則用 index */}
                        <div className="SRDisplayPic">
                            {/* 確保 item.images 是一個有效的圖片路徑 */}
                            <img src={item.images || 'placeholder.jpg'} alt={"商品"} /> 
                        </div>
                        <NavLink to={`/GoodsDetailPage?pId=${item.pId}`} className="SRLink">
                            <div className="SRDisplayProduct">
                                <div className="SRDProBrand">{item.brand}</div>
                                <div className="SRDProName">{item.pName}</div>
                                <div className="SRDProPrice">
                                    {/* 確保 item.price 存在且格式正確 */}
                                    <span className="SRDProOriPrice">{item.price !== null ? `$${item.price.toFixed(2)}` : 'N/A'}</span>
                                </div>
                                <div className="SRDProRate">
                                    <ImStarFull size={15} color="gold" />
                                    <span className="SRDProRScore">&nbsp;{item.review !== null ? item.review.toFixed(1) : 'N/A'}</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                ))
            ) : (
                <div className="no-results-message">找不到符合條件的商品。</div>
            )}
        </div>
    );
}

export default SearchResult