import React from "react";
import { Characteristic } from "../../../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ContentProps = {
  characteristic: Characteristic[];
};

type HeaderProps = {
  type: "r" | "m";
};

const headersRanged = ["Range", "A", "BS", "S", "AP", "D", "Keywords"];
const headersMelee = ["Range", "A", "WS", "S", "AP", "D", "Keywords"];

const WeaponSheetCard = () => <></>;

const Header = ({ type }: HeaderProps) => {
  const headers = type === "r" ? headersRanged : headersMelee;
  return (
    <div className="flex gap-1 sm:gap-8 justify-start mx-2 sm:mx-0">
      {headers.map((char) => (
        <div key={char} className="flex flex-col items-center justify-center">
          <Badge className={cn(`justify-center ${char}`)}>{char}</Badge>
        </div>
      ))}
    </div>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div className="flex gap-1 sm:gap-8 justify-start mx-0">
      {props.characteristic.map((char) => (
        <div
          key={char.name}
          className="flex flex-col items-center justify-center w-fit"
        >
          {char.name !== "Keywords" ? (
            <Badge
              className={cn("content justify-center ", `${char.name}`)}
              variant={"outline"}
            >
              {char.$text}
            </Badge>
          ) : (
            <span>{char.$text}</span>
          )}
        </div>
      ))}
    </div>
  );
};

WeaponSheetCard.Header = Header;

Header.displayName = "WeaponSheetCard.Header";

WeaponSheetCard.Content = Content;

Content.displayName = "WeaponSheetCard.Content";

export default WeaponSheetCard;
