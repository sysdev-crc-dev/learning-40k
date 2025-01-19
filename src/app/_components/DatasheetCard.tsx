import React from "react";
import { Characteristic } from "../../../types";
import { Badge } from "@/components/ui/badge";
import { ModelStats } from "../../../types/force";

type Props = {
  stats: ModelStats;
};

const DatasheetCard = (props: Props) => {
  return (
    <div className="flex gap-4 justify-start mx-2 sm:mx-4">
      {Object.keys(props.stats).map((key) => (
        <div
          key={key}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <span>{key}</span>
          <Badge>{props.stats[key]}</Badge>
        </div>
      ))}
    </div>
  );
};

export default DatasheetCard;
