import React, { useEffect, useState } from 'react';
import { getActivityLogs } from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface ActivityLog {
  id: number;
  zookeeper: { id: number; username: string };
  animal: { id: number; name: string };
  action: string;
  timestamp: string;
}

const ActivityLogPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await getActivityLogs();
      console.log("Activity Logs Data:", response.data);  // ✅ 调试用
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Activity Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Zookeeper</TableCell>
              <TableCell>Animal</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.zookeeper?.username || "Unknown"}</TableCell>
                  <TableCell>{log.animal?.name || "Unknown"}</TableCell>
                  <TableCell>{log.action}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No logs available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityLogPage;
