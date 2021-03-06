/**
 * 문자열이 반복되는 2차원 배열을 생성해줌
 * @param {string} text 패턴 문자열
 * @param {number} row  세로 사이즈
 * @param {number} col  가로 사이즈
 */
export const textToGridArray = (text, row, col) => {
  const totalCount = row * col;

  const array = text
    .repeat(Math.ceil(totalCount / text.length))
    .slice(0, totalCount)
    .match(new RegExp(".{1," + col + "}", "g"))
    .map((line) => line.split(""));

  return array;
};

/**
 * 빈 2차원 배열을 만들어주는 함수
 * @param {number} row 세로 사이즈
 * @param {number} col 가로 사이즈
 */
export const createEmptyMatrix = (row, col) => {
  const matrix = new Array(row).fill().map(() => new Array(col));
  return matrix;
};

/**
 * container class를 가진 wrapper를 반환함
 * @param {number} row
 * @param {number} col
 * @param {number} length
 */
export const getContainerElement = (row, col, length) => {
  const element = document.createElement("div");
  element.className = "container";
  element.setAttribute(
    "style",
    `grid-template-rows: repeat(${row}, ${length});
    grid-template-columns: repeat(${col}, ${length});`
  );

  return element;
};

/**
 * grid-item으로 사용할 엘리먼트 반환
 * @param {number} row
 * @param {number} col
 * @param {string} text
 */
export const getGridItemElement = (row, col, text) => {
  const element = document.createElement("div");
  element.setAttribute("class", "grid-item");
  element.dataset.row = row;
  element.dataset.col = col;

  const span = getGridItemSpanElement(text);
  element.append(span);

  return element;
};

/**
 * grid-item-text class를 가진 text를 내용으로하는 span 엘리먼트 반환
 * @param {*} text
 */
export const getGridItemSpanElement = (text) => {
  const element = document.createElement("span");
  element.className = "grid-item-text";
  element.innerText = text;

  return element;
};

/**
 * 두 점사이의 거리를 구해주는 함수
 * @param {Axis} a 점 a
 * @param {Axis} b 점 b
 */
export const getDistance = (a, b) => {
  return Math.sqrt(
    Math.abs(Math.pow(a.row - b.row, 2)) + Math.abs(Math.pow(a.col - b.col, 2))
  );
};
