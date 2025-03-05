import React, { useEffect, useState } from 'react';
import { getActivityLogs } from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';

interface ActivityLog {
  id: number;
  zookeeper_name: string;
  animal_name: string;
  feeding_time: string;
  diet_type: string;
  medical_needs: string;
  date: string;
  status: string;
  completion_time: string | null;
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
              <TableCell>Feeding Time</TableCell>
              <TableCell>Diet Type</TableCell>
              <TableCell>Medical Needs</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completion Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No logs available
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.zookeeper_name}</TableCell>
                  <TableCell>{log.animal_name}</TableCell>
                  <TableCell>{log.feeding_time}</TableCell>
                  <TableCell>{log.diet_type}</TableCell>
                  <TableCell>{log.medical_needs}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>{log.completion_time || "Not Completed"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityLogPage;
