import { Condition } from "../../../types";

const ConditionCard = ({ condition, text }: Condition) => {
  return (
    <div className="condition">
      <b className={condition.split(":")[0].toLowerCase()}>{condition}</b>
      <span>{text}</span>
    </div>
  );
};

export default ConditionCard;
