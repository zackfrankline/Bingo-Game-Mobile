

interface Cell {
  value: number;
  x: number;
  y: number;
  color: string;
}

let valueIdxMap = new Map<number,number>;

export const randomPcGridFill = (
  pcCellData: Cell[],
  pcIndex: number[],
  counter: number
) => {
  if (pcIndex.length == 1) {
    let idx = pcIndex[0];
    pcCellData[idx].value = counter-1;
    valueIdxMap.set(counter-1,idx);
  } else {
    const random = Math.floor(Math.random() * pcIndex.length);
    const idx = pcIndex[random];
    pcCellData[idx].value = counter;
    //set value and index in valueIdxMap
    valueIdxMap.set(counter,idx);
    pcIndex.splice(random, 1);
    console.log("pc index: " + idx);
    console.log(pcCellData[idx]);
    console.log("pc index array: " + pcIndex);
  }
};

export const pcIdxToBeMarked = (value:number):number => {
    if(valueIdxMap.has(value))
      return valueIdxMap.get(value) as number;
    return -1;
}

export const generateRandomValueFromGrid = (unmarked:Array<number>):number => {
    const random = Math.floor(Math.random() * unmarked.length);
    const value = unmarked[random];
    return value;
}
