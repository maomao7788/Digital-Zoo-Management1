import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container
} from '@mui/material';
import { getAnimalById, updateAnimal, getHabitats } from '../services/api';

interface Habitat {
  id: number;
  name: string;
}

const EditAnimal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    diet: 'Carnivore',
    lifespan: 0,
    behaviour: '',
    habitat: ''
  });

  const [habitats, setHabitats] = useState<Habitat[]>([]);

  useEffect(() => {
    getAnimalById(Number(id))
      .then(res => setFormData(res.data))
      .catch(err => console.error('Failed to fetch animal:', err));

    getHabitats()
      .then(res => setHabitats(res.data))
      .catch(err => console.error('Failed to fetch habitats:', err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: formData.name,
        species: formData.species,
        diet: formData.diet,
        lifespan: formData.lifespan,
        behaviour: formData.behaviour,
        habitat: formData.habitat, // 🔹 habitat 现在是 ID
      };
      await updateAnimal(Number(id), updatedData);
      alert('Animal updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating animal:', err);
    }
  };
};

export default EditAnimal;
