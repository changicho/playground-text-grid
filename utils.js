/**
 * 문자열이 반복되는 2차원 배열을 생성해줌
 * @param {*} text 패턴 문자열
 * @param {*} row  세로 사이즈
 * @param {*} col  가로 사이즈
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
