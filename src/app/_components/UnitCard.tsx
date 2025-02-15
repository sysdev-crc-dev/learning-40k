import React from "react";
import DatasheetCard from "./DatasheetCard";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import KeywordsCard from "./KeywordsCard";
import UnitCompositionCard from "./UnitCompositionCard";
import WeaponsAccordion from "./WeaponsAccordion";
import RuleCard from "./RuleCard";
import { UnitClass, WeaponClass } from "../../../types/force";
type Props = {
  unit: UnitClass;
  rules: Map<string, string | null>;
};

export type WeaponWithRules = {
  weapon: WeaponClass;
  rules: Map<string, string>;
};

const UnitCard = ({ unit, rules }: Props) => {
  console.log(unit);
  let abilities: [string, string][] = [];
  if (unit.abilities["Abilities"]) {
    abilities = Array.from(unit.abilities["Abilities"].entries());
  }
  let ranged: WeaponWithRules[] = [];
  if (unit.weapons["Ranged Weapons"]) {
    ranged = [...unit.weapons["Ranged Weapons"]?.entries()].flatMap(
      (value) => ({ weapon: value[1], rules: unit.weaponRules })
    ) as WeaponWithRules[];
  }
  let melee: WeaponWithRules[] = [];
  if (unit.weapons["Melee Weapons"]) {
    melee = [...unit.weapons["Melee Weapons"]?.entries()].flatMap((value) => ({
      weapon: value[1],
      rules: unit.weaponRules,
    })) as WeaponWithRules[];
  }

  return (
    <div className="flex gap-4 flex-col ">
      {unit.modelsStats.map((profile) => (
        <div
          className="flex flex-col gap-2 p-4 sm:pl-4 border-2 rounded-sm border-dotted"
          key={profile.id}
        >
          <Badge className="mr-4 w-full sm:w-fit" variant={"default"}>
            {profile.name}
          </Badge>
          <DatasheetCard stats={profile.getCharacteristics()} />
        </div>
      ))}

      <Accordion type="single" collapsible>
        <AccordionItem value="Invuln" disabled>
          <AccordionTrigger
            className="p-2 ml-2 sm:pl-4 text-primary-foreground bg-accent-foreground rounded-lg"
            disabled
          >
            Invulnerable Save:{" "}
            <div className="flex ml-2 mr-auto">
              <Badge variant={"secondary"}>{unit.invulSave}</Badge>
            </div>
          </AccordionTrigger>
        </AccordionItem>
        <div className="flex flex-wrap flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180">
          <div className="w-full  p-2 ml-2 sm:pl-4 text-primary-foreground bg-accent-foreground rounded-lg">
            Abilities
          </div>
          <div className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pl-4">
            <div className="flex gap-2 flex-wrap mt-2">
              {abilities
                .filter(([k]) => k !== "Leader")
                .map(([key, value]) => (
                  <div key={key}>
                    <RuleCard title={key} variant={"secondary"}>
                      {value}
                    </RuleCard>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <WeaponsAccordion value="Ranged" weapons={ranged} rules={rules} />
        <WeaponsAccordion value="Melee" weapons={melee} rules={rules} />

        <AccordionItem value="Models">
          <AccordionTrigger className="pl-4 sm:pl-4">Models</AccordionTrigger>
          <AccordionContent className="pl-4 sm:pl-4">
            <UnitCompositionCard model={unit.modelList} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Keywords">
          <AccordionTrigger className="pl-4 sm:pl-4">Keywords</AccordionTrigger>
          <AccordionContent className="pl-4 sm:pl-4">
            <KeywordsCard keywords={unit.keywords} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UnitCard;
