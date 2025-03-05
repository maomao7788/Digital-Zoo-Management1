import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Animal {
  id: number;
  name: string;
  species: string;
}

interface Habitat {
  id: number;
  name: string;
  size: string;
  climate: string;
  suitable_species: string[];
  animals: Animal[];
}

const HabitatList = () => {
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHabitats();
  }, []);

  const loadHabitats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/zoo/api/habitats/');
      setHabitats(res.data);
    } catch (err) {
      console.error('Error fetching habitats:', err);
    }
  };

  const removeHabitat = async (id: number) => {
    if (window.confirm('Confirm delete?')) {
      try {
        await axios.delete(`http://localhost:8000/zoo/api/habitats/${id}/`);
        loadHabitats();
      } catch (err) {
        console.error('Error deleting habitat:', err);
      }
    }
  };

  return (
    <div>
      <h2>Habitat List</h2>
      <table>
        <thead>
          <tr>
            <th>Habitat Name</th>
            <th>Size</th>
            <th>Climate</th>
            <th>Suitable Species</th>
            <th>Animals in Habitat</th>
          </tr>
        </thead>
        <tbody>
          {habitats.map((habitat) => (
            <tr key={habitat.id}>
              <td>{habitat.name}</td>
              <td>{habitat.size}</td>
              <td>{habitat.climate}</td>
              <td>
                {Array.isArray(habitat.suitable_species) && habitat.suitable_species.length > 0
                  ? habitat.suitable_species.join(', ')
                  : 'No suitable species'}
              </td>
              <td>
                {habitat.animals && habitat.animals.length > 0 ? (
                  <ul>
                    {habitat.animals.map((animal) => (
                      <li key={animal.id}>
                        {animal.name} ({animal.species})
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No animals assigned'
                )}
              </td>
              <td>
                <button onClick={() => navigate(`/edit/${habitat.id}`)}>Edit</button>
                <button onClick={() => removeHabitat(habitat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitatList;