import { textToGridArray } from "./utils.js";
import { TextGrid } from "./TextGrid.js";

const rootElement = document.querySelector("#app");

const text = "textgrid";
const textGrid = new TextGrid(text, 10, 10);
const textGridElement = textGrid.element;

rootElement.appendChild(textGridElement);
