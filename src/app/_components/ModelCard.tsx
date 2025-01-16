import React from "react";
import { SelectionModel } from "../../../types";
import { Badge } from "@/components/ui/badge";
import DatasheetCard from "./DatasheetCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import KeywordsCard from "./KeywordsCard";

type Props = {
  model: SelectionModel;
};

const ModelCard = ({ model }: Props) => {
  return (
    <div className="flex gap-4 flex-col">
      <DatasheetCard characteristic={model.profiles[0].characteristics} />
      <Separator />
      <Accordion type="single" collapsible>
        <AccordionItem value="Abilities">
          <AccordionTrigger className="pl-4">Abilities</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 flex-wrap">
              {model.profiles.slice(1).map((profile) => (
                <div key={profile.id}>
                  {profile.name !== model.name && (
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
              {model.rules?.map((profile) => (
                <div key={profile.id}>
                  {profile.name !== model.name && (
                    <Popover>
                      <Badge variant={"secondary"}>{profile.name}</Badge>
                      <PopoverContent>
                        <React.Fragment>{profile.description}</React.Fragment>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Ranged">
          <AccordionTrigger className="pl-4">Ranged Weapons</AccordionTrigger>
          <AccordionContent>Aqui</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Melee">
          <AccordionTrigger className="pl-4">Ranged Weapons</AccordionTrigger>
          <AccordionContent>Aqui</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Keywords">
          <AccordionTrigger className="pl-4">Keywords</AccordionTrigger>
          <AccordionContent>
            <KeywordsCard categories={model.categories} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ModelCard;
