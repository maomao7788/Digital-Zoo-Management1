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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Animal List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Diet</TableCell>
              <TableCell>Lifespan</TableCell>
              <TableCell>Behaviour</TableCell>
              <TableCell>Habitat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map(animal => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.diet}</TableCell>
                <TableCell>{animal.lifespan}</TableCell>
                <TableCell>{animal.behaviour}</TableCell>
                <TableCell>{getHabitatName(animal.habitat)}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => navigate(`/edit/${animal.id}`)}>Edit</Button>
                  <Button color="secondary" onClick={() => removeAnimal(animal.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnimalList;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button
// } from '@mui/material';
// import { getAnimals, deleteAnimal } from '../services/api';

// interface Habitat {
//   id: number;
//   name: string;
// }

// interface Animal {
//   id: number;
//   name: string;
//   species: string;
//   diet: string;
//   lifespan: number;
//   behaviour: string;
//   habitat: number; // 只存 ID
//   habitat_info: Habitat | null; // 用于显示栖息地名称
// }

// const AnimalList = () => {
//   const [animals, setAnimals] = useState<Animal[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAnimals();
//   }, []);

//   const fetchAnimals = async () => {
//     try {
//       const res = await getAnimals();
//       setAnimals(res.data);
//     } catch (err) {
//       console.error('Error loading animals:', err);
//     }
//   };

//   const removeAnimal = async (id: number) => {
//     if (window.confirm('Confirm delete?')) {
//       try {
//         await deleteAnimal(id);
//         fetchAnimals();
//       } catch (err) {
//         console.error('Error deleting animal:', err);
//       }
//     }
//   };

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
//               <TableCell>Actions</TableCell>
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
//                 <TableCell>{animal.habitat_info?.name || 'Unassigned'}</TableCell>
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

// export default AnimalList;
