import React, { useEffect, useState } from 'react';
import { getAllMemberships, activateMembership } from '../services/api';

function MembershipAdmin() {
  const [memberships, setMemberships] = useState<any[]>([]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = () => {
    getAllMemberships()
      .then(res => {
        setMemberships(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleActivate = (id: number, currentActive: boolean) => {
    // 这里调用 /activate/?active=xxx
    activateMembership(id, !currentActive)
      .then(() => {
        fetchMemberships();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Membership Admin</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Tier</th>
            <th>Active</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
            <th>Cost</th>
            <th>Benefits</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.user?.username}</td>
              <td>{m.tier}</td>
              <td>{m.active ? 'Yes' : 'No'}</td>
              <td>{m.start_date}</td>
              <td>{m.expiry_date}</td>
              <td>{m.cost}</td>
              <td>{m.benefits}</td>
              <td>
                <button onClick={() => handleActivate(m.id, m.active)}>
                  {m.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembershipAdmin;
