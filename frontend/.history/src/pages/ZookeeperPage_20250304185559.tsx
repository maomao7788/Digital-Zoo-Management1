import React, { useEffect, useState } from 'react';
import { getZookeepers, createZookeeper, deleteZookeeper } from '../services/api';

interface User {
  username: string;
  email: string;
}

interface Zookeeper {
  id?: number;
  user: User;
  role: string;
  qualifications: string;
  responsibilities: string;
  email: string;
}

const ZookeeperPage: React.FC = () => {
  const [zookeepers, setZookeepers] = useState<Zookeeper[]>([]);
  const [newZookeeper, setNewZookeeper] = useState<Zookeeper>({
    user: { username: '', email: '' },
    role: '',
    qualifications: '',
    responsibilities: '',
    email: '',
  });

  useEffect(() => {
    loadZookeepers();
  }, []);

  const loadZookeepers = async () => {
    try {
      const response = await getZookeepers();
      setZookeepers(response.data);
    } catch (error) {
      console.error('Failed to fetch zookeepers:', error);
    }
  };

  const handleCreateZookeeper = async () => {
    try {
      await createZookeeper(newZookeeper);
      setNewZookeeper({
        user: { username: '', email: '' },
        role: '',
        qualifications: '',
        responsibilities: '',
        email: '',
      });
      loadZookeepers();
    } catch (error) {
      console.error('Failed to create zookeeper:', error);
    }
  };

  const handleDeleteZookeeper = async (id: number) => {
    try {
      await deleteZookeeper(id);
      loadZookeepers();
    } catch (error) {
      console.error('Failed to delete zookeeper:', error);
    }
  };

  return (
    <div>
      <h1>Zookeepers</h1>
      <div>
        <h2>Add New Zookeeper</h2>
        <input
          type="text"
          placeholder="Username"
          value={newZookeeper.user.username}
          onChange={(e) =>
            setNewZookeeper({
              ...newZookeeper,
              user: { ...newZookeeper.user, username: e.target.value },
            })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newZookeeper.user.email}
          onChange={(e) =>
            setNewZookeeper({
              ...newZookeeper,
              user: { ...newZookeeper.user, email: e.target.value },
            })
          }
        />
        <input
          type="text"
          placeholder="Role"
          value={newZookeeper.role}
          onChange={(e) => setNewZookeeper({ ...newZookeeper, role: e.target.value })}
        />
        <textarea
          placeholder="Qualifications"
          value={newZookeeper.qualifications}
          onChange={(e) => setNewZookeeper({ ...newZookeeper, qualifications: e.target.value })}
        />
        <textarea
          placeholder="Responsibilities"
          value={newZookeeper.responsibilities}
          onChange={(e) =>
            setNewZookeeper({ ...newZookeeper, responsibilities: e.target.value })
          }
        />
        <button onClick={handleCreateZookeeper}>Add Zookeeper</button>
      </div>

      <ul>
        {zookeepers.map((zk) => (
          <li key={zk.id}>
            {zk.user.username} - {zk.role} - {zk.email}
            <button onClick={() => handleDeleteZookeeper(zk.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZookeeperPage; 