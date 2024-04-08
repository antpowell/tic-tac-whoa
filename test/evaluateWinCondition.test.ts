import { findWinner } from "@/utils/GameFunctions/evaluateWinCondition";
import { describe, expect, it } from "vitest";

describe("evaluateWinCondition", () => {
  const winningPlayerPosition = [
    [0, 7, 5, 1, 2],
    [1, 3, 4, 5, 8],
    [2, 5, 1, 8, 6],
    [8, 1, 4, 7],
  ];

  const nonWinningPlayerPosition = [
    [0, 3, 7, 4],
    [1, 3, 7, 5, 8],
    [2, 5, 1, 7, 6],
    [8, 1, 3, 7],
  ];

  it("should return true if player has won", () => {
    winningPlayerPosition.forEach((winningPlayerPosition) => {
      expect(findWinner(winningPlayerPosition)).toBe(true);
    });
  });

  it("should return false if player has not won", () => {
    nonWinningPlayerPosition.forEach((nonWinningPlayerPosition) => {
      expect(findWinner(nonWinningPlayerPosition)).toBe(false);
    });
  });
});
