import React, { useEffect, useState } from 'react';
import { getCareRoutines, createCareRoutine, deleteCareRoutine } from '../services/api';

interface CareRoutine {
  id?: number;
  animal: string;
  feeding_time: string;
  diet_type: string;
  medical_needs: string;
  zookeeper: string;
}

const CareRoutinePage: React.FC = () => {
  const [careRoutines, setCareRoutines] = useState<CareRoutine[]>([]);
  const [newCareRoutine, setNewCareRoutine] = useState<CareRoutine>({
    animal: '',
    feeding_time: '',
    diet_type: '',
    medical_needs: '',
    zookeeper: '',
  });

  useEffect(() => {
    loadCareRoutines();
  }, []);

  const loadCareRoutines = async () => {
    try {
      const response = await getCareRoutines();
      setCareRoutines(response.data);
    } catch (error) {
      console.error('Failed to fetch care routines:', error);
    }
  };

  const handleCreateCareRoutine = async () => {
    try {
      await createCareRoutine(newCareRoutine);
      setNewCareRoutine({
        animal: '',
        feeding_time: '',
        diet_type: '',
        medical_needs: '',
        zookeeper: '',
      });
      loadCareRoutines();
    } catch (error) {
      console.error('Failed to create care routine:', error);
    }
  };

  return (
    <div>
      <h1>Care Routines</h1>
      <div>
        <h2>Add New Care Routine</h2>
        <input
          type="text"
          placeholder="Animal"
          value={newCareRoutine.animal}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, animal: e.target.value })}
        />
        <input
          type="time"
          placeholder="Feeding Time"
          value={newCareRoutine.feeding_time}
          onChange={(e) =>
            setNewCareRoutine({ ...newCareRoutine, feeding_time: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Diet Type"
          value={newCareRoutine.diet_type}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, diet_type: e.target.value })}
        />
        <textarea
          placeholder="Medical Needs"
          value={newCareRoutine.medical_needs}
          onChange={(e) =>
            setNewCareRoutine({ ...newCareRoutine, medical_needs: e.target.value })
          }
        />
        <button onClick={handleCreateCareRoutine}>Add Care Routine</button>
      </div>

      <ul>
        {careRoutines.map((routine) => (
          <li key={routine.id}>
            {routine.animal} - {routine.feeding_time} - {routine.diet_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareRoutinePage;