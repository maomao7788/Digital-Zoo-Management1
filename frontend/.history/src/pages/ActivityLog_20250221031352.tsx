import React, { useEffect, useState } from 'react';
import { getActivityLogs } from '../services/api';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

interface ActivityLog {
  id: number;
  zookeeper: { user: { username: string } };
  animal: { name: string };
  activity_description: string;
  date_time: string;
}

const ActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    getActivityLogs()
      .then((res) => setLogs(res.data))
      .catch((err) => console.error('Failed to fetch activity logs:', err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Activity Log</Typography>
      <Paper>
        <List>
          {logs.map((log) => (
            <ListItem key={log.id}>
              <ListItemText
                primary={`Zookeeper: ${log.zookeeper.user.username} | Animal: ${log.animal.name}`}
                secondary={`Activity: ${log.activity_description} | Time: ${new Date(log.date_time).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ActivityLog;