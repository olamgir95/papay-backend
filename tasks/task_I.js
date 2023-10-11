const arr = ["h", "e", "l", "l", "o"];

const letterFunc = (arr) => {
  const newArr1 = arr.filter((vl) => vl !== arr[0]);
  const newArr2 = arr.filter((vl) => vl === arr[0]);
  const newArr3 = newArr1.concat(newArr2);
  return newArr3;
};
console.log(letterFunc(arr));
