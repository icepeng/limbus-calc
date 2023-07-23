export type AttackType = "참격" | "관통" | "타격";
export type SinType =
  | "분노"
  | "색욕"
  | "나태"
  | "탐식"
  | "우울"
  | "오만"
  | "질투";

export interface EnemyData {
  name: string;
  skills: EnemySkillData[];
}

export interface EnemySkillData {
  name: string;
  basePower: number;
  coinPower: number;
  coinAmount: number;
  attackType: AttackType;
  sinType: SinType;
  levelModifier: number;
}

export const EnemyData: EnemyData[] = [
  {
    name: "되살아난 K사 3등급 직원 - 강화",
    skills: [
      {
        name: "거수자 발견",
        basePower: 6,
        coinPower: 6,
        coinAmount: 1,
        attackType: "타격",
        sinType: "탐식",
        levelModifier: 2,
      },
      {
        name: "제압",
        basePower: 6,
        coinPower: 4,
        coinAmount: 2,
        attackType: "타격",
        sinType: "탐식",
        levelModifier: 2,
      },
      {
        name: "거수자 차단",
        basePower: 5,
        coinPower: 3,
        coinAmount: 4,
        attackType: "타격",
        sinType: "탐식",
        levelModifier: 2,
      },
    ],
  },
  {
    name: "되살아난 K사 1등급 직원 (도끼)",
    skills: [
      {
        name: "침입자 저지",
        basePower: 4,
        coinPower: 6,
        coinAmount: 1,
        attackType: "참격",
        sinType: "탐식",
        levelModifier: 5,
      },
      {
        name: "출입 금지",
        basePower: 6,
        coinPower: 6,
        coinAmount: 1,
        attackType: "참격",
        sinType: "탐식",
        levelModifier: 5,
      },
      {
        name: "출입 차단",
        basePower: 5,
        coinPower: 4,
        coinAmount: 2,
        attackType: "참격",
        sinType: "탐식",
        levelModifier: 5,
      },
    ],
  },
  {
    name: "되살아난 로보토미 E.G.O::출렁임",
    skills: [
      {
        name: "제압 액체",
        basePower: 3,
        coinPower: 7,
        coinAmount: 1,
        attackType: "타격",
        sinType: "탐식",
        levelModifier: 0,
      },
      {
        name: "폭발하는 액체",
        basePower: 4,
        coinPower: 7,
        coinAmount: 1,
        attackType: "타격",
        sinType: "나태",
        levelModifier: 0,
      },
      {
        name: "흔들리는 액체",
        basePower: 5,
        coinPower: 3,
        coinAmount: 2,
        attackType: "타격",
        sinType: "탐식",
        levelModifier: 0,
      },
    ],
  },
  {
    name: "되살아난 로보토미 E.G.O::홍적",
    skills: [
      {
        name: "상처 저주",
        basePower: 4,
        coinPower: 7,
        coinAmount: 1,
        attackType: "타격",
        sinType: "색욕",
        levelModifier: 7,
      },
      {
        name: "늘어나는 저주",
        basePower: 5,
        coinPower: 3,
        coinAmount: 2,
        attackType: "타격",
        sinType: "색욕",
        levelModifier: 7,
      },
      {
        name: "속박 저주",
        basePower: 6,
        coinPower: 3,
        coinAmount: 2,
        attackType: "타격",
        sinType: "색욕",
        levelModifier: 7,
      },
      {
        name: "부각된 상처",
        basePower: 3,
        coinPower: 3,
        coinAmount: 3,
        attackType: "타격",
        sinType: "색욕",
        levelModifier: 7,
      },
    ],
  },
];
