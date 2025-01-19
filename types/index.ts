/*
{
  "faction_id": "",
  "id": "000009218006",
  "name": "EXPLOSIVE CLEARANCE",
  "type": "Boarding Actions – Battle Tactic Stratagem",
  "cp_cost": "1",
  "legend": "A well-placed explosive munition in confined shipboard spaces can cause bloody carnage.",
  "turn": "Your turn",
  "phase": "Shooting phase",
  "detachment": "",
  "description": "<b>WHEN:</b> Your <a href=\"/wh40k10ed/the-rules/core-rules/#SHOOTING-PHASE\">Shooting phase</a>.<br><br><b>TARGET:</b> One unit from your army that has not been selected to shoot this phase.<br><br><b>EFFECT:</b> Select one model in your unit that is equipped with a weapon with the <span class=\"kwb2 bluefont\"><a href=\"/wh40k10ed/the-rules/core-rules/#Blast\">[BLAST]</a></span> ability. Until the end of the phase, when determining how many models are in the target unit for the purpose of that ability, include models that are not <a href=\"/wh40k10ed/the-rules/boarding-action-rules/#Visibility\">visible</a> to the attacking model. In addition, attacks made with that weapon can be allocated to models that are not visible to the attacking model.",
  "": ""
 },
*/
export type Condition = {
  condition: string;
  text: string;
};
export type HTML = string;
export type Turn = "Your turn" | "Either player’s turn" | "Opponent’s turn";
export type Phase =
  | "Any phase"
  | "Command phase"
  | "Movement phase"
  | "Shooting phase"
  | "Charge phase"
  | "Fight phase"
  | "Movement or Charge phase";
export type Stratagem = {
  faction_id: string;
  id: number;
  name: string;
  type: string;
  cp_cost: number;
  legend: string;
  turn: Turn;
  phase: Phase;
  detachment: string;
  description: string | Condition[];
};
export type Ability = {
  id: number;
  faction_id: string;
  name: string;
  legend: string;
  description: string;
};
export type Enhancement = {
  id: number;
  faction_id: string;
  name: string;
  legend: string;
  cost: number;
  detachment: string;
};

export type DS_Ability = {
  datasheet_id: number;
  line: number;
  ability_id: number;
  model: string;
  name: string;
  description: string;
  type: string;
  parameter: string;
};

export type Datasheet = {
  id: number;
  name: string;
  faction_id: string;
  source_id: number;
  legend: string;
  role: string;
  loadout: string;
  transport: string;
  virtual: false;
  leader_head: string;
  leader_footer: string;
  damaged_description: string;
  link: string;
};

export type Rule = {
  description: string;
  hidden: boolean;
  id: string;
  name: string;
};

export type SelectionUpgrade = {
  entryGroupId: string;
  entryId: string;
  from: string;
  group: string;
  id: string;
  name: string;
  number: string;
  rules?: Rule[];
  type: "upgrade";
};

export type Category = {
  entryId: string;
  id: string;
  name: string;
  primary: boolean;
};
export type SelectionsTuple = [SelectionUpgrade];
export type Upgrade = {
  id: string;
  number: number;
  from: string;
  name: string;
  selections?: SelectionsTuple;
  categories?: Category[];
  type: "upgrade";
};

export type Characteristic = {
  $text: string;
  name: string;
  typeId: string;
};

export type Profile = {
  characteristics: Characteristic[];
  categories?: Category[];
  selections?: Selection[];
  rules?: Rule[];
  id: string;
  name: string;
  hidden: boolean;
  typeId: string;
  typeName: string;
  from: string;
};

export interface Cost {
  name: string;
  typeId: string;
  value: number;
}

export interface Selection {
  rules?: Rule[];
  selections?: [Profile, Selection];
  profiles: Profile[];
  id: string;
  name: string;
  entryId: string;
  number: number;
  type: string;
  from: string;
  entryGroupId?: string;
  group?: string;
  typeName?: string;
}

export type SelectionModel = {
  rules?: Rule[];
  profiles: Profile[];
  selections: Selection[];
  costs: Cost[];
  categories: Category[];
  id: string;
  name: string;
  entryId: string;
  number: number;
  type: string;
  from: string;
};

export type Unit = {
  id: string;
  name: string;
  entryId: string;
  number: number;
  type: string;
  from: string;
  costs: Cost[];
  categories: Category[];
  selections: SelectionModel[];
  profiles: Profile[];
  rules?: Rule[];
};

export type ProfileTypes =
  | "Abilities"
  | "Ranged Weapons"
  | "Melee Weapons"
  | "Keywords";

export type ProfileDictionary = Record<ProfileTypes, [Profile | undefined]>;

export type ParsedForce = {
  points: string;
  forceName: string;
  detachment: ParsedDetachment;
  units: ParsedUnit[];
};

export type ParsedDetachment = {
  name: string;
  rule: string;
};

export type ParsedModel = {
  stats: Profile;
  datasheetAbilities: Profile[];
  invulSave: Profile[];
  factionRules: Rule[];
  coreRules: Rule[];
  leader: Profile[];
  selections: ProfileDictionary;
  keywords: Category[];
};

export interface ParsedUnit {
  stats: Profile[];
  datasheetAbilities: Profile[];
  invulSave: Profile[];
  factionRules: Rule[];
  coreRules: Rule[];
  leader?: Profile[];
  selections: ProfileDictionary;
  keywords: Category[];
  name: string;
}
