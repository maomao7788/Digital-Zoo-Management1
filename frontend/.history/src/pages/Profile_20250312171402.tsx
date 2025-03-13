import React, { useEffect, useState } from 'react';
import API from '../services/api';

interface Membership {
  tier: string;
  expiry_date: string;
  cost: number;
  benefits: string;
}

interface Profile {
  id: number;
  username: string;
  email: string;
  membership: Membership | null;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    API.get('/profile/').then(response => {
      setProfile(response.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {profile.membership ? (
            <div>
              <p>Membership Tier: {profile.membership.tier}</p>
              <p>Expiry Date: {profile.membership.expiry_date}</p>
              <p>Cost: {profile.membership.cost}</p>
              <p>Benefits: {profile.membership.benefits}</p>
            </div>
          ) : (
            <p>No membership. Please apply for membership.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;