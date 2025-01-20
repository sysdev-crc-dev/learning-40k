import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import UnitCard from "./UnitCard";
import { Force, RosterClass } from "../../../types/force";

const ForcePage = ({ force, cost }: { force: Force; cost: string }) => {
  const units = force.units.map((unit) => (
    <AccordionItem key={unit.id} value={unit.name}>
      <AccordionTrigger>{unit.name}</AccordionTrigger>
      <AccordionContent>
        <UnitCard unit={unit} rules={force.rules} />
      </AccordionContent>
    </AccordionItem>
  ));
  return (
    <div className="dark font-[family-name:var(--font-geist-sans)] px-2">
      <main className="flex flex-col gap-1">
        <h2>
          {force.catalog} - {force.name} - {cost}
        </h2>
        <Accordion type="single" collapsible>
          {units}
        </Accordion>
      </main>
    </div>
  );
};

export default function AbilitiesPage({ roster }: { roster: RosterClass }) {
  if (!roster) return "Incorrect parsing";
  const force = roster.forces.map((f) => (
    <ForcePage key={f.name} force={f} cost={roster.costs.toString()} />
  ));

  return <div>{force}</div>;
}
