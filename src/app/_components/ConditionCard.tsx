import { Badge } from "@/components/ui/badge";
import { Condition } from "../../../types";

const ConditionCard = ({ condition, text }: Condition) => {
  return (
    <div className="condition">
      <Badge
        variant={condition !== "RESTRICTIONS:" ? "default" : "destructive"}
      >
        {condition}
      </Badge>
      <p className="my-1 mx-4">{text}</p>
    </div>
  );
};

export default ConditionCard;
