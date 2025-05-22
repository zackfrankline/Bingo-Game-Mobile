import { checkers } from "../BingoChecker/checkers";
import { pcChecker } from "../BingoChecker/PcChecker";
import { pcCellData } from "../Grid Mock Data/pcCellData";
import userCellData from "../Grid Mock Data/userCellData";
import { idxToBeMarked, mapValueToIdx } from "../utils/cellIndexMap";
import {
  generateRandomValueFromGrid,
  pcIdxToBeMarked,
} from "../logic/randomNumberGeneration";
import { useState } from "react";

export const useGameEngine = () => {
  const [counter, setCounter] = useState<number>(1);
  const [filledStatus, setFilledStatus] = useState<boolean>(false);
  const [unmarked, setUnmarked] = useState<Array<number>>([]);
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [gamePaused, setGamePaused] = useState(false);

  const pauseGame = () => setGamePaused(true);

  const handleConfirmPress = () => {
    setGameStatus(!gameStatus);
    // console.log(gameStatus);
  };

  const removeElementFromUnmarked = (value: number) => {
    setUnmarked((unmarked) => unmarked.filter((item) => item !== value));
  };

  const nextPlayerTurn = (value: number) => {
    //pc grid generates number from unmarked array state
    //then remove element from unmarked array
    // setCurrentNumber(value);
    removeElementFromUnmarked(value);
    //mark the cell in user cell and pc cell which has that value
    let pcIndex = pcIdxToBeMarked(value);
    if (pcIndex >= 0) pcChecker(pcCellData[pcIndex]);

    pcCellData[pcIndex].color = "#1FA1D2";
    let userIdx = idxToBeMarked(value);
    if (userIdx >= 0) checkers(userCellData[userIdx], `${turn?"User":"PC"}` , setWinner, pauseGame);
    userCellData[userIdx].color = "#F5853F";
    //call checker and pc checker
    setTurn(!turn);
    return value;
  };

  const handleSetupPhase = (index: number) => {
    // console.log("setup phase");
    // console.log(userCellData[index]);
    // console.log(userCellData[index].value);
    if (userCellData[index].value == 0) {
      //filling user cell data
      userCellData[index].value = counter;
      userCellData[index].color = "#563c5c";
      
      if (counter === 25) {
        setFilledStatus(true);
      }
      setCounter(counter + 1);
      setUnmarked((prev) => [...prev, counter]);
      mapValueToIdx(counter, index);
    } else {
      alert("Cannot fill already filled Cell");
    }
  };

  const handleGamePhase = (cellValue: number, index: number) => {
    // console.log("game phase");
    // console.log(userCellData[index]);
    // console.log(userCellData[index].value);
    if (!turn) return; // Not player's turn

    if (!unmarked.includes(cellValue)) {
      alert("Already Marked");
      return;
    }
    userCellData[index].color = "#F5853F";

    // //mark element in the pc grid.
    // let pcIndex = pcIdxToBeMarked(userCellData[index].value);
    // // console.log(pcIndex);
    // if (pcIndex >= 0){
    //   pcChecker(pcCellData[pcIndex]);
    //   pcCellData[pcIndex].color = "#1FA1D2";
    // }

    checkers(userCellData[index], `${turn?"User":"PC"}`, setWinner, pauseGame);
    removeElementFromUnmarked(userCellData[index].value);
    generateRandomValueFromGrid(unmarked);
    setTurn(!turn);
  };

  const handlePress = (cellValue: number, index: number) => {
    // when gameStatus == false
    // setCounter(counter+1);
    //check if that cell with index is already filled ie.
    // cellsData[index] != 0
    // block user for filling in the data
    // give warning!.
    // if cellsData[index] == 0
    //update cellsData[index].value = counter
    //then update setCounter(counter + 1)
    //when gameStatus == true
    //we have a turn state (true ==> users turn, false ==> pc turn )
    //during user turn
    //user can mark cell with value present in unmarked.
    //if element not present in unmarked then user cannot mark
    //after users turn switch turn -> !turn for pc turn
    //pc Generates a number by removing random
    //when cell is not filled
    if (!gameStatus) {
      handleSetupPhase(index);
      // console.log(userCellData[index]);
    } else {
      //game logic
      //user turn
      //select cell to be marked.

      handleGamePhase(cellValue, index);

      //after every step
      //switch turn state
    }
  };

  return {
    counter,
    filledStatus,
    unmarked,
    gameStatus,
    turn,
    handlePress,
    handleConfirmPress,
    handleGamePhase,
    handleSetupPhase,
    nextPlayerTurn,
    removeElementFromUnmarked,
    winner,
  };
};
