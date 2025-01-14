import * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface IAppProps {
  name: string;
}

const PhaseComponent = (props: React.PropsWithChildren<IAppProps>) => {
  return (
    <AccordionItem value={props.name}>
      <AccordionTrigger className="text-3xl font-bold dark:text-white">
        {props.name}
      </AccordionTrigger>
      <AccordionContent>{props.children}</AccordionContent>
    </AccordionItem>
  );
};

export default PhaseComponent;
