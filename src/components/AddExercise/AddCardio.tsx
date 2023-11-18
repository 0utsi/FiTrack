import axios from 'axios'
import '../../style/addPanel.css'
import { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddCardio = () => {

    const [exercise, setExercise] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState('')

    const send = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("poszlo")
        axios.post('http://localhost:3000/cardio', {
            "exerciseName": exercise,
            "distance": distance,
            "duration": duration,
            "date": date
        })
            .then(response => {
                console.log('Dane zostały wysłane', response.data);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania danych:', error);
            });
    };

    return (
        <div className="panel">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
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
                    id="distance"
                    label="Distance [m]"
                    variant="filled"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
                <TextField
                    id="duration"
                    label="Duration [min]"
                    variant="filled"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
}

export default AddCardio;
