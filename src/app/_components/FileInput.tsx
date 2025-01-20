import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  onChange: React.ChangeEventHandler;
};

const FileInput = (props: Props) => {
  return (
    <div className="space-y-2 text-sm">
      <Input
        id="file"
        type="file"
        placeholder="File"
        accept="application/json"
        onChange={props.onChange}
      />
    </div>
  );
};

export default FileInput;
