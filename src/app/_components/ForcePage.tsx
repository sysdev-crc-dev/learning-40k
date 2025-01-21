import React, { PropsWithChildren } from "react";
import { Force, RosterClass } from "../../../types/force";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AbilitiesPage from "./AbilitiesPage";
import StratsPage from "./StratsPage";
import { Badge } from "@/components/ui/badge";

type Props = {
  force: Force;
  roster: RosterClass;
};

export type Phases =
  | "any phase"
  | "command phase"
  | "movement phase"
  | "shooting phase"
  | "charge phase"
  | "fight phase";

const sortAbilitiesByPhase = (items: [string, string][]) => {
  const hasPhases = items.filter(([, d]) =>
    d.toLocaleLowerCase().includes("phase")
  );

  const phases: Phases[] = [
    "any phase",
    "command phase",
    "movement phase",
    "shooting phase",
    "charge phase",
    "fight phase",
  ];
  const res: Record<Phases, [string, string][]> = {
    "any phase": [],
    "charge phase": [],
    "command phase": [],
    "fight phase": [],
    "movement phase": [],
    "shooting phase": [],
  };
  for (const phase of phases) {
    res[phase] = hasPhases.filter(([, d]) =>
      d.toLocaleLowerCase().includes(phase)
    );
  }

  return res;
};

const ForcePage = ({ force, roster, children }: PropsWithChildren<Props>) => {
  const abilities = [...force.abilities];
  const abilitiesByPhase = sortAbilitiesByPhase(abilities);

  // console.log(abilities.filter(([k, d]) => d.toLowerCase().includes("ends")));

  // console.log(
  //   abilities.filter(([k, d]) => d.toLowerCase().includes("deployment"))
  // );

  const armyRule = [[...force.rules][0]];
  return (
    <main className=" h-[100vh]" key={force.name}>
      <h1 className="mt-1 px-2 mb-4 text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
        {force.name}
      </h1>
      <Accordion className="flex flex-col h-full" type="single" collapsible>
        <AccordionItem value="FileInput">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Change List
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Datasheets">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Datasheets
          </AccordionTrigger>
          <AccordionContent>
            <AbilitiesPage roster={roster} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Stratagems">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Stratagems
          </AccordionTrigger>
          <AccordionContent>
            <StratsPage
              detachment={force.faction}
              forces={roster.forces}
              abilities={abilitiesByPhase}
            />
          </AccordionContent>
        </AccordionItem>
        {[...force.factionRules.entries()].map(
          ([ruleName, ruleDescription]) => (
            <AccordionItem key={ruleName} value="Detachment">
              <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
                Detachment Rule
              </AccordionTrigger>
              <AccordionContent className="pl-2">
                <Badge>{ruleName}</Badge>
                <p className="mt-2 p-2">{ruleDescription}</p>
              </AccordionContent>
            </AccordionItem>
          )
        )}
        {armyRule.map(([ruleName, ruleDescription]) => (
          <AccordionItem key={ruleName} value="Army">
            <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
              Army Rule
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <Badge>{ruleName}</Badge>
              <div className="mt-2 p-2">
                {ruleDescription?.split("\n").map((str, idx) => (
                  <p className="mt-1" key={idx}>
                    {str}
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default ForcePage;
