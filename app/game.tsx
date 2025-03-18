//use ContextAPI to prop drill states between cells and grid components

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import userCellData, {
  idxToBeMarked,
  mapValueToIdx,
} from "../Grid Mock Data/userCellData";

import { useState } from "react";
import { pcCellData, pcIndex } from "../Grid Mock Data/pcCellData";
import {
  current,
  generateRandomValueFromGrid,
  pcIdxToBeMarked,
  randomPcGridFill,
} from "../computerLogic/randomNumberGeneration";
import Cell from "../Components/Grid/Cell";

import { checkers } from "@/BingoChecker/checkers";
import { pcChecker } from "@/BingoChecker/PcChecker";

// pcChecker
interface CellProps {
  index: number;
  x: number;
  y: number;
  color: string;
  cellValue: number;
  handlePress(cellValue: number, index: number): void;
}


export default function GameScreen() {
  const [counter, setCounter] = useState<number>(1);
  const [filledStatus, setFilledStatus] = useState<boolean>(false);
  const [unmarked, setUnmarked] = useState<Array<number>>([]);
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(true);

  // console.log(unmarked);
  randomPcGridFill(pcCellData, pcIndex, counter);
  
  const handleConfirmPress = () => {
    setGameStatus(!gameStatus);
    // console.log(gameStatus);
  };
  
  const removeElementFromUnmarked = (value: number) => {
    setUnmarked((unmarked) => unmarked.filter((item) => item !== value));
  };

 

  const nextPlayerTurn = (value:number) => {
    //pc grid generates number from unmarked array state
    //then remove element from unmarked array
    // setCurrentNumber(value);
    removeElementFromUnmarked(value);
    //mark the cell in user cell and pc cell which has that value
    let pcIndex = pcIdxToBeMarked(value);
    if (pcIndex >= 0) pcChecker(pcCellData[pcIndex]);
    
    pcCellData[pcIndex].color = "#1FA1D2";
    let userIdx = idxToBeMarked(value);
    if (userIdx >= 0) checkers(userCellData[userIdx]);
    userCellData[userIdx].color = "#1FA1D2";
    //call checker and pc checker
    setTurn(!turn);
    return value;
  };

  if (!turn){
    setTimeout(()=>{nextPlayerTurn(current);},2000);
  } 

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
    if (gameStatus == false) {
      if (userCellData[index].value == 0) {
        userCellData[index].value = counter;
        userCellData[index].color = "#90ee90";
        if (counter == 25) {
          setFilledStatus(!filledStatus);
        }
        setCounter(counter + 1);
        setUnmarked([...unmarked, counter]);
        mapValueToIdx(counter, index);
      } else {
        alert("Cannot fill already filled Cell");
      }
    } else {
      //game logic
      //user turn
      //select cell to be marked.
      if (!unmarked.includes(cellValue)) {
        alert("already Marked");
      } else {
        userCellData[index].color = "#1FA1D2";
        //mark element in the pc grid.
        let pcIndex = pcIdxToBeMarked(userCellData[index].value);
        // console.log(pcIndex);
        if (pcIndex >= 0) pcChecker(pcCellData[pcIndex]);
        pcCellData[pcIndex].color = "#1FA1D2";
        checkers(userCellData[index]);
        removeElementFromUnmarked(userCellData[index].value);
        let value = generateRandomValueFromGrid(unmarked);
        setTurn(!turn);
      }
      //after every step
      //switch turn state
    }
  };

  return (
    <View style={styles.mainContainer}>
      {!filledStatus ? (
        <>
          <Text style={styles.headerTitle}>Press cell to fill number</Text>
          <Text style={styles.headerTitle}>Number:</Text>
          <Text style={styles.headerTitle}>{counter}</Text>
        </>
      ) : gameStatus ?
      (
        <>
        {
          !turn?
          <Text style= {[styles.title, {color:"blue"}]}>PC Chose: {current}</Text>
          :
          <Text style = {[styles.title,{color:"#000000"}]}>Your Turn!</Text>
        }
        </>
      ) : (
        <>
          <Text style={styles.headerTitle}>Lets Begin</Text>
          <Pressable onPress={handleConfirmPress} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </>
      )}

      {/* <FlatList
        contentContainerStyle={styles.flatList}
        style={styles.flatlistContainer}
        data={pcCellData}
        renderItem={({ item, index }) => (
          <PcCell
            index={index}
            x={item.x}
            y={item.y}
            cellValue={item.value}
            color={item.color}
            handlePress={handlePress}
          />
        )}
        keyExtractor={(cell) => cell.x + "," + cell.y}
        numColumns={5}
      /> */}
      <FlatList
        contentContainerStyle={styles.flatList}
        style={styles.flatlistContainer}
        data={userCellData}
        renderItem={({ item, index }) => (
          <Cell
            index={index}
            x={item.x}
            y={item.y}
            cellValue={item.value}
            color={item.color}
            handlePress={handlePress}
          />
        )}
        keyExtractor={(cell) => cell.x + "," + cell.y}
        numColumns={5}
      />
      <Text style={styles.bingoText}>B I N G O</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  flatList: {
    alignItems: "center",
    justifyContent: "center",
    // marginLeft:20,
    // marginRight:20,
  },
  flatlistContainer: {
    borderWidth: 3,
    borderRadius: 30,
    flexGrow: 0,
    marginBottom: 50,
    marginTop: 20,
    // marginHorizontal: 50,
    padding: 7,
    backgroundColor: "#F0FFF0",
  },
  headerTitle: {
    fontSize: 32,
    // marginHorizontal:50,
    marginBottom: 20,
    // marginTop: 0,
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
  },
  bingoText: {
    fontSize: 32,
  },
  confirmButton: {
    shadowOpacity: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#1FA1D2",
    shadowRadius: 3,
    margin: 10,
    borderRadius: 20,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1FA1D2",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
});
