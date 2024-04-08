import { Button } from "@/components/atoms/button";
import { Dialog } from "@/components/organisms/Dialog";
import { GameBoard } from "@/components/organisms/GameBoard";
import { GameContextSignal } from "@/utils/GameContextState";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-between bg-neutral-800 p-8">
      <nav className="flex">
        <h1 className="">Tic-Tac-WHOA</h1>
      </nav>
      <GameBoard />
      {GameContextSignal.value.gameStatus === "GameOver" && (
        <Button value={"Play Again"} />
      )}
      {/* <InputComponent name="name" label="Name" placeholder="Enter your name" /> */}
      <Dialog />
    </main>
  );
}
