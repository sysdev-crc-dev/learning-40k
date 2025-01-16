import React from "react";
import { Characteristic } from "../../../types";
import { Badge } from "@/components/ui/badge";

type Props = {
  characteristic: Characteristic[];
};

const DatasheetCard = (props: Props) => {
  return (
    <div className="flex gap-4 justify-start mx-2 sm:mx-0">
      {props.characteristic.map((char) => (
        <div
          key={char.name}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <span>{char.name}</span>
          <Badge>{char.$text}</Badge>
        </div>
      ))}
    </div>
  );
};

export default DatasheetCard;
