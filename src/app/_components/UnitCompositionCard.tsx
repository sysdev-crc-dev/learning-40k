import React from "react";
import { SelectionModel } from "../../../types";

type Props = {
  model: string;
};

const UnitCompositionCard = ({ model }: Props) => {
  return (
    <>
      <div className="flex flex-wrap gap-4 text-xs" key={model}>
        <span>
          {model.split("\n").map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </span>
      </div>
    </>
  );
};

export default UnitCompositionCard;
