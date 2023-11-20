import axios from 'axios';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import '../../style/addPanel.less';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle } from '@mui/material';

const AddStrength = () => {
  const [isSend, setIsSend] = useState(false);
  const [exercise, setExercise] = useState('');
  const [date, setDate] = useState('');

  // Dane dla każdego zestawu
  const [sets, setSets] = useState([
    { repetitions: '', weight: '' },
    // Dodaj tyle elementów, ile chcesz domyślnie mieć zestawów
  ]);

  const [additionalSets, setAdditionalSets] = useState(1);

  const send = (e: React.FormEvent) => {
    e.preventDefault();

    // Przygotuj dane dla wielu serii
    const seriesData = sets.map((set) => ({
      repetitions: set.repetitions,
      weight: set.weight,
    }));

    axios
      .post('http://localhost:3000/strength', {
        exerciseName: exercise,
        date: date,
        series: seriesData,
      })
      .then((response) => {
        const id = window.setInterval(() => hideAlert(id), 3000);
        setIsSend(true);
        console.log('Dane zostały wysłane', response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania danych:', error);
      });
  };

  const hideAlert = (id: number) => {
    setIsSend(false);
    clearInterval(id);
  };

  const handleAdditionalSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalSets(Number(e.target.value));

    setSets((prevSets) => {
      const newSets = Array.from({ length: Number(e.target.value) }, (_, index) => prevSets[index] || { repetitions: '', weight: '' });
      return newSets;
    });
  };

  const handleSetChange = (index: number, field: keyof typeof sets[0], value: string) => {
    setSets((prevSets) => {
      const newSets = [...prevSets];
      newSets[index][field] = value;
      return newSets;
    });
  };

  const additionalFields = [];
  for (let i = 0; i < additionalSets; i++) {
    additionalFields.push(
      <Box key={i} sx={{ marginBottom: 0 }} className='setsField'>
        <TextField
			label={`Repetitions - Set ${i + 1}`}
			size='small'
			type="number"
			value={sets[i]?.repetitions || ''}
			onChange={(e) => handleSetChange(i, 'repetitions', e.target.value)}
        />
        <TextField
			label={`Weight [kg]`}
			size='small'
			type="number"
			value={sets[i]?.weight || ''}
			onChange={(e) => handleSetChange(i, 'weight', e.target.value)}
        />
      </Box>
    );
  }

  return (
    <div className="panel">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={send}
      >
        <TextField
          label="Exercise"
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Number of Sets"
          type="number"
          value={additionalSets}
          onChange={handleAdditionalSetsChange}
        />
        {additionalFields}
      </Box>
      <SaveIcon className="sendbtn" type="submit" onClick={send} />
      <Alert
        severity="success"
        className="alert"
        style={!isSend ? { display: 'none' } : {}}
      >
        <AlertTitle>
          <strong>Success</strong>
        </AlertTitle>
        Strength data has been saved successfully.
      </Alert>
    </div>
  );
};

export default AddStrength;
