import "./css/GDCompare.css"

const FixStyle = {
    position: "relative"
}

const GDCompareBody = () => {

    return (
        <div className="GDCompare">
            <hr className="hr"/>
            <div className="GDCompareTitle">通路價格</div>
            <div className="GDCompareArea">
                <table className="GDCompareTable">
                    <thead className="GDCompareThead">
                        <tr>
                            <th className="GDCompareTthFirst">店家名稱</th><th>特價情況</th><th className="GDCompareTthLast">價格</th>
                        </tr>
                    </thead>
                    <tbody className="GDCompareBody">
                        <tr>
                            <td className="GDCompareTtdFirst">1</td><td>2</td><td className="GDCompareTtdLast">3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default GDCompareBody