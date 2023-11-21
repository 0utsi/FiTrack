import StrengthExercise  from './strengthExercise.interface';

interface StrengthSet {
  id: number;
  weight: number;
  repetitions: number;
  strengthExercise: StrengthExercise;
}

export default StrengthSet;