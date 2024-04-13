import dbService from '@/services/dbService';
import { EndGameDataType } from '@/types/EndGameDataType';

export const addToScoreBoard = async (endGameData: EndGameDataType) => {
  if (!endGameData) return;

  const { data, error } = await dbService().addToScoreBoard(endGameData);

  console.log(data, error);
};
