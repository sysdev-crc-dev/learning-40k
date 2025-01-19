import _ from "lodash";
import { createDynamicTrackingState } from "next/dist/server/app-render/dynamic-rendering";

export interface IRoot {
  roster: IRoster;
}

export interface IRoster {
  costs: ICost[];
  costLimits: ICost[];
  forces: IForce[];
  id: string;
  name: string;
  battleScribeVersion: number;
  generatedBy: string;
  gameSystemId: string;
  gameSystemName: string;
  gameSystemRevision: number;
  xmlns: string;
}

export interface IForce {
  selections: ISelectionUnit[];
  categories: ICategory[];
  id: string;
  name: string;
  entryId: string;
  catalogueId: string;
  catalogueRevision: number;
  catalogueName: string;
}

export interface ISelectionUnit {
  id: string;
  name: string;
  entryId: string;
  number: number;
  type: string;
  from: string;
  rules?: IRule[];
  selections: ISelectionUnit[];
  categories: ICategory[];
  profiles?: IProfile[];
  costs?: ICost[];
}

export interface IProfile {
  characteristics: ICharacteristic[];
  id: string;
  name: string;
  hidden: boolean;
  typeId: string;
  typeName: string;
  from: string;
  rules?: IRule[];
}

export interface ICost {
  name: string;
  typeId: string;
  value: number;
}

export class CostClass {
  private _points = 0;

  hasCost() {
    return this._points !== 0;
  }

  get points() {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  add(other: CostClass) {
    this._points += other._points;
  }

  toString() {
    const values = [];
    if (this._points !== 0) values.push(`${this._points} pts`);
    return `[${values.join(" / ")}]`;
  }
}

export type ModelStat = "M" | "T" | "Sv" | "W" | "LD" | "OC";
export type WeaponStat =
  | "Range"
  | "A"
  | "WS"
  | "BS"
  | "S"
  | "AP"
  | "D"
  | "Keywords";

export class BaseClass {
  private _name: string = "";

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  // Note: should be computed on same fields as hash().
  equal(other: BaseClass | null): boolean {
    if (other == null) return false;
    // Weapons in 40k have unique names
    return this._name === other._name;
  }
}

export class UpgradeClass extends BaseClass {
  private _cost = new CostClass();
  private _count = 0;

  constructor(name: string) {
    super(name);
  }

  get count() {
    return this._count;
  }

  set count(cost: number) {
    this._count = cost;
  }

  get cost() {
    return this._cost;
  }

  toString() {
    let string = this.name;
    if (this._count > 1) string = `${this._count}x ${string}`;
    if (this._cost.hasCost()) string += ` ${this._cost.toString()}`;
    return string;
  }
}

export type WeaponStats = {
  [key: string]: string | number;
  Range: string;
  A: string;
  Skill: string;
  S: number | string;
  AP: string;
  D: string;
};

export type ModelStats = {
  [key: string]: string | number;
  M: string;
  T: number;
  Sv: string;
  W: number;
  LD: string;
  OC: number;
};

export class WeaponClass extends UpgradeClass {
  private _selectionName = "";
  private _Range: string = "Melee";
  private _A: string = "1";
  private _skill: string = "";
  private _S: number | string = "user";
  private _AP: string = "";
  private _D: string = "";

  private _Keywords: string[] = [];

  get selectionName() {
    return this._selectionName || this.name;
  }

  set selectionName(v: string) {
    this._selectionName = v;
  }

  setStats(char: WeaponStat, value: string) {
    switch (char) {
      case "Range":
        this._Range = value as string;
        break;
      case "A":
        this._A = value;
        break;
      case "BS":
        this._skill = value as string;
        break;
      case "WS":
        this._skill = value;
        break;
      case "AP":
        this._AP = value as string;
        break;
      case "D":
        this._D = value;
        break;
      case "S":
        this._S = value;
        break;
      case "Keywords":
        this._Keywords = value.split(",");
        break;
    }
  }

  get stats(): WeaponStats {
    return {
      Range: this._Range,
      A: this._A,
      Skill: this._skill,
      S: this._S,
      AP: this._AP,
      D: this._D,
    };
  }

  get keywords() {
    return this._Keywords;
  }
}

export class ModelClass extends BaseClass {
  private _id = "";
  private _count = 0;

