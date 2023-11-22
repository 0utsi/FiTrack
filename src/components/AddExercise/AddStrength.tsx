import React, { useContext, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { PostDataContextCtx } from '../../providers/DataPostContextProvider';

const AddStrength = () => {
  const [isSend, setIsSend] = useState(false);
  const [exercise, setExercise] = useState('');
  const [date, setDate] = useState('');
  const { addStrengthData } = useContext(PostDataContextCtx);
  const [sets, setSets] = useState([{ repetitions: 0, weight: 0 }]);
  const [additionalSets, setAdditionalSets] = useState(1);

  const send = (e: React.FormEvent) => {
    e.preventDefault();

    const setsData = sets.map((set) => ({
      repetitions: set.repetitions || 0,
      weight: set.weight|| 0,
    }));

    const strengthData = {
      exerciseName: exercise,
      date: date,
      sets: setsData,
    };

    addStrengthData(strengthData).then(() => {
      setIsSend(true);
      const id = window.setInterval(() => hideAlert(id), 3000);
    });
  };

  const hideAlert = (id: number) => {
    setIsSend(false);
    clearInterval(id);
  };

  const handleAdditionalSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAdditionalSets(value);

    setSets((prevSets) => {
      const newSets = Array.from(
        { length: value },
        (_, index) => prevSets[index] || { repetitions: '', weight: '' }
      );
      return newSets;
    });
  };

  const handleSetChange = (index: number, field: keyof typeof sets[0], value: number) => {
    setSets((prevSets) => {
      const newSets = [...prevSets];
      newSets[index][field] = value;
      return newSets;
    });
  };

  const additionalFields = sets.map((set, index) => (
    <Grid item key={index} sx={{ marginBottom: 0, padding: 0 }} className='setsField'>
      <TextField
        label={`Reps - Set ${index + 1}`}
        size='small'
        type="number"
        value={set.repetitions}
        onChange={(e) => handleSetChange(index, 'repetitions', Number(e.target.value))}
        sx={{ fontSize: 9, padding: 0, width: 10, margin: 0 }}
      />
      <TextField
        label={`Weight [kg]`}
        size='small'
        type="number"
        value={set.weight}
        onChange={(e) => handleSetChange(index, 'weight', Number(e.target.value))}
        sx={{ fontSize: 9, padding: 0, width: 10, margin: 0 }}
      />
    </Grid>
  ));

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
        <Grid container spacing={0}>
          {additionalFields}
        </Grid>
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
