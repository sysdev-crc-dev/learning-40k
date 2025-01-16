import React from "react";
import DatasheetCard from "./DatasheetCard";
import { Profile, Unit } from "../../../types";
import { Badge } from "@/components/ui/badge";
import _ from "lodash";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import KeywordsCard from "./KeywordsCard";
import { Separator } from "@/components/ui/separator";
import UnitCompositionCard from "./UnitCompositionCard";
import WeaponSheetCard from "./WeaponSheetCard";
type Props = {
  unit: Unit;
};

const UnitCard = ({ unit }: Props) => {
  const selections = _.unionBy(
    unit.selections
      .flatMap((sModel) => sModel.selections)
      .flatMap((sel) => {
        if (sel.selections && !sel.profiles) {
          const helper = sel as unknown as Profile;
          if (helper.selections) {
            return helper.selections.flatMap((sel2) => sel2.profiles);
          }
        }

        return sel.profiles;
      })
      .flatMap((value) => {
        if (value) {
          return value;
        }
      }),
    "name"
  );

  const dataGroupedByType = _.groupBy(
    selections,
    (profile) => profile?.typeName
  );

  const unitModels = unit.selections.map((model) => {
    return model.profiles[0];
  });
  const characFromAllProfiles = _.uniqBy(unitModels, "id");
  return (
    <div className="flex gap-4 flex-col ">
      <Separator />
      {characFromAllProfiles.map((profile) => (
        <div
          className="flex flex-col gap-2 pl-1 sm:pl-4 border-2 rounded-sm"
          key={profile.id}
        >
          <p>{profile.name}</p>
          <DatasheetCard characteristic={profile.characteristics} />
          <Separator />
        </div>
      ))}

      <Accordion type="single" collapsible>
        <AccordionItem value="Abilities">
          <AccordionTrigger className="pl-1 sm:pl-4">
            Abilities
          </AccordionTrigger>
          <AccordionContent className="pl-1 sm:pl-4">
            <div className="flex gap-2 flex-wrap">
              {unit.rules?.map((profile) => (
                <div key={profile.id}>
                  <Popover>
                    <PopoverTrigger>
                      <Badge variant={"secondary"}>{profile.name}</Badge>
                    </PopoverTrigger>
                    <PopoverContent>
                      <React.Fragment>{profile.description}</React.Fragment>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
              {unit.profiles.slice().map((profile) => (
                <div key={profile.id}>
                  {profile.name !== unit.name && (
                    <Popover>
                      <PopoverTrigger>
                        <Badge variant={"secondary"}>{profile.name}</Badge>
                      </PopoverTrigger>
                      <PopoverContent>
                        {profile.characteristics.map((char, idx) => (
                          <React.Fragment key={idx}>
                            {char.$text}
                          </React.Fragment>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              ))}
              {dataGroupedByType.Abilities?.map((profile) => {
                if (profile) {
                  return (
                    <div key={profile.id}>
                      <Popover>
                        <PopoverTrigger>
                          <Badge variant={"secondary"}>{profile.name}</Badge>
                        </PopoverTrigger>
                        <PopoverContent>
                          {profile.characteristics.map((char, idx) => (
                            <React.Fragment key={idx}>
                              {char.$text}
                            </React.Fragment>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </div>
                  );
                }
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Ranged">
          <AccordionTrigger className="pl-1 sm:pl-4">
            Ranged Weapons
          </AccordionTrigger>
          <AccordionContent className="pl-1  sm:pl-4">
            <WeaponSheetCard.Header type="r" />
            {dataGroupedByType["Ranged Weapons"].map((value) => {
              if (value) {
                return (
                  <div
                    className="flex flex-col justify-start mx-2 sm:mx-0"
                    key={value.id}
                  >
                    <span className="mr-4">{value.name}</span>
                    <WeaponSheetCard.Content
                      characteristic={value.characteristics}
                    />
                  </div>
                );
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Melee">
          <AccordionTrigger className="pl-1 sm:pl-4">
            Melee Weapons
          </AccordionTrigger>
          <AccordionContent className="pl-1 sm:pl-4">
            <WeaponSheetCard.Header type="r" />
            {dataGroupedByType["Melee Weapons"].map((value) => {
              if (value) {
                return (
                  <div
                    className="flex flex-col justify-start mx-2 sm:mx-0"
                    key={value.id}
                  >
                    <span className="mr-4">{value.name}</span>
                    <WeaponSheetCard.Content
                      characteristic={value.characteristics}
                    />
                  </div>
                );
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Models">
          <AccordionTrigger className="pl-1 sm:pl-4">Models</AccordionTrigger>
          <AccordionContent className="pl-1 sm:pl-4">
            <UnitCompositionCard models={unit.selections} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Keywords">
          <AccordionTrigger className="pl-1 sm:pl-4">Keywords</AccordionTrigger>
          <AccordionContent className="pl-1 sm:pl-4">
            <KeywordsCard categories={unit.categories} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default UnitCard;
