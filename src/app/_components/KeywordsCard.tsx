import React from "react";
import { Category } from "../../../types";
import { Badge } from "@/components/ui/badge";

type Props = {
  categories: Category[];
};

const KeywordsCard = ({ categories }: Props) => {
  if (categories.length === 0) return;
  const list = categories.map((cat) => <Badge key={cat.id}>{cat.name}</Badge>);
  return <div className="flex gap-4 flex-wrap">{list}</div>;
};

export default KeywordsCard;
