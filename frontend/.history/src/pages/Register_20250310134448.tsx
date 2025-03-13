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
      await axios.post("http://127.0.0.1:8000/register/", formData);
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

export default Register;
