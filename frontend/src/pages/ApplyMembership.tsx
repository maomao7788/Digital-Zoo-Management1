import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { applyMembership, getProfile } from '../services/api';

interface Membership {
  id: number;
  tier: string;
  active: boolean;
  benefits: string;
  cost: number;
  expiry_date: string;  // 新增有效期字段
}

const membershipOptions = [
  { tier: 'Basic', cost: 50, benefits: "Basic membership benefits: Access to limited features." },
  { tier: 'Premium', cost: 100, benefits: "Premium membership benefits: Access to most features with priority support." },
  { tier: 'VIP', cost: 200, benefits: "VIP membership benefits: All features, exclusive events and dedicated support." },
];

const ApplyMembership: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [membership, setMembership] = useState<Membership | null>(null);

  useEffect(() => {
    getProfile()
      .then((response) => {
        if (response.data) {
          setMembership(response.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    if (!selectedTier) {
      alert("Please select a membership tier.");
      return;
    }
  
    try {
      const response = await applyMembership({ tier: selectedTier });
      setMembership(response.data.membership);
      alert(response.data.message);
      console.log("Backend returned:", response.data);
    } catch (error: any) {
      console.error("Failed to apply for membership:", error.response?.data || error.message);
      alert("Failed to apply for membership. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Apply for Membership
      </Typography>
      {membership ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Your Membership: {membership.tier}</Typography>
          <Typography>Status: {membership.active ? "Active" : "Inactive"}</Typography>
          <Typography>Benefits: {membership.benefits}</Typography>
          <Typography>Cost: ${membership.cost}</Typography>
          <Typography>Expiry Date: {membership.expiry_date}</Typography>
        </Box>
      ) : (
        <Typography>You don't have a membership yet.</Typography>
      )}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="membership-tier-label">Select Tier</InputLabel>
        <Select
          labelId="membership-tier-label"
          value={selectedTier}
          label="Select Tier"
          onChange={(e) => setSelectedTier(e.target.value as string)}
        >
          {membershipOptions.map((option) => (
            <MenuItem key={option.tier} value={option.tier}>
              {option.tier} - ${option.cost} <br /> {option.benefits}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
        Apply
      </Button>
    </Box>
  );
};

export default ApplyMembership;
