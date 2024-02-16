export default function numberWithSpaces(num: number) {
  const numArr = num.toFixed(2).split('.');
  return numArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',' + numArr[1];
};