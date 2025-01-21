import { Accordion } from "@/components/ui/accordion";
import dataServiceInst from "../../../services/Data.service";

import parseDescriptions from "../../../utils/parseDescriptions";
import PhaseComponent from "./Phase";
import PhaseAccordion from "./PhaseAccordion";
import { Stratagem } from "../../../types";
import { Force } from "../../../types/force";
import { Phases } from "./ForcePage";

export default function StratsPage({
  detachment,
  abilities,
}: {
  detachment: string;
  forces: Force[];
  abilities: Record<Phases, [string, string][]>;
}) {
  const stratsRelevant = dataServiceInst
    .getStratagems()
    .filter(
      (strat) => strat.type.includes("Core") || strat.detachment === detachment
    )
    .filter((strat) => strat.id !== 8539002)
    .map((strat) => ({
      ...strat,
      description: parseDescriptions(strat.description as string),
    }));

  const grouped = Object.groupBy(stratsRelevant, ({ phase }) => phase);

  const cp = [
    ...(grouped["Any phase"] as Stratagem[]),
    ...(grouped["Command phase"] as Stratagem[]),
  ];
  const mp = [
    ...(grouped["Any phase"] as Stratagem[]),
    ...(grouped["Movement phase"] as Stratagem[]),
    ...(grouped["Movement or Charge phase"] as Stratagem[]),
  ];
  const sp = [
    ...(grouped["Any phase"] as Stratagem[]),
    ...(grouped["Shooting phase"] as Stratagem[]),
  ];
  const chp = [
    ...(grouped["Any phase"] as Stratagem[]),
    ...(grouped["Charge phase"] as Stratagem[]),
    ...(grouped["Movement or Charge phase"] as Stratagem[]),
  ];
  const fp = [
    ...(grouped["Any phase"] as Stratagem[]),
    ...(grouped["Fight phase"] as Stratagem[]),
  ];

  console.log(abilities);

  return (
    <div className="dark font-[family-name:var(--font-geist-sans)] px-2">
      <main className="flex flex-col gap-1">
        <Accordion type="single" collapsible>
          <PhaseComponent name="Command Phase">
            <Accordion type="single" collapsible>
              <PhaseAccordion
                strats={cp}
                abilities={[
                  ...abilities["any phase"],
                  ...abilities["command phase"],
                ]}
              />
            </Accordion>
          </PhaseComponent>
          <PhaseComponent name="Movement Phase">
            <Accordion type="single" collapsible>
              <PhaseAccordion
                strats={mp}
                abilities={[
                  ...abilities["any phase"],
                  ...abilities["movement phase"],
                ]}
              />
            </Accordion>
          </PhaseComponent>
          <PhaseComponent name="Shooting Phase">
            <Accordion type="single" collapsible>
              <PhaseAccordion
                strats={sp}
                abilities={[
                  ...abilities["any phase"],
                  ...abilities["shooting phase"],
                ]}
              />
            </Accordion>
          </PhaseComponent>
          <PhaseComponent name="Charge Phase">
            <Accordion type="single" collapsible>
              <PhaseAccordion
                strats={chp}
                abilities={[
                  ...abilities["any phase"],
                  ...abilities["charge phase"],
                ]}
              />
            </Accordion>
          </PhaseComponent>
          <PhaseComponent name="Fight Phase">
            <Accordion type="single" collapsible>
              <PhaseAccordion
                strats={fp}
                abilities={[
                  ...abilities["any phase"],
                  ...abilities["fight phase"],
                ]}
              />
            </Accordion>
          </PhaseComponent>
        </Accordion>
      </main>
    </div>
  );
}
