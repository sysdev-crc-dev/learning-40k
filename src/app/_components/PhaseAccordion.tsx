import { Stratagem } from "../../../types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ConditionCard from "./ConditionCard";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import RuleCard from "./RuleCard";

const PhaseAccordion = ({
  strats,
  abilities,
}: {
  strats: Stratagem[] | undefined;
  abilities: [string, string][];
}) => {
  strats?.sort((a) => {
    if (a.turn === "Your turn") {
      return -1;
    } else if (a.turn === "Opponent’s turn") {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div>
        <div className="flex gap-2 flex-wrap">
          {abilities.map(([k, d]) => (
            <RuleCard key={k} title={k} variant={"outline"}>
              {d}
            </RuleCard>
          ))}
        </div>
        {strats &&
          strats.map((strat) => (
            <div key={strat.id}>
              <h6 className="text-lg font-bold dark:text-white"></h6>
              <AccordionItem value={strat.name}>
                <AccordionTrigger>
                  <Badge
                    className={cn(
                      "flex justify-between w-full text-white text-pretty shad",
                      {
                        "bg-lime-700 hover:bg-lime-700/80":
                          strat.turn === "Either player’s turn",
                        "bg-red-700 hover:bg-red-700/80":
                          strat.turn === "Opponent’s turn",
                        "bg-blue-700 hover:bg-blue-700/80":
                          strat.turn === "Your turn",
                      }
                    )}
                  >
                    {strat.name} <span>{strat.cp_cost}CP</span>
                  </Badge>
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
            </div>
          ))}
      </div>
    </>
  );
};

export default PhaseAccordion;
