// import React, { useState } from "react";
// import { applyMembership } from "../services/api";

// const ApplyMembership: React.FC = () => {
//   const [tier, setTier] = useState("Basic");
//   const [message, setMessage] = useState<string | null>(null);

//   const handleApply = async () => {
//     try {
//       await applyMembership({ tier });
//       setMessage("会员申请成功！");
//     } catch (error) {
//       setMessage("申请失败，请稍后重试。");
//     }
//   };

//   return (
//     <div>
//       <h2>申请会员</h2>
//       <select value={tier} onChange={(e) => setTier(e.target.value)}>
//         <option value="Basic">Basic</option>
//         <option value="Premium">Premium</option>
//         <option value="VIP">VIP</option>
//       </select>
//       <button onClick={handleApply}>申请</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ApplyMembership;
import React, { useState } from "react";
import axios from "axios";

const ApplyMembership: React.FC = () => {
  const [tier, setTier] = useState("Basic");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 会员等级对应的费用和福利
  const membershipDetails = {
    Basic: { cost: 10, benefits: "Standard Access" },
    Premium: { cost: 30, benefits: "Extended Access" },
    VIP: { cost: 50, benefits: "All Access" },
  };

  const handleApply = async () => {
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token"); // 获取用户登录 token
    if (!token) {
      setMessage("请先登录再申请会员！");
      setLoading(false);
      return;
    }

    try {
      const membershipData = {
        tier,
        cost: membershipDetails[tier as keyof typeof membershipDetails].cost,
        benefits: membershipDetails[tier as keyof typeof membershipDetails].benefits,
      };

      const response = await axios.post("/zoo/api/apply-membership/", membershipData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("会员申请成功！");
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.error || "申请失败，请稍后重试。");
      } else {
        setMessage("网络错误，请检查您的连接。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>申请会员</h2>
      <label>
        选择会员等级：
        <select value={tier} onChange={(e) => setTier(e.target.value)}>
          <option value="Basic">Basic - ¥10</option>
          <option value="Premium">Premium - ¥30</option>
          <option value="VIP">VIP - ¥50</option>
        </select>
      </label>
      <button onClick={handleApply} disabled={loading}>
        {loading ? "申请中..." : "申请"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyMembership;
