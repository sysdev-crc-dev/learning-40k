import Abilities from "../data/Abilities.json";
import Stratagems from "../data/Stratagems.json";
import Enhancements from "../data/Enhancements.json";
import D_Abilities from "../data/Datasheets_abilities.json";
import Datasheets from "../data/Datasheets.json";
import {
  Ability,
  Datasheet,
  DS_Ability,
  Enhancement,
  Stratagem,
} from "../types";

class DataService {
  private stratagems: Stratagem[];
  private abilities: Ability[];
  private enhancements: Enhancement[];
  private ds_abilities: DS_Ability[];
  private datasheets: Datasheet[];
  constructor() {
    this.stratagems = Stratagems as Stratagem[];
    this.abilities = Abilities;
    this.enhancements = Enhancements;
    this.ds_abilities = D_Abilities as DS_Ability[];
    this.datasheets = Datasheets as Datasheet[];
  }
  getStratagems() {
    return this.stratagems;
  }
  getAbilities() {
    return this.abilities;
  }
  getEnhancements() {
    return this.enhancements;
  }

  getDSAbilities() {
    return this.ds_abilities;
  }

  getDatasheets() {
    return this.datasheets;
  }

  getAbilityById(id: number) {
    return this.abilities.find((ability) => ability.id === id);
  }
}

const dataServiceInst = new DataService();
export default dataServiceInst;
