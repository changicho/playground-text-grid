import {
  textToGridArray,
  getContainerElement,
  getGridItemElement,
  getGridItemSpanElement,
} from "./utils.js";

export class TextGrid {
  constructor(text, rowLength, colLength) {
    this.text = text;
    this.size = {
      row: rowLength,
      col: colLength,
    };

    this.gridArray = textToGridArray(text, rowLength, colLength);
  }

  getElement() {
    const container = getContainerElement();

    this.gridArray.forEach((line, row) => {
      line.forEach((character, col) => {
        const gridItemEl = getGridItemElement(row, col, character);
        containerEl.append(gridItemEl);
      });
    });
  }
}
