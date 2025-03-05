import React, { useEffect, useState } from 'react';
import { getZookeepers } from '../services/api';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface Zookeeper {
  id: number;
  user: { username: string; email: string };
  qualifications: string;
  responsibilities: string;
}

const ZookeeperList = () => {
  const [zookeepers, setZookeepers] = useState<Zookeeper[]>([]);

  useEffect(() => {
    getZookeepers()
      .then((res) => setZookeepers(res.data))
      .catch((err) => console.error('Failed to fetch zookeepers:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Zookeeper List</Typography>
      <Paper>
        <List>
          {zookeepers.map((zk) => (
            <ListItem key={zk.id}>
              <ListItemText
                primary={`${zk.user.username} (${zk.user.email})`}
                secondary={`Qualifications: ${zk.qualifications} | Responsibilities: ${zk.responsibilities}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ZookeeperList;