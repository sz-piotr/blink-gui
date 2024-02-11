import { Immui } from "./index.js";

export type Widget = LabelNode | ButtonNode | ContainerNode;

export interface LabelNode {
  type: "label";
  text: string;
  element: HTMLElement;
}

export interface ButtonNode {
  type: "button";
  text: string;
  clicked: boolean;
  element: HTMLButtonElement;
}

export interface ContainerNode {
  type: "container";
  element: HTMLElement;
  ui: Immui;
}
