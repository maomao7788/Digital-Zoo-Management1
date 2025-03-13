// src/pages/ApplyMembership.tsx
import React, { useState, useEffect } from 'react';
import { applyMembership, getProfile } from '../services/api'; 
// getProfile = api.get('memberships/'): 这里请注意，需要你自己实现一个“获取当前用户的membership”函数，
// 也可以通过 getProfile 端点或 memberships/?user=me 这样的方式来写。

function ApplyMembership() {
  const [tier, setTier] = useState('Basic');
  const [membership, setMembership] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 获取当前登录用户的 membership 信息
    getProfile().then((res) => {
      // 需要你的后端在写 getProfile 的时候只返回当前用户的 membership
      // 或者你可以去 memberships/ 里根据 user=id 过滤
      // 这里假设返回数组，如果只有一个对象则直接 setMembership(res.data[0])
      setMembership(res.data[0]);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyMembership({ tier });
      setMessage('Membership applied successfully!');
    } catch (error: any) {
      setMessage(error.response?.data?.detail || 'Error applying membership');
    }
  }

  // 如果已经有 membership，则不允许再次申请
  if (membership) {
    return (
      <div>
        <h2>Your current membership tier: {membership.tier}</h2>
        <p>Active: {membership.active ? 'Yes' : 'No'}</p>
        <p>Benefits: {membership.benefits}</p>
        <p>Cost: {membership.cost}</p>
        <p>Expiry: {membership.expiry_date}</p>
        <p style={{ color: 'blue' }}>You already have a membership; cannot re-apply.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Apply for Membership</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tier">Select a tier:</label>
        <select id="tier" value={tier} onChange={(e) => setTier(e.target.value)}>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
        <button type="submit">Apply</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ApplyMembership;
