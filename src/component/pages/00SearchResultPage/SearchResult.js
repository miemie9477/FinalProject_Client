// src/components/pages/SearchResult/SearchResult.js
/* eslint-disable react/style-prop-object */
import "./css/SearchResult.css";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { ImStarFull } from "react-icons/im";
import { NavLink, useLocation } from "react-router-dom"; 
import axios from "axios";

const FixStyle = {
    position: "relative"
};

// 新增一個映射，將 URL 傳遞的英文鍵映射回後端所需的實際分類字串
const backendCategoryMap = {
    "all": "all", // "all" 保持不變
    "face_makeup": "化妝品_臉部彩妝",
    "eye_makeup": "化妝品_眼眉彩妝_眼影",
    "lip_makeup": "化妝品_唇部彩妝_唇膏",
    "cleansing": "臉部保養_卸妝_卸妝油&乳&水",
    "face_care": "臉部保養_保養"
};

const SearchResult = () => {
    
    const location = useLocation();

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    
    // 定義 Select 的樣式
    const selectOptionStyles = {
        menu: (provide) => ({
            ...provide,
            width: "14.5vw",
            marginTop: '0vw'
        }),
        control: (provided, state) => ({
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
            marginLeft: '0.5vw',
            marginRight: '0.5vw',
            marginTop: '0vw',
            borderRadius: '0.5vw'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(245, 183, 183)'
                : state.isFocused ? '#eee' : 'white',
            color: 'black',
            fontSize: '1.25vw',
            padding: '0.5vw',
        }),
        indicatorSeparator: (provided, state) => ({
            fontSize: '1.2vw',
            padding: 0,
            height: '50%',
            alignItems: 'center',
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
    };

    const CommentHandleChange = (selected) => {
        setCommentSelectedOption(selected);
    };
    const PriceHandleChange = (selected) => {
        setPriceSelectedOption(selected);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            let apiUrl = '';
            let requestBody = {};
            
            
            
            // 使用提取到的 queryString 創建 URLSearchParams
            const queryParams = new URLSearchParams(location.search);
            const searchType = queryParams.get('searchType');
            const keyword = queryParams.get('keyword');
            const urlCategory = queryParams.get('category'); // 從 URL 獲取的是英文鍵

            console.log("從URL獲取搜尋參數:", { searchType, keyword, urlCategory });

            try {
                if (searchType === 'keyword' && keyword) {
                    apiUrl = `${process.env.REACT_APP_API_URL}/frame/search`;
                    requestBody = { keyword: keyword }; 
                    console.log("發送關鍵字搜尋請求:", { apiUrl, requestBody });
                    const response = await axios.post(apiUrl, requestBody);

                    if (response.status === 200 && Array.isArray(response.data.results)) { 
                         setOriginalData(response.data.results);
                    } else if (response.status === 404) {
                        setOriginalData([]);
                        alert("找不到相關商品。");
                    } else {
                        throw new Error("搜尋返回非預期數據。");
                    }

                } else if (searchType === 'category') {
                    // 將 URL 獲取的英文鍵映射回後端所需的中文值
                    const backendCategory = backendCategoryMap[urlCategory]; 
                    console.log("URL分類:", urlCategory, "映射到後端分類:", backendCategory);

                    apiUrl = `${process.env.REACT_APP_API_URL}/goodpage/product`;
                    if (backendCategory && backendCategory !== "all") {
                        // 後端需要的是編碼後的中文，所以這裡需要 encodeURIComponent
                        apiUrl += `?category=${encodeURIComponent(backendCategory)}`; 
                    }
                    console.log("發送分類搜尋請求:", apiUrl);
                    const response = await axios.get(apiUrl);
                    
                    if (response.status === 200 && Array.isArray(response.data)) { 
                        setOriginalData(response.data); 
                    } else {
                        throw new Error("分類搜尋返回非預期數據。"); 
                    }

                } else {
                    console.log("沒有搜尋參數，預設載入全部商品或顯示空。");
                    apiUrl = `${process.env.REACT_APP_API_URL}/goodpage/product`;
                    const response = await axios.get(apiUrl);
                    
                    if (response.status === 200 && Array.isArray(response.data)) { 
                        setOriginalData(response.data); 
                    } else {
                        setOriginalData([]); 
                    }
                }
            } catch (err) {
                console.error("獲取商品數據失敗:", err);
                setError("載入商品數據失敗，請稍後再試。");
                setOriginalData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        
    }, [location.search]); 

    // 過濾和排序邏輯 (基於 originalData) - 保持不變
    useEffect(() => {
        let data = [...originalData];

        const min = parseFloat(priceMin);
        const max = parseFloat(priceMax);
        if (!isNaN(min)) {
            data = data.filter(item => item.price >= min);
        }
        if (!isNaN(max)) {
            data = data.filter(item => item.price <= max);
        }

        if (CommentSelectedOption?.value === 'option1') {
            data.sort((a, b) => b.review - a.review);
        } else if (CommentSelectedOption?.value === 'option2') {
            data.sort((a, b) => a.review - b.review);
        }

        if (PriceSelectedOption?.value === 'option4') {
            data.sort((a, b) => b.price - a.price);
        } else if (PriceSelectedOption?.value === 'option5') {
            data.sort((a, b) => a.price - b.price);
        }

        setFilteredData(data);
        setIsFiltered(true);

        if (CommentSelectedOption?.value === 'option0' && PriceSelectedOption?.value === 'option3' && priceMin === '' && priceMax === '') {
            setFilteredData(originalData);
            setIsFiltered(false);
        }
    }, [CommentSelectedOption, PriceSelectedOption, priceMin, priceMax, originalData]);

    const displayData = isFiltered ? filteredData : originalData;

    if (loading) {
        return <div className="SearchResult-loading">載入中...</div>;
    }

    if (error) {
        return <div className="SearchResult-error">{error}</div>;
    }

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
                </div>
            </div>

            {displayData && displayData.length > 0 ? (
                displayData.map((item, index) => (
                    <div className="SRDisplay" key={item.pId || index}>
                        <div className="SRDisplayPic">
                            <img src={item.images || 'placeholder.jpg'} alt={"商品"} /> 
                        </div>
                        <NavLink to={`/GoodsDetailPage?pId=${item.pId}`} className="SRLink">
                            <div className="SRDisplayProduct">
                                <div className="SRDProBrand">{item.brand}</div>
                                <div className="SRDProName">{item.pName}</div>
                                <div className="SRDProPrice">
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
};

export default SearchResult;