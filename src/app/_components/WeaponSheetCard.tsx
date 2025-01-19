import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import RuleCard from "./RuleCard";
import { WeaponStats } from "../../../types/force";

type ContentProps = {
  stats: WeaponStats;
  keywords: string[];
  rules: Map<string, string | null>;
};

type HeaderProps = {
  type: "r" | "m";
};

const headersRanged = ["Range", "A", "BS", "S", "AP", "D", "Keywords"];
const headersMelee = ["Range", "A", "WS", "S", "AP", "D", "Keywords"];

const WeaponSheetCard = () => <></>;

const Header = ({ type }: HeaderProps) => {
  const headers = type === "r" ? headersRanged : headersMelee;
  return (
    <div className="flex gap-1 sm:gap-8 justify-start mx-2 sm:mx-0">
      {headers.map((char) => (
        <div
          key={char}
          className={cn("flex flex-col items-center justify-center", {
            "hidden sm:flex": char === "Keywords",
          })}
        >
          <Badge className={cn(`justify-center ${char}`)}>{char}</Badge>
        </div>
      ))}
    </div>
  );
};

const Content = ({ stats, keywords, rules }: ContentProps) => {
  const rulesHelper = keywords.map((a) => {
    for (const r of rules) {
      const [key, value] = r;

      const normalizedKey = key.toLowerCase().replace(/\s+/g, "");
      const normalizedKeyword = a.toLowerCase().replace(/\s+/g, "");

      if (normalizedKey.includes(normalizedKeyword)) {
        return {
          keyword: a,
          rule: value,
        };
      }
    }
    return;
  });

  // console.log(rulesHelper);

  return (
    <div className="flex gap-1 flex-wrap sm:gap-8 justify-start mx-0">
      {Object.keys(stats).map((key) => (
        <div
          key={key}
          className={cn("flex flex-col items-center justify-center aqui", {
            "w-fit": key !== "Keywords",
            "w-full": key === "Keywords",
          })}
        >
          <Badge
            className={cn("content justify-center ", `${key}`)}
            variant={"outline"}
          >
            {stats[key]}
          </Badge>
        </div>
      ))}
      <div className="flex flex-row gap-2 w-full sm:w-fit">
        {rulesHelper.map((char) => {
          if (char) {
            return (
              <div
                key={char.keyword}
                className={cn("flex flex-row items-start justify-start")}
              >
                <RuleCard title={char.keyword} variant={"outline"}>
                  {char.rule}
                </RuleCard>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

WeaponSheetCard.Header = Header;

Header.displayName = "WeaponSheetCard.Header";

WeaponSheetCard.Content = Content;

Content.displayName = "WeaponSheetCard.Content";

export default WeaponSheetCard;