  // Characteristics
  private _M: string = '0"';
  private _T: number = 4;
  private _Sv: string = "4+";
  private _W: number = 1;
  private _LD: string = "6+";
  private _OC: number = 1;

  private _weapons: WeaponClass[] = [];
  private _upgrades: UpgradeClass[] = [];

  public get upgrades() {
    return this._upgrades;
  }

  public set count(v: number) {
    this._count = v;
  }

  public get count(): number {
    return this._count;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get id(): string {
    return this._id;
  }

  setCharacteristic(char: ModelStat, value: string) {
    switch (char) {
      case "M":
        this._M = value as string;
        break;
      case "T":
        this._T = Number(value);
        break;
      case "Sv":
        this._Sv = value as string;
        break;
      case "W":
        this._W = Number(value);
        break;
      case "LD":
        this._LD = value as string;
        break;
      case "OC":
        this._OC = Number(value);
        break;
    }
  }

  getCharacteristics(): ModelStats {
    return {
      M: this._M,
      T: this._T,
      Sv: this._Sv,
      W: this._W,
      LD: this._LD,
      OC: this._OC,
    };
  }

  public get weapons() {
    return this._weapons;
  }

  nameAndGear(): string {
    let name = super.name;

    if (this._weapons.length > 0 || this._upgrades.length > 0) {
      const gear = this.getDedupedWeaponsAndUpgrades();
      name += ` (${gear.map((u) => u.toString()).join(", ")})`;
    }
    return name;
  }

  getDedupedWeaponsAndUpgrades(): UpgradeClass[] {
    const deduped: UpgradeClass[] = [];
    for (const upgrade of [...this._weapons, ...this._upgrades]) {
      if (!deduped.some((e) => upgrade.name === e.name)) {
        deduped.push(upgrade);
      }
    }
    return deduped;
  }

  normalize(): void {
    this._weapons.sort(CompareWeapon);
    this._upgrades.sort(CompareObj);

    this.normalizeUpgrades(this._weapons);
    this.normalizeUpgrades(this._upgrades);
  }

  normalizeUpgrades(upgrades: UpgradeClass[]) {
    for (let i = 0; i < upgrades.length - 1; i++) {
      const upgrade = upgrades[i];
      if (upgrade.name === upgrades[i + 1].name) {
        upgrade.count += upgrades[i + 1].count;
        upgrade.cost.add(upgrades[i + 1].cost);
        upgrades.splice(i + 1, 1);
        i--;
      }
    }
    for (let upgrade of upgrades) {
      if (upgrade.count % this._count == 0) {
        upgrade.count /= this._count;
        upgrade.cost.points /= this._count;
      }
    }
  }

  equal(model: ModelClass | null): boolean {
    if (model == null) return false;

    if (
      this.name === model.name &&
      this._count === model._count &&
      this._weapons.length === model._weapons.length &&
      this._upgrades.length === model._upgrades.length
    ) {
      for (let wi = 0; wi < this._weapons.length; wi++) {
        if (!this._weapons[wi].equal(model._weapons[wi])) {
          return false;
        }
      }
      for (let wi = 0; wi < this._upgrades.length; wi++) {
        if (!this._upgrades[wi].equal(model._upgrades[wi])) {
          return false;
        }
      }

      return true;
    }
    return false;
  }
}

function CompareObj(a: { name: string }, b: { name: string }): number {
  return Compare(a.name, b.name);
}

function CompareModel(a: ModelClass, b: ModelClass): number {
  if (a.name === b.name) {
    return Compare(a.nameAndGear(), b.nameAndGear());
  } else if (a.name === "Unit Upgrades") {
    // "Unit Upgrades", a special model name, is always sorted last.
    return 1;
  } else if (b.name === "Unit Upgrades") {
    // "Unit Upgrades", a special model name, is always sorted last.
    return -1;
  } else {
    return Compare(a.name, b.name);
  }
}

export function CompareWeapon(a: WeaponClass, b: WeaponClass): number {
  return a.name.localeCompare(b.name);
}

export function Compare(a: string, b: string): number {
  if (a > b) return 1;
  else if (a == b) return 0;
  return -1;
}

export interface IRule {
  description: string;
  id: string;
  name: string;
  hidden: boolean;
  page?: number;
}

export interface ICategory {
  id: string;
  name: string;
  entryId: string;
  primary: boolean;
}

export interface ICharacteristic {
  $text: string;
  name: string;
  typeId: string;
}

export class UnitClass extends BaseClass {
  public readonly keywords: Set<string> = new Set();
  public readonly factions: Set<string> = new Set();

