import { Phase, Stratagem } from "../../../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ConditionCard from "./ConditionCard";
import { cn } from "@/lib/utils";

const PhaseAccordion = ({ strats }: { strats: Stratagem[] | undefined }) => {
  return (
    <>
      <div>
        {strats &&
          strats.map((strat) => (
            <div key={strat.id}>
              <h6 className="text-lg font-bold dark:text-white"></h6>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={cn({
                      either: strat.turn === "Either player’s turn",
                      opp: strat.turn === "Opponent’s turn",
                      your: strat.turn === "Your turn",
                    })}
                  >
                    {strat.type.split("-")[0]} - {strat.name} - [{strat.cp_cost}{" "}
                    CP]
                  </AccordionTrigger>
                  <AccordionContent>
                    {Array.isArray(strat.description) &&
                      strat.description.map((condition) => (
                        <ConditionCard
                          key={condition.condition}
                          text={condition.text}
                          condition={condition.condition}
                        />
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </div>
    </>
  );
};

export default PhaseAccordion;
