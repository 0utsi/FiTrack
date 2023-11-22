import  StrengthSet  from "./strengthSet.interface";
interface StrengthExercise {
	id?: number;
	exerciseName: string;
	date: string;
	sets: StrengthSet[];
  }

export default StrengthExercise