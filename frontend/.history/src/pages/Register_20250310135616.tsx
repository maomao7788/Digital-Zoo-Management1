import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/zoo/api/register/", formData);
      alert("注册成功");
    } catch (error) {
      alert("注册失败");
    }
  };

  return (
    <div>
      <h2>注册</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="用户名" onChange={handleChange} />
        <input type="email" name="email" placeholder="邮箱" onChange={handleChange} />
        <input type="password" name="password" placeholder="密码" onChange={handleChange} />
        <button type="submit">注册</button>
      </form>
    </div>
  );
};
// import React, { useState } from "react";
// import { registerUser } from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Register: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await registerUser(formData);
//       alert("注册成功，请登录！");
//       navigate("/login");
//     } catch (error) {
//       setError("注册失败，请检查输入信息。");
//     }
//   };

//   return (
//     <div>
//       <h2>用户注册</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="用户名" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="邮箱" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="密码" onChange={handleChange} required />
//         <button type="submit">注册</button>
//       </form>
//     </div>
//   );
// };

export default Register;