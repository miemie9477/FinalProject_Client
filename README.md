## 6/17 開發日誌 BY咩
> * 網頁登入
>   * 帳號:Test_0001
>   * 密碼: Test_0001
0. 表單驗證的部分，看要不要回去使用react-hook-form或是做其他處理
    > 現在發現如果單純做在後端，像是register的頁面，要檢查的欄位比較多，他沒辦法一次告訴你哪幾個欄位有問題，他只會一個一個報
1. 畫面css修改有放在群組(比較嚴重的)，其他就按照前端組長審美去調整
2. *TopBar_text.js* 與 *SearchResult.js* 說明
    >   現在TopBar傳送 Query Parameters給 SearchResults，告訴SearchResult要打哪個API，傳送哪個arg給後端，由SearchResults去執行功能與邏輯
    > * 改善:
    >   1. 直接複製網址貼上會找不到資料
    >   2. 重新整理頁面，一樣可以得到category的物件
3. **現在大部分的功能完成度**:
    * 如果正常操作的話，基本可用
    * API串接部分，沒有特別針對後端的error status做處理
    * register跟修改client我沒有全部測，再麻煩了
4. 盡量不要把css寫在js檔案裡，我vs code有時候會抽風，一整個收不起來Q_Q
5. 新版docker上線囉，飄再幫我測試測試

## Docker 說明(6/17)
* 環境簡介(推薦，當然也可以在wsl上安裝)
    * 安裝 docker desktop
    * WSL: Debian 12
* docker compose 簡介
    * 內容物: flask-app(backend), db, redis(目前沒有含前端)
        > 想說等前端完全debug完再包
    * SQL Server 2022
    * ODBC 18
    * Python 3.10
* 使用手冊
    * cd至serverclient
    * 第一次執行`docker compose up --build`
        > 第一次會跑比較久，大概要幾分鐘

        > build只要第一次做就好
    * 停止容器按control+C
    * 移除容器，開另一個terminal，`cd serverclient`輸入`docker compose down`
* **提醒**: 要使用docker命令要啟動docker desktop，沒有要使用建議關閉(建議左下角按Quit，不要按右上角叉叉)
    > 因為我嚴重懷疑由於docker沒關導致我打LOL很卡 
* 其他:
    * Docker資料庫狀況?
        > 可以去我github看init.sql，都只有我自己設的簡單假資料
    * Docker可以幹嘛?
        > 前端串API不用搞環境，大概就 醬，目前
    * 本次新增: redis


## 6/14 待辦
- [x] clientPage串接
- [x] gooddetail檢查API
- [x] hotproducts 查看所有商品問題
- [x] 修改前端對於登入狀態的問題
- [x] cId session存放問題
> 使用payload得到current user clientId
- [x] searching page問題很大
- [x] TopBar category 串API
> 會有一點卡
- [x] 修改 GoodDetail + 確定*homepage* + *goodpage* navlink問題
- [x] homepage hotproduct渲染問題
- [ ] 檢查所有http status跟前端處理的方式
- [ ] 先確定全部API跟前端
- [x] 看redis + docker

<hr/>
 
# 專案規格
1. 命名頁面名稱時外層請命名為 XXXPage.js ，內層請命名為 XXXBody.js，然後頁面主體請寫在內層裡

2. 由於css格式會跨頁面影響，為了避免重複名稱，在命名className時請按照以下規則

    1.  className 請寫成單字首字母大寫的形式，且盡量單字與組件內容相關，方便其他人看你的東西
    例: 訂單的表格用的className → className="OrdersTable"

    2.  內層的className請加上上層className的首字母大寫
    例: 訂單的表格內的客戶名稱的className  → className="OTClientName"

3. 寫css文件時，單位請盡量使用 vw 或 % ，不要使用px或cm之類的，這兩個單位可以讓網頁內容隨視窗寬度自動調整大小

    1. 使用vw單位，要變更文字大小時，需要同時變更 font-size 與 line-height 兩個屬性

    2. 製作頁面時可以的話，多使用 display: flex 來設計排版，方便其他人看你的東西 (這條不強迫)

4. 製作頁面有需要可以添加Library，但需要把添加Library寫在下面這邊，並在套件名後面標註: (新增)

5. 我有製作一個範例頁面模板在 src > component > pages > 00ExamplePage，可以直接整個資料夾複製過去改

6. 掛載頁面時要去 App.js 掛載，文件裡面有教學

7. 傳要檔案給其他人時，不要連同 node_modules 資料夾一起壓縮，不然檔案會太大



================<br/>
## Library (安裝指令: npm install 套件名)
> React.js
> React.bootstrap
> react-router-dom 
> npm install react-icons
> npm install react-hook-form
> npm install axios
> npm install date-fns

<hr>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
