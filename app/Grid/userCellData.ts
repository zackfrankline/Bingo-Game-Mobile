interface Cell {
    value: number;
    x: number;
    y: number;
    color: string;
}

let valueIdxMap = new Map<number,number>();

export const idxToBeMarked = (value:number):number => {
    if(valueIdxMap.has(value))
      return valueIdxMap.get(value) as number;
    return -1;
}

export const mapValueToIdx = (value:number, index:number) =>{
    if(value ===26)
        valueIdxMap.set(25,index);
    else
        valueIdxMap.set(value,index);
}

const userCellData: Cell[] = [
    {   
        value : 0,
        x : 0,
        y : 0,
        color : '#424b54'
        
    },
    {   
        value : 0,
        x : 0,
        y : 1,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 0,
        y : 2,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 0,
        y : 3,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 0,
        y : 4,
        color : '#424b54'
    },{
        
        value : 0,
        x : 1,
        y : 0,
        color : '#424b54'
    },
    {
        
        value : 0,

        x : 1,
        y : 1,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 1,
        y : 2,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 1,
        y : 3,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 1,
        y : 4,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 2,
        y : 0,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 2,
        y : 1,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 2,
        y : 2,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 2,
        y : 3,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 2,
        y : 4,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 3,
        y : 0,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 3,
        y : 1,
        color : '#424b54'
    },
    {
        
        value : 0,
        x : 3,
        y : 2,
        color : '#424b54'
    },
    {
    
        value : 0,
        x : 3,
        y : 3,
        color : '#424b54'
    },
    {

        value : 0,
        x : 3,
        y : 4,
        color : '#424b54'
    },
    {
        value : 0,
        x : 4,
        y : 0,
        color : '#424b54'
    },
    {
        value : 0,
        x : 4,
        y : 1,
        color : '#424b54'
    },
    {
        value : 0,
        x : 4,
        y : 2,
        color : '#424b54'
    },
    {
        value : 0,
        x : 4,
        y : 3,
        color : '#424b54'
    },
    {
        value : 0,
        x : 4,
        y : 4,
        color : '#424b54'
    },
]

export default userCellData;