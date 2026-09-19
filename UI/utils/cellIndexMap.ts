
let valueIdxMap = new Map<number,number>();

export const idxToBeMarked = (value:number):number => {
    return valueIdxMap.get(value) ?? -1;
}

export const mapValueToIdx = (value:number, index:number) =>{
    if(value === 26)
        valueIdxMap.set(25,index);
    else
        valueIdxMap.set(value,index);
}

export const resetValueIdxMap = () => {
    valueIdxMap.clear();
  };