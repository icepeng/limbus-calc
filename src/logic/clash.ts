import { Skill, getPower } from "./skill";
import { binom, normalizeProbs } from "./statistics";

export interface ClashResult {
  myWins: number[];
  opponentWins: number[];
}

function calculateCoinToss(mySkill: Skill, opponentSkill: Skill) {
  let myWinProb = 0;
  let opponentWinProb = 0;

  const myProbs = Array.from({ length: mySkill.coinAmount + 1 }, (_, i) =>
    binom(mySkill.coinAmount, i, mySkill.headRatio)
  );
  const opponentProbs = Array.from(
    { length: opponentSkill.coinAmount + 1 },
    (_, i) => binom(opponentSkill.coinAmount, i, opponentSkill.headRatio)
  );

  for (let i = 0; i <= mySkill.coinAmount; i++) {
    for (let j = 0; j <= opponentSkill.coinAmount; j++) {
      const prob = myProbs[i] * opponentProbs[j];
      const myPower = getPower(mySkill, i);
      const opponentPower = getPower(opponentSkill, j);

      if (myPower > opponentPower) {
        myWinProb += prob;
      } else if (myPower < opponentPower) {
        opponentWinProb += prob;
      }
    }
  }

  return {
    myWinProb,
    opponentWinProb,
  };
}

export function calculateClash(
  mySkill: Skill,
  opponentSkill: Skill
): ClashResult {
  const myWins = Array.from({ length: mySkill.coinAmount + 1 }, () => 0);
  const opponentWins = Array.from(
    { length: opponentSkill.coinAmount + 1 },
    () => 0
  );

  function rec(myCoinLeft: number, opponentCoinLeft: number, prob: number) {
    if (myCoinLeft === 0 && opponentCoinLeft === 0) {
      throw new Error("should not happen");
    }

    if (myCoinLeft === 0) {
      opponentWins[opponentCoinLeft] += prob;
      return;
    }

    if (opponentCoinLeft === 0) {
      myWins[myCoinLeft] += prob;
      return;
    }

    const { myWinProb, opponentWinProb } = calculateCoinToss(
      mySkill,
      opponentSkill
    );
    const [myWinProbNormalized, opponentWinProbNormalized] = normalizeProbs(
      myWinProb,
      opponentWinProb
    );

    rec(myCoinLeft, opponentCoinLeft - 1, prob * myWinProbNormalized);
    rec(myCoinLeft - 1, opponentCoinLeft, prob * opponentWinProbNormalized);
  }

  rec(mySkill.coinAmount, opponentSkill.coinAmount, 1);

  return {
    myWins,
    opponentWins,
  };
}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;

  describe("calculateCoinToss", () => {
    it("should be equal when both skill is identical", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };
      const opponentSkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const { myWinProb, opponentWinProb } = calculateCoinToss(
        mySkill,
        opponentSkill
      );

      // then
      expect(myWinProb - opponentWinProb).toBe(0.0);
    });

    it("should be 100% when my min is higher than opponents max", () => {
      // given
      const mySkill: Skill = {
        basePower: 100,
        coinPower: 1,
        coinAmount: 1,
        headRatio: 0.5,
      };
      const opponentSkill: Skill = {
        basePower: 0,
        coinPower: 1,
        coinAmount: 1,
        headRatio: 0.5,
      };

      // when
      const { myWinProb } = calculateCoinToss(mySkill, opponentSkill);

      // then
      expect(myWinProb).toBe(1);
    });
  });

  describe("calculateClash", () => {
    it("total prob sum should be 1.0", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };
      const opponentSkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const { myWins, opponentWins } = calculateClash(mySkill, opponentSkill);

      // then
      const total = [...myWins, ...opponentWins].reduce(
        (acc, cur) => acc + cur,
        0
      );
      expect(total).toBe(1.0);
    });

    it("should be equal when both skill is identical", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };
      const opponentSkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const { myWins, opponentWins } = calculateClash(mySkill, opponentSkill);

      // then
      expect(myWins).toEqual(opponentWins);
    });
  });
}
