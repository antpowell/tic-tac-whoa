export interface PlayerMoveResponseType {
  event: string;
  data: {
    currentPlayer: 'Player1' | 'Player2';
    whoseTurn: 'Player1' | 'Player2';
    square: number;
  };
}