  public readonly abilities: { [key: string]: Map<string, string> } = {};

  public readonly rules: Map<string, string> = new Map();
  public readonly weaponRules: Map<string, string> = new Map();

  public readonly models: ModelClass[] = [];
  public readonly modelsStats: ModelClass[] = [];
  public readonly cost = new CostClass();

  private _modelList: string[] = [];
  private _weapons: { [key: string]: Map<string, WeaponClass> } = {};
  private _id: string = "";
  private _invulSave: string = "-";

  get modelList() {
    return this._modelList.join("\n");
  }

  addToModelList(modelName: string) {
    return this._modelList.push(modelName);
  }

  get id() {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  set invulSave(sv: string) {
    this._invulSave = sv;
  }

  get invulSave(): string {
    return this._invulSave;
  }

  public get weapons() {
    return this._weapons;
  }

  normalize(): void {
    // Sort force units by role and name
    this.models.sort(CompareModel);
    this.modelsStats.sort(CompareObj);

    for (let model of this.models) {
      model.normalize();
    }

    for (let i = 0; i < this.models.length - 1; i++) {
      const model = this.models[i];

      if (model.nameAndGear() === this.models[i + 1].nameAndGear()) {
        model.count++;
        this.models.splice(i + 1, 1);
        i--;
      }
    }

    for (let i = 0; i < this.modelsStats.length - 1; i++) {
      const model = this.modelsStats[i];

      if (model.equal(this.modelsStats[i + 1])) {
        this.modelsStats.splice(i + 1, 1);
        i--;
      }
    }

    this._modelList = this.models.map(
      (model) =>
        (model.count > 1 ? `${model.count}x ` : "") + model.nameAndGear() + "\n"
    );

    // FIX THIS
    // this._weapons = this.models
    //   .map((m) => m.weapons)
    //   .reduce((acc, val) => acc.concat(val), [])
    //   .sort(CompareWeapon)
    //   .filter((weap, i, array) => weap.name !== array[i - 1]?.name);
  }
}

export class Force extends BaseClass {
  public readonly factionRules: Map<string, string | null> = new Map();
  public readonly rules: Map<string, string | null> = new Map();
  private _catalog: string = "";
  private _faction: string = "Unknown";
  private _configurations: string[] = [];
  private _units: UnitClass[] = [];

  public set catalog(v: string) {
    this._catalog = v;
  }

  public get catalog(): string {
    return this._catalog;
  }

  public set faction(v: string) {
    this._faction = v;
  }

  public get faction(): string {
    return this._faction;
  }

  public get configurations() {
    return this._configurations;
  }

  public addConfiguration(c: string) {
    this._configurations.push(c);
  }
  public get units() {
    return this._units;
  }

  public addUnit(c: UnitClass) {
    this._units.push(c);
  }
}

export class RosterClass extends BaseClass {
  private _costs = new CostClass();
  private _forces: Force[] = [];

  public get costs(): CostClass {
    return this._costs;
  }

  public get forces(): Force[] {
    return this._forces;
  }

