import axios from 'axios'
import '../style/addCardio.css'
import { useState } from 'react'

const AddCardio = () => {

	const [exercise, setExercise] = useState('')
	const [duration, setDuration] = useState('')
	const [date, setDate] = useState('')

	const send = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		console.log("poszlo")
		axios.post('http://localhost:3000/cardio', {
			"exerciseName": exercise,
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



	return <div className="panel">
		<label>Add Cardio</label>
		<form id="form" onSubmit={send}>
		<input
			type="text"
			id="exercise"
			placeholder="Exercise"
			value={exercise}
			onChange={(e) => setExercise(e.target.value)}
		/>
		<input
			type="text"
			id="duration"
			placeholder="Duration"
			value={duration}onChange={(e) => setDuration(e.target.value)}
			/>
		<input
			type="date"
			id="date"
			placeholder="Date"
			value={date} onChange={(e) => setDate(e.target.value)}
		/>

		</form>
		<button type="submit" id="submit">Dodaj</button>
	</div>

}

export default AddCardio