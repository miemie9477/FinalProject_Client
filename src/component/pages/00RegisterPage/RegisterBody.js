import "./css/RegisterPage.css";
import { useState } from "react";
import axios from "axios";


const RegisterBody = () => {
  const [formData, setFormData] = useState({
    account: "",
    cName: "",
    sex: "",
    birthday: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("密碼與確認密碼不一致");
      return;
    }

    try {
      console.log(formData);
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registerpage/register`, {
        cName: formData.cName,
        account: formData.account,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        sex: formData.sex,
        birthday: formData.birthday
      });

      alert(`註冊成功！您的 ID 是：${response.data.clientId}`);
      setFormData({
        account: "",
        cName: "",
        sex: "",
        birthday: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } 
    catch (error) {
      if (error.response) {
        alert(`錯誤：${error.response.data.message}`);
      } 
      else {
        alert("無法連線到伺服器");
      }
    }
  };

  return (
    <div className="RegisterBody">
      <div className="RBTitle">註冊帳號</div>
      <div className="RBInputArea">

        <div className="RBIArow">
          <div className="RBIATitle">帳號</div>
          <div className="RBIAtext">
            <input
              type="text"
              name="account"
              placeholder="請輸入帳號名稱"
              value={formData.account}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">用戶名稱</div>
          <div className="RBIAtext">
            <input
              type="text"
              name="cName"
              placeholder="請輸入用戶名稱"
              value={formData.cName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">性別</div>
          <div className="RBIAtext">
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="" disabled>請選擇性別</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">生日</div>
          <div className="RBIAtext">
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">電話</div>
          <div className="RBIAtext">
            <input
              type="tel"
              name="phone"
              placeholder="請輸入電話"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">電子郵件</div>
          <div className="RBIAtext">
            <input
              type="email"
              name="email"
              placeholder="請輸入電子郵件"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">密碼</div>
          <div className="RBIAtext">
            <input
              type="password"
              name="password"
              placeholder="請輸入密碼"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="RBIArow">
          <div className="RBIATitle">密碼確認</div>
          <div className="RBIAtext">
            <input
              type="password"
              name="confirmPassword"
              placeholder="請再次輸入密碼"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <button className="RBIAConfirmButtom" onClick={handleSubmit}>
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterBody;
