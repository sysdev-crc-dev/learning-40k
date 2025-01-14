// "use client";

import { Accordion } from "@/components/ui/accordion";
import dataServiceInst from "../../services/Data.service";
import { Phase, Stratagem } from "../../types";

import parseDescriptions from "../../utils/parseDescriptions";
import PhaseComponent from "./_components/Phase";
import PhaseAccordion from "./_components/PhaseAccordion";
import { Button } from "@/components/ui/button";
import { Box, Braces, CircleDashed, Cog } from "lucide-react";
import StratsPage from "./_components/StratsPage";
import Link from "next/link";
export default async function Home() {
  return <StratsPage />;
}
