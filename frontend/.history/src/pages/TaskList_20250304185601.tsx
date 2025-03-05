import React, { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus } from '../services/api';

interface Task {
  id: number;
  zookeeper: string;
  animal: string;
  description: string;
  status: string;
  due_date: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateTaskStatus(id, status);
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.animal} - {task.description} - {task.status}
            <button onClick={() => handleUpdateStatus(task.id, 'Completed')}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;