import { StrengthSet } from "./strengthSet.interface";
export interface StrengthExercise {
	exerciseName: string;
	date: Date;
	sets: StrengthSet[];
  }