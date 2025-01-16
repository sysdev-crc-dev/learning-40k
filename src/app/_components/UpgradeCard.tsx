import React from "react";
import { Upgrade } from "../../../types";
import { Badge } from "@/components/ui/badge";

type Props = {
  selection: Upgrade;
};

const UpgradeCard = ({ selection }: Props) => {
  return (
    <div>
      <div>
        {selection.selections &&
          selection.selections.map((upgrade) => (
            <div key={upgrade.id}>
              <div>
                {upgrade.rules &&
                  upgrade.rules.map((rule) => (
                    <div key={rule.id}>
                      <Badge variant={"secondary"}>{rule.name}</Badge>
                      <p className="p-4">{rule.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        {selection.categories &&
          selection.categories.map((cat) => (
            <Badge key={cat.id}>{cat.name}</Badge>
          ))}
      </div>
    </div>
  );
};

export default UpgradeCard;
