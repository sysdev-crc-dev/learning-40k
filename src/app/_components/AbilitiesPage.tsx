import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Test from "../../../lists/test.json";
import UpgradeCard from "./UpgradeCard";
import { SelectionModel, Unit, Upgrade } from "../../../types";
import ModelCard from "./ModelCard";
import UnitCard from "./UnitCard";
export default async function AbilitiesPage() {
  const list = Test.roster.forces[0].selections.map((value) => (
    <AccordionItem key={value.id} value={value.name}>
      <AccordionTrigger>
        {value.name}
        {value.name === "Detachment Choice" || value.name === "Battle Size"
          ? ` - ${value.selections[0].name}`
          : ""}
      </AccordionTrigger>
      <AccordionContent>
        {value.type === "upgrade" && (
          <UpgradeCard selection={value as unknown as Upgrade} />
        )}
        {value.type === "model" && (
          <ModelCard model={value as unknown as SelectionModel} />
        )}
        {value.type === "unit" && <UnitCard unit={value as unknown as Unit} />}
      </AccordionContent>
    </AccordionItem>
  ));

  return (
    <div className="dark font-[family-name:var(--font-geist-sans)] px-2">
      <main className="flex flex-col gap-1">
        <Accordion type="single" collapsible>
          {list}
        </Accordion>
      </main>
    </div>
  );
}
