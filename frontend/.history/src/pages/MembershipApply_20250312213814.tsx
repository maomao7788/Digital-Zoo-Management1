import { useState } from "react";
import axios from "axios";

const MembershipApply = () => {
    const [tier, setTier] = useState("Basic");
    const [message, setMessage] = useState("");

    const tiers = {
        "Basic": { cost: 10.00, benefits: "Access to zoo" },
        "Premium": { cost: 30.00, benefits: "Access to zoo + special events" },
        "VIP": { cost: 50.00, benefits: "All benefits + VIP lounge" },
    };

    const applyMembership = async () => {
        try {
            const response = await axios.post("/api/membership/apply/", { tier }, { withCredentials: true });
            setMessage("Application submitted! Awaiting approval.");
        } catch (error) {
            setMessage("Application failed. Try again.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Apply for Membership</h2>
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(tiers).map(([key, value]) => (
                    <button key={key} 
                        className={`p-4 border rounded ${tier === key ? "bg-blue-500 text-white" : ""}`}
                        onClick={() => setTier(key)}
                    >
                        <h3 className="text-lg font-bold">{key}</h3>
                        <p>Cost: ${value.cost}</p>
                        <p>Benefits: {value.benefits}</p>
                    </button>
                ))}
            </div>
            <button onClick={applyMembership} className="mt-4 p-2 bg-green-500 text-white rounded">Apply</button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default MembershipApply;
