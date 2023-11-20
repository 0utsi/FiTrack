import axios from 'axios'
import '../../style/addPanel.less'
import { useState } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, AlertTitle } from '@mui/material';
import '../../style/addPanel.less'

const AddCardio = () => {
	const [isSend, setIsSend] = useState(false)
    const [exercise, setExercise] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState('')

    const send = () => {
        axios.post('http://localhost:3000/cardio', {
            "exerciseName": exercise,
            "distance": distance,
            "duration": duration,
            "date": date
        })
            .then(response => {
				const id = window.setInterval(() => hideAlert(id), 3000);
				setIsSend(true)
                console.log('Dane zostały wysłane', response.data);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania danych:', error);
            });
    };

	const hideAlert = (id: number) => {
		setIsSend(false)
		clearInterval(id)
	}

    return (
        <div className="panel">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '30ch' },
					color: 'white'
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
                    label="Distance [m]"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
                <TextField
                    label="Duration [min]"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Box>
			<SaveIcon type="submit" className='sendbtn' onClick={send}/>
			<Alert severity="success" className='alert' style={!isSend ? { display: 'none' } : {}}>
				<AlertTitle><strong>Success</strong></AlertTitle>Cardio data has been saved successfully.
			</Alert>
        </div>
    );
}

export default AddCardio;
