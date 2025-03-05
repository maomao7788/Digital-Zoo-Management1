import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@mui/material';

interface Habitat {
  id: number;
  name: string;
}

interface Animal {
  id: number;
  name: string;
  species: string;
  diet: string;
  lifespan: number;
  behaviour: string;
  habitat: Habitat | null;
  habitat_info: Habitat | null;
}

const AnimalList = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      const res = await axios.get('http://localhost:8000/zoo/api/animals/');
      setAnimals(res.data);
    } catch (err) {
      console.error('Error loading animals:', err);
    }
  };

  const removeAnimal = async (id: number) => {
    if (window.confirm('Confirm delete?')) {
      try {
        await axios.delete(`http://localhost:8000/zoo/api/animals/${id}/`);
        loadAnimals();
      } catch (err) {
        console.error('Error deleting animal:', err);
      }
    }
  };

  const getHabitatName = (habitat_info?: Habitat | null) => {
    return habitat_info ? habitat_info.name : 'Unassigned';
  };

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Animal List
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Species</TableCell>
//               <TableCell>Diet</TableCell>
//               <TableCell>Lifespan</TableCell>
//               <TableCell>Behaviour</TableCell>
//               <TableCell>Habitat</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {animals.map(animal => (
//               <TableRow key={animal.id}>
//                 <TableCell>{animal.name}</TableCell>
//                 <TableCell>{animal.species}</TableCell>
//                 <TableCell>{animal.diet}</TableCell>
//                 <TableCell>{animal.lifespan}</TableCell>
//                 <TableCell>{animal.behaviour}</TableCell>
//                 <TableCell>{getHabitatName(animal.habitat_info)}</TableCell>
//                 <TableCell>
//                   <Button color="primary" onClick={() => navigate(`/edit/${animal.id}`)}>Edit</Button>
//                   <Button color="secondary" onClick={() => removeAnimal(animal.id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
return (
  <div>
    <h2>Animal List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Species</th>
          <th>Diet</th>
          <th>Lifespan</th>
          <th>Behaviour</th>
          <th>Habitat</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {animals.map(animal => (
          <tr key={animal.id}>
            <td>{animal.name}</td>
            <td>{animal.species}</td>
            <td>{animal.diet}</td>
            <td>{animal.lifespan}</td>
            <td>{animal.behaviour}</td>
            <td>{getHabitatName(animal.habitat_info)}</td>
            <td>
              <button onClick={() => navigate(`/edit/${animal.id}`)}>
                Edit
              </button>
              <button onClick={() => removeAnimal(animal.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default AnimalList;
