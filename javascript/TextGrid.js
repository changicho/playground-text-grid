import {
  textToGridArray,
  getContainerElement,
  getGridItemElement,
  createEmptyMatrix,
  getDistance,
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
    this.elementMatrix = createEmptyMatrix(rowLength, colLength);

    this.element = this.getElement();
    this.element.addEventListener(
      "mousemove",
      this.mousemoveHandler.bind(this)
    );
    this.activeAxis = { row: undefined, col: undefined };

    this.timer = undefined;
  }

  mousemoveHandler(event) {
    event.preventDefault();
    const { className } = event.target;
    if (className !== "grid-item" && className !== "grid-item-text") return;

    const target =
      className === "grid-item" ? event.target : event.target.parentNode;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      function () {
        const beforeActive = { ...this.activeAxis };

        this.removeActiveClass(beforeActive.row, beforeActive.col);
        const { row, col } = target.dataset;

        this.addActiveClass(row, col);
        target.classList.add("center");

        this.activeAxis = { row, col };
      }.bind(this),
      5
    );
  }

  addActiveClass(row, col) {
    const elementMatrix = this.elementMatrix;

    for (let b_row = row - 2; b_row <= row + 2; b_row++) {
      if (b_row < 0 || b_row >= this.size.row) continue;

      for (let b_col = col - 2; b_col <= col + 2; b_col++) {
        if (Math.abs(row - b_row) + Math.abs(col - b_col) > 3) continue;
        if (b_col < 0 || b_col >= this.size.col) continue;

        const distance = Math.ceil(
          getDistance({ row, col }, { row: b_row, col: b_col }) * 10
        );

        const className = `size${distance}`;
        elementMatrix[b_row][b_col].classList.add(className);
      }
    }
  }

  removeActiveClass(row, col) {
    const elementMatrix = this.elementMatrix;

    for (let b_row = row - 2; b_row <= row + 2; b_row++) {
      if (b_row < 0 || b_row >= this.size.row) continue;

      for (let b_col = col - 2; b_col <= col + 2; b_col++) {
        if (b_col < 0 || b_col >= this.size.col) continue;

        elementMatrix[b_row][b_col].className = "grid-item";
      }
    }
  }

  getElement() {
    const { row, col, length } = this.size;
    const container = getContainerElement(row, col, `${length}px`);

    this.gridArray.forEach((line, row) => {
      line.forEach((character, col) => {
        const gridItemEl = getGridItemElement(row, col, character);
        this.elementMatrix[row][col] = gridItemEl;
        container.append(gridItemEl);
      });
    });

    return container;
  }
}
