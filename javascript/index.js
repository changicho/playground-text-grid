import { textToGridArray } from "./utils.js";
import { TextGrid } from "./TextGrid.js";

const rootElement = document.querySelector("#app");

const text = "helloworld";
const textGrid = new TextGrid(text, 5, 5);
const textGridElement = textGrid.getElement();

rootElement.appendChild(textGridElement);
