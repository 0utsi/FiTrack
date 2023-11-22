import { GetDataContextCtx } from "../../providers/DataGetContextProvider";
import { useContext } from "react";
import '../../style/statistics.less'
import { Card, CardContent, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightHanging, faPersonRunning } from '@fortawesome/free-solid-svg-icons';

const Statistics = () => {
  const { statisticsData } = useContext(GetDataContextCtx);
  const { totalWeight, totalDistance } = statisticsData


  return (
    <div className="statistics">
      <Card>
        <CardContent>
          <Typography component="div" variant="body2" marginBottom={0.5}>
            Total Weight Lifted
          </Typography>
          <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" >
            <span>{totalWeight / 1000} [T]</span>
            <FontAwesomeIcon icon={faWeightHanging} style={{ marginLeft: 'auto', fontSize: '17px' }} />
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography component="div" variant="body2" marginBottom={0.5}>
            Total Distance Travelled
          </Typography>
          <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" >
            <span>{totalDistance / 1000} [KM]</span>
            <FontAwesomeIcon icon={faPersonRunning} style={{ marginLeft: 'auto', fontSize: '20px' }} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
