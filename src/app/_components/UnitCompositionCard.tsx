import React from "react";
import { SelectionModel } from "../../../types";

type Props = {
  models: SelectionModel[];
};

const UnitCompositionCard = ({ models }: Props) => {
  return (
    <>
      {models.map((model) => (
        <div className="flex flex-wrap gap-4" key={model.id}>
          <span>
            {model.name} x {model.number}
          </span>
        </div>
      ))}
    </>
  );
};

export default UnitCompositionCard;
