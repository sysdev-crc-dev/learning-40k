import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
  title: string;
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
};

const RuleCard = ({ title, variant, children }: PropsWithChildren<Props>) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge
          className={cn("content justify-center border-dashed")}
          variant={variant}
        >
          {title}
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RuleCard;
