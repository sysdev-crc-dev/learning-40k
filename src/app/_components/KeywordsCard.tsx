import React from "react";
import { Category } from "../../../types";
import { Badge } from "@/components/ui/badge";

type Props = {
  keywords: Set<string>;
  selections?: Category[];
};

const KeywordsCard = ({ keywords, selections }: Props) => {
  const keywordsArr = [...keywords.entries()];
  if (keywordsArr.length === 0) return;
  const list = keywordsArr.map(([key]) => <Badge key={key}>{key}</Badge>);
  const wargearSelections = selections?.map((prof) => (
    <Badge key={prof.name}>{prof.name}</Badge>
  ));
  return (
    <div className="flex gap-4 flex-wrap pl-4">
      {list}
      {wargearSelections}
    </div>
  );
};

export default KeywordsCard;
