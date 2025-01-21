import React from "react";
import { Characteristic } from "../../../types";

type Props = {
  characteristics: Characteristic[];
};

const LeaderAccordionContent = ({ characteristics }: Props) => {
  return (
    <div>
      {characteristics.map((char) =>
        char.$text.split("\n").map((str) => (
          <p className="mt-1" key={str}>
            {str}
          </p>
        ))
      )}
    </div>
  );
};

export default LeaderAccordionContent;
