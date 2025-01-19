import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import WeaponSheetCard from "./WeaponSheetCard";
import { Profile } from "../../../types";
import { Badge } from "@/components/ui/badge";
import { WeaponClass } from "../../../types/force";
import { WeaponWithRules } from "./UnitCard";

type Props = {
  weapons: WeaponWithRules[];
  value: "Ranged" | "Melee";
  rules: Map<string, string | null>;
};

const WeaponsAccordion = ({ weapons, value, rules }: Props) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="pl-4 sm:pl-4">
        {value} Weapons
      </AccordionTrigger>
      <AccordionContent className="pl-4  sm:pl-4">
        <WeaponSheetCard.Header type={value === "Ranged" ? "r" : "m"} />
        {...weapons.map(({ weapon }) => {
          if (value) {
            return (
              <div
                className="flex flex-col justify-start mx-2 sm:mx-0 my-2 gap-1"
                key={weapon.name}
              >
                <Badge className="mr-4 w-full sm:w-fit" variant={"default"}>
                  {weapon.name}
                </Badge>
                <WeaponSheetCard.Content
                  stats={weapon.stats}
                  keywords={weapon.keywords}
                  rules={rules}
                />
              </div>
            );
          }
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default WeaponsAccordion;
