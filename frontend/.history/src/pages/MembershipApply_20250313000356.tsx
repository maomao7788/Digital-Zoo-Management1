import { useState } from "react";
import axios from "axios";

const MembershipApply = () => {
  const [tier, setTier] = useState("Basic");
  const [message, setMessage] = useState("");

  // 定义不同会员等级的前端展示信息
  const tiers = {
    Basic: { cost: 10.0, benefits: "Access to zoo" },
    Premium: { cost: 30.0, benefits: "Access to zoo + special events" },
    VIP: { cost: 50.0, benefits: "All benefits + VIP lounge" },
  };

  // 调用后端 apply-membership 接口
  const applyMembership = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/zoo/api/apply-membership/",
        { tier },
        { withCredentials: true }
      );
      setMessage(response.data.message || "Application submitted! Awaiting approval.");
    } catch (error: any) {
      console.error("Error applying membership:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        setMessage("You are not logged in. Please login first.");
      } else {
        setMessage("Application failed. Try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Apply for Membership</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(tiers).map(([key, value]) => (
          <button
            key={key}
            className={`p-4 border rounded ${tier === key ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setTier(key)}
          >
            <h3 className="text-lg font-bold">{key}</h3>
            <p>Cost: ${value.cost}</p>
            <p>Benefits: {value.benefits}</p>
          </button>
        ))}
      </div>
      <button onClick={applyMembership} className="mt-4 p-2 bg-green-500 text-white rounded">
        Apply
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default MembershipApply;
