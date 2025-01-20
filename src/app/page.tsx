"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StratsPage from "./_components/StratsPage";
import AbilitiesPage from "./_components/AbilitiesPage";
import { parseRoster, RosterClass } from "../../types/force";
import { useCallback, useEffect, useState } from "react";
import FileInput from "./_components/FileInput";
import { Badge } from "@/components/ui/badge";

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
  const detachmentRules = [...roster.forces.flatMap((f) => f.factionRules)];
  const factionName = roster.forces.flatMap((f) => f.faction).join(",");
  return (
    <main>
      <h1 className="mt-1 px-2 mb-4 text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
        {factionName}
      </h1>
      <Accordion className="flex flex-col h-[100vh]" type="single" collapsible>
        <AccordionItem value="Datasheets">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Datasheets
          </AccordionTrigger>
          <AccordionContent>
            <AbilitiesPage roster={roster} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Stratagems">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Stratagems
          </AccordionTrigger>
          <AccordionContent>
            <StratsPage detachment={factionName} />
          </AccordionContent>
        </AccordionItem>
        {detachmentRules.map(([[a, b]]) => (
          <AccordionItem key={a} value="Detachment">
            <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
              Detachment
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <Badge>{a}</Badge>
              <p className="mt-2 p-2">{b}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem className="mt-auto" value="FileInput">
          <AccordionTrigger className="pl-2 text-xl font-bold dark:text-white underline">
            Change List
          </AccordionTrigger>
          <AccordionContent>
            <FileInput onChange={handleOnChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
