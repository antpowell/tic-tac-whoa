import { RestartBtn } from '../atoms/RestartBtn';
import { BattleStage } from '../organisms/BattleStage';
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
