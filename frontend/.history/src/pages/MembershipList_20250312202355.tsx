import { useEffect, useState } from "react";
import { getMemberships, activateMembership } from "../services/api";

interface Membership {
  id: number;
  user: string;
  tier: string;
  start_date: string;
  expiry_date: string;
  cost: number;
  benefits: string;
  is_active: boolean;
}

const MembershipList = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    getMemberships()
      .then((res) => setMemberships(res.data))
      .catch((err) => console.error("Error fetching memberships:", err));
  }, []);

  const handleActivate = async (id: number, currentActive: boolean) => {
    try {
      await activateMembership(id, true);
      setMemberships(memberships.map((m) => (m.id === id ? { ...m, is_active: true } : m)));
    } catch (err) {
      console.error("Activation failed", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Membership Applications</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Tier</th>
            <th className="p-2">Start</th>
            <th className="p-2">Expiry</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m.id} className="border">
              <td className="p-2">{m.user}</td>
              <td className="p-2">{m.tier}</td>
              <td className="p-2">{m.start_date}</td>
              <td className="p-2">{m.expiry_date}</td>
              <td className="p-2">{m.is_active ? "Active" : "Pending"}</td>
              <td className="p-2">
                {!m.is_active && (
                  <button onClick={() => handleActivate(m.id, m.is_active)} className="p-2 bg-blue-500 text-white rounded">
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembershipList;

