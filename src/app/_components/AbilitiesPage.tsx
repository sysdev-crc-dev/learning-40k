// import { Accordion } from "@/components/ui/accordion";
import dataServiceInst from "../../../services/Data.service";

// import parseDescriptions from "../../../utils/parseDescriptions";
// import PhaseComponent from "./Phase";
// import PhaseAccordion from "./PhaseAccordion";
import Test from "../../../lists/test.json";
export default async function AbilitiesPage() {
  const asd = dataServiceInst
    .getDatasheets()
    .filter(
      (datasheet) =>
        datasheet.faction_id === "AS" && datasheet.source_id === 112
    )
    .map((datasheet) => {
      return {
        ...datasheet,
        abilities: dataServiceInst
          .getDSAbilities()
          .filter((ability) => ability.datasheet_id === datasheet.id),
      };
    });

  console.log(asd);

  // console.log(
  //   Test.roster.forces[0].selections.map((value) => ({
  //     name: value.name,
  //     rules: value.rules,
  //     selections: value.selections,
  //   }))
  // );

  console.log(Test.roster.forces[0].selections[3]);

  // const grouped = Object.groupBy(stratsRelevant, ({ phase }) => phase);

  return (
    <div className="dark font-[family-name:var(--font-geist-sans)] px-2">
      <main className="flex flex-col gap-1">
        {/* <Accordion type="single">
          <PhaseComponent name="Command Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Command phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Movement Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Movement phase"]} />
            <PhaseAccordion strats={grouped["Movement or Charge phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Shooting Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Shooting phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Charge Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Charge phase"]} />
            <PhaseAccordion strats={grouped["Movement or Charge phase"]} />
          </PhaseComponent>
          <PhaseComponent name="Fight Phase">
            <PhaseAccordion strats={grouped["Any phase"]} />
            <PhaseAccordion strats={grouped["Fight phase"]} />
          </PhaseComponent>
        </Accordion> */}
      </main>
    </div>
  );
}
