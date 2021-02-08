import {
  textToGridArray,
  getContainerElement,
  getGridItemElement,
} from "./utils.js";

export class TextGrid {
  constructor(text, rowLength, colLength) {
    const { innerWidth: width, innerHeight: height } = window;
    const length = Math.ceil(
      Math.min(width, height) / Math.max(rowLength, colLength)
    );
    this.text = text;
    this.size = {
      row: rowLength,
      col: colLength,
      length,
    };
    this.gridArray = textToGridArray(text, rowLength, colLength);

    this.element = this.getElement();
    this.element.addEventListener(
      "mousemove",
      this.mousemoveHandler.bind(this)
    );

    this.timer = undefined;
  }

  mousemoveHandler(event) {
    event.preventDefault();

    if (event.target.className !== "grid-item") return;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function () {
      console.log(event.target);
    }, 100);
  }

  getElement() {
    const { row, col, length } = this.size;
    const container = getContainerElement(row, col, `${length}px`);

    this.gridArray.forEach((line, row) => {
      line.forEach((character, col) => {
        const gridItemEl = getGridItemElement(row, col, character);
        container.append(gridItemEl);
      });
    });

    return container;
  }
}
