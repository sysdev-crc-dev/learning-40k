"use client";
import { parseRoster, RosterClass } from "../../types/force";
import React, { useCallback, useEffect, useState } from "react";
import FileInput from "./_components/FileInput";
import ForcePage from "./_components/ForcePage";

export default function Home() {
  const [roster, setRoster] = useState<RosterClass | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const roz = parseRoster(JSON.parse(data));
      if (roz) {
        setRoster(roz);
      }
    }
  }, []);
  const onReaderLoad = useCallback((event: ProgressEvent<FileReader>) => {
    const roster = null;
    if (event.target?.result) {
      const roz = parseRoster(JSON.parse(event.target.result as string));
      if (roz) {
        localStorage.setItem("data", event.target.result as string);
        setRoster(roz);
      }
    }

    return roster;
  }, []);
  const handleOnChange: React.ChangeEventHandler = (e) => {
    const i = (e.target as HTMLInputElement).files;
    if (i && i.length) {
      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(i[0]);
    }
  };
  if (!roster) return <FileInput onChange={handleOnChange} />;

  const forceList = roster.forces.map((f) => (
    <React.Fragment key={f.name}>
      <ForcePage force={f} roster={roster}>
        <FileInput onChange={handleOnChange} />
      </ForcePage>
    </React.Fragment>
  ));
  return forceList;
}
