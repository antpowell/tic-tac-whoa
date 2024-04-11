import { RestartBtn } from '@/components/atoms/RestartBtn';
import { GameBoard } from '@/components/organisms/GameBoard';
import { GameSearchSideBar } from '@/components/organisms/GameSearchSideBar';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-around">
      <div>
        <div className="flex">
          <h1 className="text-3xl font-bold">Tic-Tac-WHOA</h1>
        </div>
        <div>
          <GameBoard />
          <RestartBtn />
        </div>
      </div>
    </main>
  );
}
