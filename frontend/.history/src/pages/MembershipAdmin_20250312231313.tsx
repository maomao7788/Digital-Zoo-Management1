import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Switch, Button } from '@mui/material';
import { getMemberships, updateMembership } from '../services/api';

interface Membership {
  id: number;
  user: { username: string };
  tier: string;
  active: boolean;
  benefits: string;
  cost: number;
}

const MembershipAdmin: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);

  const fetchMemberships = async () => {
    try {
      const res = await getMemberships();
      setMemberships(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleToggle = async (membership: Membership) => {
    try {
      await updateMembership(membership.id, { active: !membership.active });
      fetchMemberships();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Membership Applications
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Tier</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Benefits</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memberships.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell>{membership.user.username}</TableCell> {/* 这里改成 user.username */}
              <TableCell>{membership.tier}</TableCell>
              <TableCell>${membership.cost}</TableCell>
              <TableCell>{membership.benefits}</TableCell>
              <TableCell>
                <Switch
                  checked={membership.active}
                  onChange={() => handleToggle(membership)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleToggle(membership)}>
                  Toggle Activation
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MembershipAdmin;
