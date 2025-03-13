import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile().then((response) => {
      setProfile(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Username: {profile.user.username}</p>
          <p>Email: {profile.user.email}</p>
          <p>Membership Tier: {profile.tier}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;