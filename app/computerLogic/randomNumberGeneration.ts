let unmarkedArray = [];
for (let i = 1; i <= 25; i++) {
  unmarkedArray.push(i);
}
const randomIdx = Math.floor(Math.random() * unmarkedArray.length);
const randomNum = unmarkedArray[randomIdx];

interface valueIndxMap {
    
}

interface Cell {
  value: number;
  x: number;
  y: number;
  color: string;
}

export const randomPcGridFill = (
  pcCellData: Cell[],
  pcIndex: number[],
  counter: number
) => {
  if (pcIndex.length == 1) {
    let idx = pcIndex[0];
    pcCellData[idx].value = counter-1;
  } else {
    const random = Math.floor(Math.random() * pcIndex.length);
    const idx = pcIndex[random];
    pcCellData[idx].value = counter;
    pcIndex.splice(random, 1);
    console.log("pc index: " + idx);
    console.log(pcCellData[idx]);
    console.log("pc index array: " + pcIndex);
  }
};

export const randomIndexInGrid = () => {

}
