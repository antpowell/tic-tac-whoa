import getGameContext from '../state/GameContextState/GameContextState';
import { SquareState } from '../SquareState';

const { gameBoard } = getGameContext();

export const createGameBoard = () => {
  const elements: [string, SquareState][] = [];
  Object.entries(gameBoard.value).forEach(key => {
    elements.push(key);
  });
  return elements;
};
