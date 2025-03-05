import React, { useEffect, useState } from 'react';
import { fetchZookeepers, createZookeeper } from '../api/zooApi';

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
      const data = await fetchZookeepers();
      setZookeepers(data);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Zookeepers</h1>
      <div>
        <h2>新建Zookeeper</h2>
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
          type="text"
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
        <input
          type="text"
          placeholder="Email for notifications"
          value={newZookeeper.email}
          onChange={(e) => setNewZookeeper({ ...newZookeeper, email: e.target.value })}
        />
        <button onClick={handleCreateZookeeper}>提交</button>
      </div>

      <ul>
        {zookeepers.map((zk) => (
          <li key={zk.id}>
            {zk.user.username} - {zk.role} - {zk.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZookeeperPage;