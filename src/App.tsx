import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { BattleReport, Skill, generateReport } from "./logic";
import { calculateClash } from "./logic/clash";
import { renderPercentage } from "./render";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

function App() {
  const mySkillForm = useForm<Skill>({
    defaultValues: {
      basePower: 0,
      coinPower: 0,
      coinAmount: 1,
      headRatio: 0.5,
    },
  });
  const opponentSkillForm = useForm<Skill>({
    defaultValues: {
      basePower: 0,
      coinPower: 0,
      coinAmount: 1,
      headRatio: 0.5,
    },
  });
  const [battleReport, setBattleReport] = useState<BattleReport>();

  function calculate() {
    const mySkill = mySkillForm.getValues();
    const opponentSkill = opponentSkillForm.getValues();
    const clashResult = calculateClash(mySkill, opponentSkill);
    const report = generateReport(mySkill, opponentSkill, clashResult);
    setBattleReport(report);
  }

  return (
    <>
      <header className="py-medium px-xxlarge bg-layer-2 border-b-2 stroke-decorative-1">
        <span className="heading-medium fg-neutral-text">LimbusCalc</span>
      </header>
      <main className="flex flex-wrap my-medium mx-xxlarge gap-small fg-neutral-text">
        <Card className="w-320">
          <CardHeader>
            <CardTitle>내 스킬</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-small">
            <div>
              <label className="body-small">기본 위력</label>
              <Input
                {...mySkillForm.register("basePower", { valueAsNumber: true })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">코인 위력</label>
              <Input
                {...mySkillForm.register("coinPower", { valueAsNumber: true })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">코인 개수</label>
              <Input
                {...mySkillForm.register("coinAmount", { valueAsNumber: true })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">앞면 확률</label>
              <Input
                {...mySkillForm.register("headRatio", { valueAsNumber: true })}
                type="number"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-320">
          <CardHeader>
            <CardTitle>적 스킬</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-small">
            <div>
              <label className="body-small">기본 위력</label>
              <Input
                {...opponentSkillForm.register("basePower", {
                  valueAsNumber: true,
                })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">코인 위력</label>
              <Input
                {...opponentSkillForm.register("coinPower", {
                  valueAsNumber: true,
                })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">코인 개수</label>
              <Input
                {...opponentSkillForm.register("coinAmount", {
                  valueAsNumber: true,
                })}
                type="number"
              />
            </div>
            <div>
              <label className="body-small">앞면 확률</label>
              <Input
                {...opponentSkillForm.register("headRatio", {
                  valueAsNumber: true,
                })}
                type="number"
              />
            </div>
            <Button onClick={calculate}>계산</Button>
          </CardContent>
        </Card>
        <Card className="w-320">
          <CardHeader>
            <CardTitle>결과 - 승리</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-small">
            {battleReport && (
              <span className="body-small">
                승리 확률: {renderPercentage(battleReport?.myWinProb)}
              </span>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>잔여 코인</TableHead>
                  <TableHead>확률</TableHead>
                  <TableHead>피해량</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {battleReport &&
                  battleReport.myWinResults.map((result) => (
                    <TableRow key={result.coinLeft}>
                      <TableCell>{result.coinLeft}</TableCell>
                      <TableCell>{renderPercentage(result.prob)}</TableCell>
                      <TableCell>
                        {result.minDamage} ~ {result.maxDamage}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="w-320">
          <CardHeader>
            <CardTitle>결과 - 패배</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-small">
            {battleReport && (
              <span className="body-small">
                패배 확률: {renderPercentage(battleReport?.opponentWinProb)}
              </span>
            )}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>잔여 코인</TableHead>
                  <TableHead>확률</TableHead>
                  <TableHead>피해량</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {battleReport &&
                  battleReport.opponentWinResults.map((result) => (
                    <TableRow key={result.coinLeft}>
                      <TableCell>{result.coinLeft}</TableCell>
                      <TableCell>{renderPercentage(result.prob)}</TableCell>
                      <TableCell>
                        {result.minDamage} ~ {result.maxDamage}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default App;
