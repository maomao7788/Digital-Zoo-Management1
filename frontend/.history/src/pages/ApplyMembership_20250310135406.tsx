import React, { useState } from "react";
import { applyMembership } from "../services/api";

const ApplyMembership: React.FC = () => {
  const [tier, setTier] = useState("Basic");
  const [message, setMessage] = useState<string | null>(null);

  const handleApply = async () => {
    try {
      await applyMembership({ tier });
      setMessage("会员申请成功！");
    } catch (error) {
      setMessage("申请失败，请稍后重试。");
    }
  };

  return (
    <div>
      <h2>申请会员</h2>
      <select value={tier} onChange={(e) => setTier(e.target.value)}>
        <option value="Basic">Basic</option>
        <option value="Premium">Premium</option>
        <option value="VIP">VIP</option>
      </select>
      <button onClick={handleApply}>申请</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyMembership;
