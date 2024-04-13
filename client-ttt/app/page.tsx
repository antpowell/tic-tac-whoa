import { Game } from '@/components/templates/Game';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-around">
      <div className="flex items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Tic-Tac-WHOA</h1>
      </div>
      <div>
        <Game />
      </div>
    </main>
  );
}
