export const transformArrayToParam = (array: string[]): string => {

  let param:string = '';

  array.forEach((value, index, array1) => {

    if(index === array1.length - 1)
      param += value;
    else
      param += value + ',';

  })

  return param;
}