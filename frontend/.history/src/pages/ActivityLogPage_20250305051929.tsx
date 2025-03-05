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
      console.log("Activity Logs Data:", response.data);
      
      // 处理数据结构，确保字段正确映射
      const formattedLogs = response.data.map((log: any) => ({
        id: log.id,
        zookeeper_name: log.zookeeper?.user?.username || "Unknown", // 从 zookeeper 结构获取用户名
        animal_name: log.animal?.name || log.animal_name || "Unknown", // animal.name 或者 care_routine.animal.name
        feeding_time: log.feeding_time || "N/A",
        diet_type: log.diet_type || "N/A",
        medical_needs: log.medical_needs || "N/A",
        date: log.date || "Unknown Date",
        action: log.action,
        timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : "Unknown Time"
      }));

      setLogs(formattedLogs);
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
                  <TableCell>{log.action}</TableCell>
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
