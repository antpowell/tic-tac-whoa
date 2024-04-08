import { InputComponent } from "@/components/molecules/InputComponent";
import { Dialog, dialogSignal } from "@/components/organisms/Dialog";
import { GameBoard } from "@/components/organisms/GameBoard";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-between bg-neutral-800 p-8">
      <nav className="flex">
        <h1 className="">Tic-Tac-WHOA</h1>
      </nav>
      <GameBoard />
      {/* <InputComponent name="name" label="Name" placeholder="Enter your name" /> */}
      <Dialog />
    </main>
  );
}
