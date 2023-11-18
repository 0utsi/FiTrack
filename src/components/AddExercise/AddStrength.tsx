import axios from 'axios';
import React, { useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddStrength = () => {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [date, setDate] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/strength', {
        exerciseName: exercise,
        weight: weight,
        sets: sets,
        repetitions: repetitions,
        date: date,
      })
      .then((response) => {
        console.log('Dane zostały wysłane', response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania danych:', error);
      });
  };

  return (
    <div className="panel">
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={send}
      >
        <TextField
          id="exercise"
          label="Exercise"
          variant="filled"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <TextField
          id="weight"
          label="Weight [kg]"
          variant="filled"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          id="sets"
          label="Sets"
          variant="filled"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <TextField
          id="repetitions"
          label="Repetitions"
          variant="filled"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
        />
        <TextField
          id="date"
          variant="filled"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <SaveIcon type="submit" />
      </Box>
    </div>
  );
};

export default AddStrength;
