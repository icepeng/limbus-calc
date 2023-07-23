export interface Skill {
  basePower: number;
  coinPower: number;
  coinAmount: number;
  headRatio: number;
}

function clampPower(value: number) {
  return Math.max(0, value);
}

export function getPower(skill: Skill, headAmount: number) {
  return clampPower(skill.basePower + skill.coinPower * headAmount);
}