  public addForce(f: Force) {
    this._forces.push(f);
  }
}

export function parseRoster(root: IRoot): RosterClass | null {
  if (root) {
    const info = root.roster;
    if (info) {
      const roster = new RosterClass(info.name ? info.name : "40K Roster Name");
      parseRosterPoints(info, roster);
      parseForce(info.forces, roster);

      return roster;
    }
  }

  return null;
}

function parseRosterPoints(data: IRoster, roster: RosterClass): void {
  let costs = data.costs.flatMap((cost) => cost);
  for (let cost of costs) {
    roster.costs.add(parseCost(cost));
  }
}

function parseCost(cost: ICost): CostClass {
  const costs = new CostClass();
  const which = cost.name;
  const value = cost.value;
  if (which && value) {
    if (which === "pts") {
      costs.points += +value;
    } else {
      console.log(which);
    }
  }
  return costs;
}

function parseForce(data: IForce[], roster: RosterClass) {
  for (const force of data) {
    if (force.name && force.catalogueName) {
      const fName = force.name;
      const ctName = force.catalogueName;
      const f = new Force(fName);

      f.catalog = ctName;

      if (!duplicateForce(f, roster)) {
        const unitRules = force.selections.flatMap((a) => a.rules);
        const upgradeRules = force.selections.flatMap((a) =>
          a.selections.flatMap((a) => a.rules)
        );
        const rules = _.uniqBy(
          [...unitRules, ...upgradeRules].filter((v) => v),
          (ite) => {
            if (ite) {
              return ite.id;
            }
          }
        );
        for (const rule of rules) {
          if (rule) {
            extractRuleDescription(rule, f.rules);
          }
        }
      }

      parseSelections(force.selections, f);

      roster.addForce(f);
    }
  }
}

function duplicateForce(force: Force, roster: RosterClass): boolean {
  if (!roster || !force) return false;

  for (let f of roster.forces) {
    if (f.catalog === force.catalog) return true;
  }
  return false;
}

function extractRuleDescription(
  rule: IRule,
  map: Map<string, string | null>
): void {
  const ruleName = rule.name;
  const desc = rule.description;
  if (ruleName && desc) {
    map.set(ruleName, desc);
  }
}

function parseSelections(selections: ISelectionUnit[], force: Force) {
  for (const sel of selections) {
    const selectionName = sel.name;

    if (!selectionName) continue;
    if (selectionName.includes("Detachment Command Cost")) {
    } else if (
      selectionName === "Battle Size" ||
      selectionName === "Gametype"
    ) {
      // parseConfiguration here;
    } else if (sel.type === "model" || sel.type === "unit") {
      // parse Units here
      const unit = parseUnit(sel);
      force.units.push(unit);

      for (const entry of unit.rules) {
        console.log(entry);
      }

      for (const entry of unit.weaponRules) {
        force.rules.set(entry[0], entry[1]);
      }
    }
  }
}

function parseUnit(data: ISelectionUnit): UnitClass {
  const unit = new UnitClass(data.name);
  unit.id = data.id;
  const profilesFromUnit = [
    ...(data.profiles ?? []),
    ...data.selections.flatMap(
      (s) => s.profiles?.flatMap((p) => ({ ...p, rules: s.rules })) ?? []
    ),
  ];
  const categories = data.categories;

  for (const cat of categories) {
    const catName = cat.name;

    if (catName) {
      const factPattern = "Faction: ";
      const factIndex = catName.lastIndexOf(factPattern);
      if (factIndex >= 0) {
        const factKeyword = catName.slice(factIndex + factPattern.length);
        unit.factions.add(factKeyword);
      } else {
        // const roleText = catName.trim();
        // let unitRole = LookupRole(roleText);
        // if (unitRole != UnitRole.NONE) {
        //   unit._role = unitRole;
        // }
        unit.keywords.add(catName);
      }
    }
  }

  const seenProfiles: IProfile[] = [];

  const modelStatsFromProfiles = profilesFromUnit.filter(
    (prof) => prof.typeName === "Unit" || prof.typeName === "Model"
  );

  for (const profile of modelStatsFromProfiles) {
    const profileName = profile.name;
    const profileTypeName = profile.typeName;
    if (!profileName && !profileTypeName) continue;

    const modelStat = new ModelClass(profileName);
    modelStat.id = profile.id;

    for (const char of profile.characteristics) {
      modelStat.setCharacteristic(char.name as ModelStat, char.$text);
      unit.modelsStats.push(modelStat);
    }
  }
  seenProfiles.push(...modelStatsFromProfiles);

  const modelSelections = [];

  if (data.type === "model") {
    modelSelections.push(data);
  } else {
    const selections = data.selections;

    for (const selection of selections) {
      if (
        selection.type === "model" ||
        HasImmediateProfileWithTypeName(selection, "Unit")
      ) {
        modelSelections.push(selection);
      }

      if (modelSelections.length === 0) {
      }

      if (
        modelSelections.length === 0 &&
        HasImmediateProfileWithTypeName(data, "Unit")
      ) {
        modelSelections.push(data);
      }
    }
  }

  for (const modelSelection of modelSelections) {
    const mlProfiles = modelSelection.profiles ?? [];
    const mlSelectionProfiles = modelSelection.selections.flatMap(
      (s) =>
        s.profiles?.flatMap((p) => ({ ...p, rules: s.rules } as IProfile)) ?? []
    );

    const profiles = [...mlProfiles, ...mlSelectionProfiles];

    const unseenProfiles = profiles.filter((e) => !seenProfiles.includes(e));

    seenProfiles.push(...unseenProfiles);

    const model = new ModelClass(modelSelection.name ?? "Unknow Model");
    model.id = modelSelection.id;
    model.count = modelSelection.number ?? 1;
    unit.models.push(model);
    const selectionsWithProfiles = modelSelection.selections
      .filter((a) => a.selections)
      .flatMap((s) => s.selections.flatMap((c) => c.profiles as IProfile[]));
    parseModelProfiles([...profiles, ...selectionsWithProfiles], model, unit);
    /*
      Parse model characteristics from .profiles[0]
      Parse unit abilities from .profiles.slice[1,];
      Parse unit selections from .selections
    */

    for (const upgradeSelection of [
      ...modelSelection.selections,
      ...modelSelection.selections.flatMap((a) => a.selections ?? []),
    ]) {
      const subSelections = upgradeSelection.selections?.filter(
        (s) => s.type === "upgrade"
      );

      if (
        subSelections &&
        !HasImmediateProfileWithTypeName(upgradeSelection, "Abilities")
      )
        continue;

      const upgradeName = upgradeSelection.name;

      if (upgradeName) {
        const upgrade = new UpgradeClass(upgradeName);

        upgrade.count = Number(upgradeSelection.number);

        model.upgrades.push(upgrade);
      }
    }
  }

  const unseenProfiles = profilesFromUnit.filter(
    (e) => !seenProfiles.includes(e)
  );

  seenProfiles.push(...unseenProfiles);

  if (unseenProfiles.length > 0) {
    const unitUpgradesModel = new ModelClass("Unit Upgrades");
    unitUpgradesModel.id = "Unit Upgrades";
    parseModelProfiles(unseenProfiles, unitUpgradesModel, unit);

    for (const selection of data.selections) {
      if (selection.type !== "upgrade") continue;
      // Ignore model selections (which were already processed).
      if (modelSelections.includes(selection)) continue;
      // Ignore unit-level weapon selections; these were handled above.
      // if (selection.querySelector('profiles>profile[typeName="Weapon"]'))
      //   continue;

      let name = selection.name;
      if (!name) continue;

      const upgrade = new UpgradeClass(name);
      upgrade.count = Number(selection.number);
      unitUpgradesModel.upgrades.push(upgrade);
    }

    if (
      unitUpgradesModel.weapons.length > 0 ||
      unitUpgradesModel.upgrades.length > 0
    ) {
      unit.models.push(unitUpgradesModel);
    }
  }

  unit.normalize();
  return unit;
}

function HasImmediateProfileWithTypeName(
  selection: ISelectionUnit,
  typeName: string
) {
  const profiles = selection.profiles;
  if (profiles) {
    for (const profile of profiles) {
      if (profile.typeName === typeName) {
        return true;
      }
    }
  }

  return false;
}

function parseModelProfiles(
  profiles: IProfile[],
  model: ModelClass,
  unit: UnitClass
) {
  for (const profile of profiles) {
    const profileName = profile.name;
    const typeName = profile.typeName;
    if (!profileName || !typeName) continue;
    // Everything else, like Prayers and Warlord Traits.
    const chars = profile.characteristics;
    if (chars.length > 1) {
      if (!unit.abilities[typeName] && typeName !== "Unit") {
        // Parse Weapons
        if (!unit.weapons[typeName]) unit.weapons[typeName] = new Map();

        const weapon = new WeaponClass(profileName);
        if (profile.rules) {
          for (const rule of profile.rules) {
            unit.weaponRules.set(rule.name, rule.description);
          }
        }
        for (const c of chars) {
          weapon.setStats(c.name as WeaponStat, c.$text);
        }
        unit.weapons[typeName].set(profileName, weapon);
      } else {
        for (const c of chars) {
          model.setCharacteristic(c.name as ModelStat, c.$text);
        }
      }
    } else {
      // Need to figure out how to do single-column abilities!!!!!!!
      // Look at length of characteristics
      if (!unit.abilities[typeName]) {
        unit.abilities[typeName] = new Map();
      }
      // parse abilities
      for (const char of chars) {
        const charName = char.name;

        if (charName && chars.length > 1) {
          unit.abilities[typeName].set(
            [profileName, charName.toString()].join(" - "),
            char.$text
          );
        } else {
          unit.abilities[typeName].set(profileName, char.$text);
        }
      }
    }
  }
}
