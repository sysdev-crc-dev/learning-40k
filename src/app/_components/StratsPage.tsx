import { Accordion } from "@/components/ui/accordion";
import dataServiceInst from "../../../services/Data.service";

import parseDescriptions from "../../../utils/parseDescriptions";
import PhaseComponent from "./Phase";
import PhaseAccordion from "./PhaseAccordion";

export default function StratsPage({ detachment }: { detachment: string }) {
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

  return (
    <div className="dark font-[family-name:var(--font-geist-sans)] px-2">
      <main className="flex flex-col gap-1">
        <Accordion type="single" collapsible>
          <PhaseComponent name="Command Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Command phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Movement Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Movement phase"]} />
            <PhaseAccordion strats={grouped["Movement or Charge phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Shooting Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Shooting phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Charge Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Charge phase"]} />
            <PhaseAccordion strats={grouped["Movement or Charge phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Fight Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Fight phase"]} />
          </PhaseComponent>
        </Accordion>
      </main>
    </div>
  );
}
