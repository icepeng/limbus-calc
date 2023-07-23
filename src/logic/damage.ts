import { Skill, getPower } from "./skill";

export function getDamage(skill: Skill, coinLeft: number, heads: boolean[]) {
  let damage = 0;
  let headCount = 0;
  for (let i = 0; i < coinLeft; i++) {
    if (heads[i]) {
      headCount++;
    }
    damage += getPower(skill, headCount);
  }
  return damage;
}

export function getMaxDamage(skill: Skill, coinLeft: number) {
  if (skill.coinPower < 0) {
    return getDamage(skill, coinLeft, Array(coinLeft).fill(false));
  }

  return getDamage(skill, coinLeft, Array(coinLeft).fill(true));
}

export function getMinDamage(skill: Skill, coinLeft: number) {
  if (skill.coinPower < 0) {
    return getDamage(skill, coinLeft, Array(coinLeft).fill(true));
  }

  return getDamage(skill, coinLeft, Array(coinLeft).fill(false));
}

if (import.meta.vitest) {
  const { it, describe, expect } = import.meta.vitest;

  describe("getMinDamage", () => {
    it("Plus Coin", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const damage = getMinDamage(mySkill, 3);

      // then
      expect(damage).toBe(12); // 4 + 4 + 4
    });

    it("Minus Coin", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: -2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const damage = getMinDamage(mySkill, 3);

      // then
      expect(damage).toBe(2); // 2 + 0 + 0
    });
  });

  describe("getMaxDamage", () => {
    it("Plus Coin", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: 2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const damage = getMaxDamage(mySkill, 3);

      // then
      expect(damage).toBe(24); // 6 + 8 + 10
    });

    it("Minus Coin", () => {
      // given
      const mySkill: Skill = {
        basePower: 4,
        coinPower: -2,
        coinAmount: 3,
        headRatio: 0.5,
      };

      // when
      const damage = getMaxDamage(mySkill, 3);

      // then
      expect(damage).toBe(12); // 4 + 4 + 4
    });
  });
}
