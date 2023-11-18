import { useState } from "react";
import CardioH from "./CardioH";
import '../../style/history.css';
import StrengthH from "./StrengthH";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const History = () => {
  const [showCardioHistory, setShowCardioHistory] = useState(true);

  return (
    <div className="history">
      <FormControl component="fieldset">
        <FormGroup row >
          <FormControlLabel
            control={<Checkbox checked={showCardioHistory} onChange={() => setShowCardioHistory(!showCardioHistory)} />}
            label={<span className="checkbox-label">Cardio History</span>}
            labelPlacement="end"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
          />
          <FormControlLabel
            control={<Checkbox checked={!showCardioHistory} onChange={() => setShowCardioHistory(!showCardioHistory)} />}
            label={<span className="checkbox-label">Strength History</span>}
            labelPlacement="end"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
          />
        </FormGroup>
      </FormControl>
      {showCardioHistory ? <CardioH /> : <StrengthH />}
    </div>
  );
};

export default History;
