import React, { useEffect, useState } from 'react';
import { getActivityLogs } from '../services/api';

interface ActivityLog {
  id: number;
  zookeeper: string;
  animal: string;
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
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  };

  return (
    <div>
      <h1>Activity Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.timestamp} - {log.zookeeper} - {log.animal} - {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogPage;