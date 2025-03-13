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
import { useState } from "react";
import { applyMembership } from "../services/api";

const ApplyMembership = () => {
  const [tier, setTier] = useState("Basic");
  const [message, setMessage] = useState("");

  const tiers = {
    Basic: { cost: 10.0, benefits: "Access to zoo" },
    Premium: { cost: 30.0, benefits: "Access to zoo + special events" },
    VIP: { cost: 50.0, benefits: "All benefits + VIP lounge" },
  };

  const handleApply = async () => {
    try {
      await applyMembership({ tier });
      setMessage("Application submitted! Awaiting approval.");
    } catch {
      setMessage("Application failed. Try again.");
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
      <button onClick={handleApply} className="mt-4 p-2 bg-green-500 text-white rounded">
        Apply
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default ApplyMembership;

