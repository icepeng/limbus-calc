import { ClashResult, Skill, getMaxDamage, getMinDamage } from ".";

export interface BattleReport {
  myWinProb: number;
  opponentWinProb: number;
  myWinResults: BattleResult[];
  opponentWinResults: BattleResult[];
}

export interface BattleResult {
  prob: number;
  coinLeft: number;
  minDamage: number;
  maxDamage: number;
}

export function generateReport(
  mySkill: Skill,
  opponentSkill: Skill,
  { myWins, opponentWins }: ClashResult
): BattleReport {
  const myWinProb = myWins.reduce((acc, cur) => acc + cur, 0);
  const opponentWinProb = opponentWins.reduce((acc, cur) => acc + cur, 0);

  const myWinResults = myWins.slice(1).map((prob, index) => {
    const coinLeft = index + 1;
    const minDamage = getMinDamage(mySkill, coinLeft);
    const maxDamage = getMaxDamage(mySkill, coinLeft);
    return { prob, coinLeft, minDamage, maxDamage };
  });
  const opponentWinResults = opponentWins.slice(1).map((prob, index) => {
    const coinLeft = index + 1;
    const minDamage = getMinDamage(opponentSkill, coinLeft);
    const maxDamage = getMaxDamage(opponentSkill, coinLeft);
    return { prob, coinLeft, minDamage, maxDamage };
  });

  return {
    myWinProb,
    opponentWinProb,
    myWinResults,
    opponentWinResults,
  };
}
