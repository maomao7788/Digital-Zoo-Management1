import { useState } from "react";
import api from "../services/api";

// ✅ 1. 确保 tiers 类型正确
const tiers: Record<"Basic" | "Premium" | "VIP", { cost: number; benefits: string; discount: string }> = {
    "Basic": { cost: 10.00, benefits: "Access to zoo", discount: "5% off on tickets" },
    "Premium": { cost: 30.00, benefits: "Access to zoo + special events", discount: "10% off on tickets" },
    "VIP": { cost: 50.00, benefits: "All benefits + VIP lounge", discount: "15% off on tickets" },
};

const MembershipApply = () => {
    // ✅ 2. 确保 tier 只能是 "Basic" | "Premium" | "VIP"
    const [tier, setTier] = useState<"Basic" | "Premium" | "VIP">("Basic");
    const [message, setMessage] = useState("");

    const applyMembership = async () => {
        try {
            await api.post("memberships/", { tier });
            setMessage("Application submitted! Awaiting approval.");
        } catch (error: any) {
            setMessage(error.response?.data?.detail || "Application failed. Try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Apply for Membership</h2>

            {/* 会员套餐列表 */}
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(tiers).map(([key, value]) => (
                    <button key={key} 
                        className={`p-4 border rounded ${tier === key ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => setTier(key as "Basic" | "Premium" | "VIP")} // ✅ 这里强制转换
                    >
                        <h3 className="text-lg font-bold">{key}</h3>
                        <p>💰 Cost: ${value.cost}</p>
                        <p>🎟️ Benefits: {value.benefits}</p>
                        <p>🔖 Ticket Discount: {value.discount}</p>
                    </button>
                ))}
            </div>

            {/* 选中的套餐详情 */}
            <div className="mt-6 p-4 border rounded bg-gray-100">
                <h3 className="text-xl font-bold">Selected Plan: {tier}</h3>
                <p>💰 Cost: <span className="font-semibold">${tiers[tier].cost}</span></p>
                <p>🎟️ Benefits: <span className="font-semibold">{tiers[tier].benefits}</span></p>
                <p>🔖 Ticket Discount: <span className="font-semibold">{tiers[tier].discount}</span></p>
            </div>

            {/* 申请按钮 */}
            <button onClick={applyMembership} className="mt-4 p-2 bg-green-500 text-white rounded">Apply</button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default MembershipApply;
