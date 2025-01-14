import Abilities from "../data/Abilities.json";
import Stratagems from "../data/Stratagems.json";
import Enhancements from "../data/Enhancements.json";
import D_Abilities from "../data/Datasheets_abilities.json";
import { Ability, Enhancement, Stratagem } from "../types";

class DataService {
  private stratagems: Stratagem[];
  private abilities: Ability[];
  private enhancements: Enhancement[];
  constructor() {
    this.stratagems = Stratagems as Stratagem[];
    this.abilities = Abilities;
    this.enhancements = Enhancements;
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
}

const dataServiceInst = new DataService();
export default dataServiceInst;
