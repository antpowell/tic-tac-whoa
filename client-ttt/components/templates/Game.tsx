import { RestartBtn } from '../atoms/RestartBtn';
import { BattleStageLarge } from '../organisms/BattleStageLarge';
import { GameBoard } from '../organisms/GameBoard';

export const Game = () => {
  return (
    <>
      <BattleStageLarge />
      <GameBoard />
      <RestartBtn />
    </>
  );
};
