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
export type Turn = "Your turn" | "Either player’s turn" | "Opponent’s turn"
export type Phase = "Any phase" | "Command phase" | "Movement phase" | "Shooting phase" | "Charge phase" | "Fight phase" | "Movement or Charge phase"
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
}
export type Ability = {
  id: number;
  faction_id: string;
  name: string;
  legend: string;
  description: string;
}
export type Enhancement = {
  id: number;
  faction_id: string;
  name: string;
  legend: string;
  cost: number;
  detachment: string;
}