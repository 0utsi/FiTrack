import  StrengthSet  from "./strengthSet.interface";
interface StrengthExercise {
	id: number;
	exerciseName: string;
	date: Date;
	sets: StrengthSet[];
  }

export default StrengthExercise