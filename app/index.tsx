//use ContextAPI to prop drill states between cells and grid components

import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import userCellData from "./Grid/userCellData";
import { checkers } from "./BingoChecker/checkers";
import { useState } from "react";
import { pcCellData, pcIndex } from "./Grid/pcCellData";
import { randomPcGridFill } from "./computerLogic/randomNumberGeneration";

interface CellProps {
  index: number;
  x: number;
  y: number;
  color: string;
  cellValue: number;
  handlePress(cellValue: number, index: number): void;
}

const Cell = ({ index, x, y, cellValue, handlePress, color }: CellProps) => (
  <Pressable
    onPress={() => handlePress(cellValue, index)}
    style={styles.cellContainer}
  >
    <View style={[styles.cell, { backgroundColor: `${color}` }]}>
      <Text
        style={[
          styles.title,

          cellValue > 0 ? { color: "black" } : { color: "white" },
        ]}
      >
        {cellValue}
      </Text>
    </View>
  </Pressable>
);
const PcCell = ({ index, x, y, cellValue, handlePress, color }: CellProps) => (
  <Pressable style={styles.cellContainer}>
    <View style={[styles.cell, { backgroundColor: `${color}` }]}>
      <Text
        style={[
          styles.title,
          cellValue > 0 ? { color: "black" } : { color: "white" },
        ]}
      >
        {cellValue}
      </Text>
    </View>
  </Pressable>
);

export default function Index() {
  const [counter, setCounter] = useState<number>(1);
  const [filledStatus, setFilledStatus] = useState<boolean>(false);
  const [unmarked, setUnmarked] = useState<Array<number>>([]);
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(true);

  console.log(unmarked);
  randomPcGridFill(pcCellData, pcIndex, counter);

  const handleConfirmPress = () => {
    setGameStatus(!gameStatus);
    console.log(gameStatus);
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
    if (gameStatus == false) {
      if (userCellData[index].value == 0) {
        userCellData[index].value = counter;
        userCellData[index].color = "#90ee90";
        if (counter == 25) {
          setFilledStatus(!filledStatus);
        }
        setCounter(counter + 1);
        setUnmarked([...unmarked, counter]);
      } else {
        alert("Cannot fill already filled Cell");
      }
    } else {
      //game logic
      if (turn) {
        //user turn
        //select cell to be marked.
        if (userCellData[index].color === "#1FA1D2") {
          alert("already Marked");
        } else {
          userCellData[index].color = "#1FA1D2";
          setTurn(!turn);
          checkers(userCellData[index]);
        }
        //after every step
        //switch turn state
      } else {
        setTurn(!turn);
      }
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
      ) : gameStatus ? (
        <>
          <Text>Number is:</Text>
        </>
      ) : (
        <>
          <Text style={styles.headerTitle}>Lets Begin</Text>
          <Pressable onPress={handleConfirmPress} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </>
      )}

      <FlatList
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
      />
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
  cellContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    marginVertical: 3,
    marginHorizontal: 3,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 4,
    paddingVertical: 4,
    height: 65,
    width: 65,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
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
