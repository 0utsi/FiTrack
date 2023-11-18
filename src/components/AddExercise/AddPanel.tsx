import { useState } from "react";
import AddCardio from "./AddCardio";
import AddStrength from "./AddStrength";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
const AddPanel = () => {
	const [showCardio, setShowCardio] = useState(true);

	const toggleComponent = () => {
		setShowCardio(!showCardio);
	};

	return (
	<div className="addPanel">
		<FormControl component="fieldset">
			<FormGroup aria-label="position" row>
			<FormControlLabel
				value="top"
				control={<Checkbox checked={showCardio} onChange={toggleComponent} />}
				label={<span className="checkbox-label">Cardio Exercise</span>}
				labelPlacement="end"
				sx={{ '& .MuiSvgIcon-root': { fontSize: 18 }}}
			/>
			<FormControlLabel
				value="top"
				control={<Checkbox checked={!showCardio} onChange={toggleComponent} />}
				label={<span className="checkbox-label">Strength Exercise</span>}
				labelPlacement="end"
				sx={{ '& .MuiSvgIcon-root': { fontSize: 18 }}}
			/>
			</FormGroup>
		</FormControl>
    {showCardio ? <AddCardio /> : <AddStrength />}
	</div>
	);
}

export default AddPanel;